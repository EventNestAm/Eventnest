// server/api/tickets/create-token.post.ts
//
// Called right before we redirect the customer to the EPG hosted payment
// page. Takes the info we'll need later to build & email the QR ticket,
// and signs it server-side so it can safely ride along in the returnUrl.

import { signTicketPayload } from "../../utils/ticketToken";

interface CreateTokenBody {
	orderNumber: string;
	email: string;
	name: string;
	eventName?: string;
	peopleCount?: number;
	amount?: number;
}

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateTokenBody>(event);

	if (!body?.orderNumber || !body?.email || !body?.name) {
		throw createError({
			statusCode: 400,
			statusMessage: "orderNumber, email and name are required",
		});
	}

	const token = signTicketPayload({
		orderNumber: body.orderNumber,
		email: body.email,
		name: body.name,
		eventName: body.eventName,
		peopleCount: body.peopleCount,
		amount: body.amount,
	});

	return { token };
});
