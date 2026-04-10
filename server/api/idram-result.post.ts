import crypto from "crypto";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	// 🟡 PRECHECK
	if (body.EDP_PRECHECK === "YES") {
		// check if order exists in your DB
		return "OK";
	}

	// 🟢 PAYMENT CONFIRMATION
	const {
		EDP_REC_ACCOUNT,
		EDP_AMOUNT,
		EDP_BILL_NO,
		EDP_PAYER_ACCOUNT,
		EDP_TRANS_ID,
		EDP_TRANS_DATE,
		EDP_CHECKSUM,
	} = body;

	const SECRET_KEY = "YOUR_SECRET_KEY";

	const stringToHash = [
		EDP_REC_ACCOUNT,
		EDP_AMOUNT,
		SECRET_KEY,
		EDP_BILL_NO,
		EDP_PAYER_ACCOUNT,
		EDP_TRANS_ID,
		EDP_TRANS_DATE,
	].join(":");

	const hash = crypto.createHash("md5").update(stringToHash).digest("hex");

	if (hash !== EDP_CHECKSUM) {
		return "ERROR";
	}

	// ✅ mark order as paid in DB

	return "OK";
});