export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 🔹 1. Generate unique bill ID
  const billId = Date.now().toString();

  // 🔹 2. Calculate amount
  const pricePerPerson = 2000;
  const amount = body.peopleCount * pricePerPerson;

  console.log("NEW USER:", body);



  return {
    billId,
    amount,
  };
});