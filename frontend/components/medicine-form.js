/**
 * @typedef {import('../lib/types.js').Medicine} Medicine
 */

/**
 * Form for creating/updating medicines.
 * @param {(formData: any) => Promise<void>} onSubmit
 * @returns {HTMLDivElement | null}
 */

export function createMedicineForm(onSubmit) {
  const form = document.createElement('form');
  form.className = 'medicine-form';

  form.innerHTML = `
    <h2>Edit Medicines</h2>
    
    <label for="medicine-action">Action</label>
    <select 
      id="medicine-action" 
      name="action" 
      required
    >
      <option value="create">Create</option>
      <option value="update">Update</option>
    </select>
    
    <label for="medicine-name">Name</label>
    <input 
      type="text" 
      id="medicine-name" 
      name="name" 
      required 
      placeholder="Enter medicine name" 
    />

    <label for="medicine-price">Price</label>
    <input 
      type="number" 
      id="medicine-price" 
      name="price" 
      step="any"
      required 
      placeholder="Enter medicine price"
    />

    <button type="submit">Submit</button>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit(new FormData(form));
  });

  return form;
}