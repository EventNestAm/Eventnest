// server/api/epg/register.post.ts
//
// Registers a one-phase order with the SmartVista E-Commerce Payment Gateway
// (register.do) and returns the hosted payment page URL (formUrl) that the
// browser should be redirected to.
//
// IMPORTANT: userName/password are the merchant's EPG API credentials.
// They must stay server-side only — never send them to the browser, never
// call register.do directly from the Vue component.

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

	const params = new URLSearchParams({
		userName: config.epgUserName,
		password: config.epgPassword,
		orderNumber: String(body.orderNumber),
		amount: String(body.amount),
		currency: body.currency || "051", // AMD
		language: body.language || "hy",
		returnUrl: body.returnUrl || (config.public.epgReturnUrl as string),
	});

	if (body.failUrl) params.set("failUrl", body.failUrl);
	if (body.description) params.set("description", body.description.slice(0, 600));
	if (body.email) params.set("email", body.email);
	// phone and name are intentionally NOT sent to EPG: they're only required
	// when sendPaymentLink=SMS (which this flow doesn't use), and ARCA's
	// merchant account has a phone regex configured for Russian numbers only
	// (^((\+7|7|8)([0-9]){10})$), which rejects Armenian numbers.
	// Phone/name are still captured via web3forms above.

	let response: RegisterOrderResponse;
	try {
		response = await $fetch<RegisterOrderResponse>(
			`${config.epgHost}/epg/rest/register.do`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json, text/javascript, */*",
				},
				body: params.toString(),
			},
		);
	} catch (err) {
		throw createError({
			statusCode: 502,
			statusMessage: "Could not reach payment gateway",
		});
	}

	if (!response.formUrl || (response.errorCode && response.errorCode !== "0")) {
		throw createError({
			statusCode: 502,
			statusMessage: response.errorMessage || "Payment registration failed",
			data: { errorCode: response.errorCode },
		});
	}

	// Only ever return what the browser needs — never echo back credentials.
	return {
		orderId: response.orderId,
		formUrl: response.formUrl,
	};
});