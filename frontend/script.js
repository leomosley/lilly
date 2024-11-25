import { createMedicineCard } from "./components/medicine-card.js";
import { getAllMedicines } from "./lib/utils.js";


async function renderMedicines() {
  const root = document.getElementById("medicines");
  root.innerHTML = "Loading...";

  try {
    const medicines = await getAllMedicines();
    root.innerHTML = "";

    medicines.forEach((medicine) => {
      const card = createMedicineCard(medicine);
      if (card) root.appendChild(card);
    });

  } catch (error) {
    root.innerHTML = "Failed to load medicines.";
    console.error(error);
  }
}

renderMedicines();