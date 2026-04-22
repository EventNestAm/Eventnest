export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 🔹 1. Generate unique bill ID
  const billId = Date.now().toString();

  // 🔹 2. Calculate amount
  const pricePerPerson = 2000;
  const amount = body.peopleCount * pricePerPerson;

  // 🔹 3. SAVE DATA (for now just log)
  console.log("NEW USER:", body);

  // 👉 later you can save in DB

  return {
    billId,
    amount,
  };
});