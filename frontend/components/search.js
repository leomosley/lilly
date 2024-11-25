/**
 * Creates a search bar.
 * @param {(value: any) => void} onChange
 * @returns {HTMLDivElement | null}
 */
export function createSearch(onChange) {
  const search = document.createElement("input");
  search.className = "search";
  search.placeholder = "Search";
  search.type = "text";

  search.addEventListener('input', (e) => {
    e.preventDefault();
    onChange(e.currentTarget.value)
  })

  return search;
}