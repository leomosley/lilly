import { createMedicine, getAllMedicines, getAverage, updateMedicine } from "./lib/utils.js";
import { createMedicineCard } from "./components/medicine-card.js";
import { createMedicineForm } from "./components/medicine-form.js";
import { createSearch } from "./components/search.js";
import { createInfo } from "./components/info.js";

let medicines = [];

async function renderMedicines() {
  const root = document.getElementById("medicines");
  root.innerHTML = "Loading...";

  try {
    medicines = await getAllMedicines();
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

function renderForm() {
  const submitForm = async (formData) => {
    const action = formData.get("action");

    if (action !== "create" && action !== "update") {
      alert("Incorrect action");
      return;
    }

    if (action === "create") {
      const response = await createMedicine(formData);
      console.log(response);
    } else {
      const response = await updateMedicine(formData);
      console.log(response);
    }
  };
  const root = document.getElementById("form");
  const form = createMedicineForm(submitForm);
  root.appendChild(form);
}

function renderSearch() {
  const onChange = (value) => {
    const filteredMedicines = medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(value.toLowerCase())
    );

    const root = document.getElementById("medicines");
    root.innerHTML = "";

    filteredMedicines.forEach((medicine) => {
      const card = createMedicineCard(medicine);
      if (card) root.appendChild(card);
    });
  };

  const root = document.getElementById("search");
  const search = createSearch(onChange);
  root.appendChild(search);
}

async function renderInfo() {
  const average = await getAverage();
  const root = document.getElementById("info");
  const info = createInfo(average);
  root.appendChild(info);
}

renderMedicines();
renderForm();
renderSearch();
renderInfo();