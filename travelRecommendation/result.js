const resultDiv = document.getElementById('result');

// Utility function to display results with name, image (if applicable), description, and time
function displayResult(name, imageUrl = null, description, timeZone = null) {
  resultDiv.innerHTML += `<h3>${name}</h3>`;
  
  if (imageUrl) {
    resultDiv.innerHTML += `<img src="${imageUrl}" alt="${name}">`;
  }

  resultDiv.innerHTML += `<p>${description}</p>`;
  
  if (timeZone) {
    const options = { timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const localTime = new Date().toLocaleTimeString('en-US', options);
    resultDiv.innerHTML += `<p>Current time in ${name}: ${localTime}</p>`;
  }
}

// Function to fetch and display recommendations based on keyword
function searchRecommendation(keyword) {
  resultDiv.innerHTML = ''; // Clear previous results

  fetch('travelRecommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let found = false;

      if (keyword === 'country') {
        found = true;
        data.countries.slice(0, 2).forEach(country => {
          resultDiv.innerHTML += `<h2>${country.name}</h2>`;
          country.cities.slice(0, 2).forEach(city => 
            displayResult( city.imageUrl,city.name, city.description, city.timeZone)
          );
        });
      } else if (keyword === 'temple') {
        found = true;
        data.temples.slice(0, 2).forEach(temple => 
          displayResult(temple.name, temple.imageUrl, temple.description, temple.timeZone)
        );
      } else if (keyword === 'beach') {
        found = true;
        data.beaches.slice(0, 2).forEach(beach => 
          displayResult(beach.name, beach.imageUrl, beach.description, beach.timeZone)
        );
      }

      if (!found) {
        resultDiv.innerHTML = 'Keyword not recognized. Please enter "country," "temple," or "beach."';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

// Function to search for specific destination names within the JSON data
function searchDestination(destination) {
  resultDiv.innerHTML = ''; // Clear previous results

  fetch('travelRecommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let found = false;

      // Search in countries and cities
      data.countries.forEach(country => {
        if (country.name.toLowerCase() === destination) {
          found = true;
          resultDiv.innerHTML += `<h2>${country.name}</h2>`;
          country.cities.forEach(city => 
            displayResult(city.name, city.imageUrl, city.description, city.timeZone)
          );
        } else {
          country.cities.forEach(city => {
            if (city.name.toLowerCase() === destination) {
              found = true;
              displayResult(city.name, city.imageUrl, city.description, city.timeZone);
            }
          });
        }
      });

      // Search in temples
      data.temples.forEach(temple => {
        if (temple.name.toLowerCase() === destination) {
          found = true;
          displayResult(temple.name, temple.imageUrl, temple.description, temple.timeZone);
        }
      });

      // Search in beaches
      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase() === destination) {
          found = true;
          displayResult(beach.name, beach.imageUrl, beach.description, beach.timeZone);
        }
      });

      if (!found) {
        resultDiv.innerHTML = 'Destination not found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

// Get search term from URL and execute appropriate function
const params = new URLSearchParams(window.location.search);
const searchTerm = params.get('search');

if (searchTerm === 'country' || searchTerm === 'temple' || searchTerm === 'beach') {
  searchRecommendation(searchTerm);
} else if (searchTerm) {
  searchDestination(searchTerm.toLowerCase());
}

// Clear button functionality to reset the results
document.getElementById('clearbtn').addEventListener('click', () => {
  resultDiv.innerHTML = '';
});
