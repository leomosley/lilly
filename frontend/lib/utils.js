/**
 * @typedef {import('./types.js').Medicine} Medicine
 * @typedef {import('./types.js').Response} Response
 * @typedef {import('./types.js').Average} Average
 */

const BASE_URL = "http://localhost:8000";

/**
 * Fetches all medicines from the backend.
 * @returns {Promise<Medicine[]>}
 */
export async function getAllMedicines() {
  const response = await fetch(`${BASE_URL}/medicines`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    return data["medicines"];
  }
}

/**
 * Fetches specifc medicines from the backend.
 * @param {string} name
 * @returns {Promise<Medicine>}
 */
export async function getMedicine(name) {
  const response = await fetch(`${BASE_URL}/medicines/${name}`, {
    method: "GET",
  });
  if (response.ok) {
    return await response.json();
  }
}

/**
 * Creates new medicine in backend.
 * @param {FormData} formData 
 * @returns {Promise<Response>}
 */
export async function createMedicine(formData) {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    return await response.json();
  }
}

/**
 * Updates existing medicine in backend.
 * @param {FormData} formData
 * @returns {Promise<Response>}
 */
export async function updateMedicine(formData) {
  const response = await fetch(`${BASE_URL}/update`, {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    return await response.json();
  }
}

/**
 * Deletes existing medicine in backend.
 * @param {string} name 
 * @returns {Promise<Response>}
 */
export async function deleteMedicine(name) {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "DELETE",
    body: JSON.stringify({
      name: name,
    })
  });

  if (response.ok) {
    return await response.json();
  }
}

/**
 * Fetches average medicine price from backend.
 * @returns {Promise<Average>}
 */
export async function getAverage() {
  const response = await fetch(`${BASE_URL}/average`, {
    method: "GET",
  });
  if (response.ok) {
    return await response.json();
  }
}