export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const billId = Date.now(); 
	const amount = 3000; 

	return {
		paymentUrl: "https://banking.idram.am/Payment/GetPayment",
		fields: {
			EDP_LANGUAGE: "EN",
			EDP_REC_ACCOUNT: "YOUR_IDRAM_ID",
			EDP_DESCRIPTION: `Event registration for ${body.name}`,
			EDP_AMOUNT: amount,
			EDP_BILL_NO: billId,
			EDP_EMAIL: body.email,
		},
	};
});