const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const author = document.querySelector(".author");
var searchQuery = "";
const APP_ID = "86fa40fb";
const APP_KEY = "6958901c51a29989097ff6b436220eca";

searchForm.addEventListener("submit", e => {
	e.preventDefault();
	searchQuery = e.target.querySelector("input").value;
	fetchAPI();
});

async function fetchAPI() {
	const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=41`;
	const response = await fetch(baseURL);
	const data = await response.json();
	generateHTML(data.hits);
	console.log(data);
}

function generateHTML(results) {
	container.classList.remove("initial");
	author.classList.toggle("d-none");
	let generatedHTML = "";
	results.map(result => {
		generatedHTML += `
        <div class="item">
             <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                     <h1 class="title">${result.recipe.label}</h1>
                     <a class="view-button" href="${
												result.recipe.url
											}" target="_blank">View recipe</a>
                </div>
             <p class="item-data">Calories: ${result.recipe.calories.toFixed(
								0
							)}</p>
             <p class="item-data">Diet Labels: ${
								result.recipe.dietLabels.length > 0
									? result.recipe.dietLabels
									: "DATA NOT FOUND"
							}</p>
             <p class="item-data">Health Labels: ${
								result.recipe.healthLabels[0]
							}</p>
         </div>
        `;
	});
	searchResultDiv.innerHTML = generatedHTML;
}
