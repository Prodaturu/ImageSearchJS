// Replace UNSPLASH_ACCESS_KEY with your actual Unsplash API key or an environment variable
const accessKey = "UNSPLASH_ACCESS_KEY";

// DOM Elements
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// Initialize variables
let keyword = "";
let page = 1;

// Function to search for images using the Unsplash API
async function searchImages() {
    // Get the search keyword from the input box
    keyword = searchBox.value;

    // Construct the API URL
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=9`;

    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Extract the results from the API response
    const results = data.results;

    // Clear previous search results if it's the first page
    if (page === 1) {
        searchResult.innerHTML = "";
    }

    // Loop through each result and display it
    results.map((result) => {
        // Create an img element
        const image = document.createElement("img");
        image.src = result.urls.small;

        // Create an anchor element
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        // Append the image to the anchor element
        imageLink.appendChild(image);

        // Append the anchor element to the search result container
        searchResult.appendChild(imageLink);
    });

    // Show the "Show More" button
    showMoreBtn.style.display = "block";
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();  // Prevent default form submission
    page = 1;  // Reset to the first page
    searchImages();  // Call the searchImages function
});

// Event listener for the "Show More" button
showMoreBtn.addEventListener("click", () => {
    page++;  // Increment the page number
    searchImages();  // Call the searchImages function
});
