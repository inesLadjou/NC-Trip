// Define search and clear buttons dynamically
const btnSearch = document.getElementById('searchbtn');
const btnClear = document.getElementById('btnClear');

if (btnSearch) {
  // Event listener for the search button to redirect with query parameter
  btnSearch.addEventListener('click', () => {
    const input = document.getElementById('destinationInput').value.trim().toLowerCase();

    if (input) {
      // Redirect to result.html with the search input as a query parameter
      window.location.href = `result.html?search=${encodeURIComponent(input)}`;
    }
  });
}

if (btnClear) {
  // Clear button functionality to reset the input field
  btnClear.addEventListener('click', () => {
    document.getElementById('destinationInput').value = '';
  });
}
