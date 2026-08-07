// server/api/epg/status.get.ts
//
// Looks up the current status of an order via getOrderStatus.do.
// Call this from the returnUrl page after the customer comes back from the
// EPG hosted payment page — never trust the redirect alone as proof of payment.

interface OrderStatusResponse {
	OrderStatus?: number;
	ErrorCode?: string;
	ErrorMessage?: string;
	Amount?: number;
	OrderNumber?: string;
	Pan?: string;
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const query = getQuery(event);
	const orderId = query.orderId as string | undefined;

	if (!orderId) {
		throw createError({ statusCode: 400, statusMessage: "orderId is required" });
	}

	const params = new URLSearchParams({
		userName: config.epgUserName,
		password: config.epgPassword,
		orderId,
		language: (query.language as string) || "hy",
	});

	let response: OrderStatusResponse;
	try {
		response = await $fetch<OrderStatusResponse>(
			`${config.epgHost}/epg/rest/getOrderStatus.do?${params.toString()}`,
			{ headers: { Accept: "application/json, text/javascript, */*" } },
		);
	} catch (err) {
		throw createError({ statusCode: 502, statusMessage: "Could not reach payment gateway" });
	}

	// OrderStatus meaning (one-phase payments, register.do):
	//   0 = registered, not yet paid   1 = approved   2 = deposited
	//   3 = reversed   4 = refunded    6 = declined (final)
	const paid = response.OrderStatus === 1 || response.OrderStatus === 2;
	const declined = response.OrderStatus === 6;

	return {
		paid,
		declined,
		orderStatus: response.OrderStatus,
		errorCode: response.ErrorCode,
		errorMessage: response.ErrorMessage,
		amount: response.Amount,
		orderNumber: response.OrderNumber,
		maskedPan: response.Pan,
	};
});
