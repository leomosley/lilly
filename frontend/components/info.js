/**
 * Creates info div
 * @param {number} average
 * @returns {HTMLDivElement | null}
 */
export function createInfo(average) {
  if (typeof average !== "number") return null;
  const info = document.createElement("div");
  info.className = "info";

  info.innerHTML = `
    <span class="info-label">Average Medicine Price:</span>
    <span clss="info-value">$${average.toFixed(2)}</span>
  `;

  return info;
}