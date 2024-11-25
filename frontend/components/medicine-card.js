/**
 * @typedef {import('../lib/types.js').Medicine} Medicine
 */

/**
 * Creates a card for a medicine.
 * @param {Medicine} medicine
 * @returns {HTMLDivElement | null}
 */
export function createMedicineCard(medicine) {
  if (
    typeof medicine.name !== "string" ||
    typeof medicine.price !== "number"
  ) return null;

  const card = document.createElement("div");
  card.className = "medicine-card";

  const name = medicine.name || medicine.name.length > 0
    ? medicine.name
    : "No Name";

  const price = medicine.price
    ? "$" + medicine.price.toFixed(2)
    : "Not listed";

  card.innerHTML = `
    <h2>${name}</h2 >
    <p>Price: ${price}</p>
  `;

  return card;
}