import { deleteMedicine } from '../lib/utils.js';

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

  const button = document.createElement("button");
  button.innerHTML = `<span>Delete</span>`;
  card.appendChild(button);

  const name = medicine.name && medicine.name.length > 0
    ? medicine.name
    : "No Name";

  const price = medicine.price
    ? "$" + medicine.price.toFixed(2)
    : "Not listed";

  const nameElement = document.createElement("h2");
  nameElement.textContent = name;

  const priceElement = document.createElement("p");
  priceElement.textContent = `Price: ${price}`;

  card.appendChild(nameElement);
  card.appendChild(priceElement);

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    await deleteMedicine(formData);
  });

  return card;
}
