// server/api/epg/register.post.ts

interface RegisterOrderBody {
    orderNumber: string;
    amount: number; // minor units, e.g. luma (AMD cents)
    currency?: string; // ISO 4217 numeric, defaults to AMD = "051"
    description?: string;
    email?: string;
    phone?: string;
    name?: string;
    language?: string; // ISO 639-1, e.g. "hy" | "en" | "ru"
    returnUrl?: string;
    failUrl?: string;
}

interface RegisterOrderResponse {
    orderId?: string;
    formUrl?: string;
    errorCode?: string;
    errorMessage?: string;
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    // 1. Guard against missing environment variables
    if (!config.epgUserName || !config.epgPassword || !config.epgHost) {
        console.error("❌ EPG Configuration Error: Missing environment variables!", {
            hasUserName: !!config.epgUserName,
            hasPassword: !!config.epgPassword,
            hasHost: !!config.epgHost,
        });

        throw createError({
            statusCode: 500,
            statusMessage: "Payment gateway misconfiguration: missing credentials on server.",
        });
    }

    const body = await readBody<RegisterOrderBody>(event);

    if (!body?.orderNumber || !body?.amount) {
        throw createError({
            statusCode: 400,
            statusMessage: "orderNumber and amount are required",
        });
    }

    if (!Number.isInteger(body.amount) || body.amount <= 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "amount must be a positive integer in minor units",
        });
    }

    // 2. Clean epgHost (remove trailing slashes if present)
    const host = (config.epgHost as string).replace(/\/+$/, "");
    const targetUrl = `${host}/epg/rest/register.do`;

    const params = new URLSearchParams({
        userName: config.epgUserName as string,
        password: config.epgPassword as string,
        orderNumber: String(body.orderNumber),
        amount: String(body.amount),
        currency: body.currency || "051", // AMD
        language: body.language || "hy",
        returnUrl: body.returnUrl || (config.public.epgReturnUrl as string),
    });

    if (body.failUrl) params.set("failUrl", body.failUrl);
    if (body.description) params.set("description", body.description.slice(0, 600));
    if (body.email) params.set("email", body.email);

    let response: RegisterOrderResponse;
    try {
        response = await $fetch<RegisterOrderResponse>(targetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json, text/javascript, */*",
            },
            body: params.toString(),
        });
    } catch (err: any) {
        // 3. Log the real error to your production server logs for easy debugging
        console.error("❌ EPG Gateway Request Failed:", {
            targetUrl,
            error: err?.message || err,
            status: err?.status || err?.statusCode,
            cause: err?.cause,
        });

        throw createError({
            statusCode: 502,
            statusMessage: `Could not reach payment gateway (${err?.message || "Network Error"})`,
        });
    }

    if (!response.formUrl || (response.errorCode && response.errorCode !== "0")) {
        console.error("❌ EPG Registration Error Response:", response);
        
        throw createError({
            statusCode: 502,
            statusMessage: response.errorMessage || "Payment registration failed",
            data: { errorCode: response.errorCode },
        });
    }

    // Return only what the browser needs
    return {
        orderId: response.orderId,
        formUrl: response.formUrl,
    };
});