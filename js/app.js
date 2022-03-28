class Cocktail {
    name = "";
    description = "";
    ingredients = [];
    thumbnail = "";

    constructor(name, description, ingredients, thumbnail) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.thumbnail = thumbnail;
    }
}

const cocktails = [];

import { data } from "./../data/data.js";

data.cocktails.forEach((cocktail) => {
    const newCocktail = new Cocktail(cocktail.name, cocktail.description, cocktail.ingredients, cocktail.thumbnail);
    cocktails.push(newCocktail);
});

const dataFromLocalStorage = localStorage.getItem("customCocktails") || null;

if (dataFromLocalStorage) {
    let localStored = JSON.parse(localStorage.getItem("customCocktails"));

    for (const cocktail of localStored["cocktails"]) {
        const newCocktail = new Cocktail(cocktail.name, cocktail.description, cocktail.ingredients, cocktail.thumbnail);
        cocktails.push(newCocktail);
    }
}

const cocktail_ul = document.getElementById("cocktail-list");

generateAllCocktails();

const bntNewCocktail = document.getElementById("btnNewCocktail");

bntNewCocktail.addEventListener("click", () => {
    openNewCocktailPanel();

    const newCocktailFormSend = document.getElementById("btnSendNewCocktail");
    const newCocktailFormReset = document.getElementById("btnCancelNewCocktail");

    const ingredientsList = document.getElementById("new-cocktail-ingredients-list");
    const newIngredientBtn = document.getElementById("new-cocktail-add-ingredient");

    newIngredientBtn.addEventListener("click", (e) => {
        if (ingredientsList.children.length > 7) return;

        const newIngredientListItem = document.createElement("li");
        newIngredientListItem.className = "new-cocktail-ingredient";

        newIngredientListItem.innerHTML = `
                        <input type="text" name="new-cocktail-ingredient-name" id="newCocktailIngredientNameInput" placeholder="Ingredient Name">
                        <input type="text" name="new-cocktail-ingredient-measure" id="newCocktailIngredientMeasureInput" placeholder="Ingredient Measure">
                        `;

        const btn = document.createElement("button");
        btn.innerHTML = `x`;
        btn.id = "new-cocktail-delete-ingredient";
        btn.addEventListener("click", (e) => {
            const toRemove = e.target.parentNode;

            ingredientsList.removeChild(toRemove);
        });

        newIngredientListItem.appendChild(btn);

        ingredientsList.appendChild(newIngredientListItem);
    });

    newCocktailFormSend.addEventListener("click", (e) => {
        const newCocktailNameInput = document.getElementById("newCocktailNameInput");
        const newCocktailDescInput = document.getElementById("newCocktailDescInput");

        const ingredients = [];

        for (const child of ingredientsList.children) {
            const iName = child.children[0].value;
            const iMeasure = child.children[1].value;

            if (iName.length <= 0 || iMeasure.length <= 0) return;

            ingredients.push({ name: iName, measure: iMeasure });
        }

        if (newCocktailNameInput.value.length > 0 && newCocktailDescInput.value.length > 0) {
            addNewCocktail(newCocktailNameInput.value, newCocktailDescInput.value, ingredients, "./../img/whiskey_sour_thumb.jpg");

            newCocktailNameInput.value = "";
            newCocktailDescInput.value = "";
            closeNewCocktailPanel();
        }
    });

    newCocktailFormReset.addEventListener("click", closeNewCocktailPanel);
});

const searchCocktailForm = document.getElementById("searchCocktailForm");
searchCocktailForm.addEventListener("submit", (e) => e.preventDefault());
searchCocktailForm.addEventListener("search", (e) => {
    const value = e.target.value;
    if (value.length > 0) {
        const cocktailsSearched = searchCockatils(value);
        clearCocktailsFromIndex();
        cocktailsSearched.forEach((cocktail) => {
            addCocktailToIndex(cocktail);
        });
    } else {
        generateAllCocktails();
    }
});

// Functions
function searchCockatils(name) {
    if (name == null || name == "") return null;

    return cocktails.filter((x) => x.name.toLowerCase().includes(name.toLowerCase()));
}

function addNewCocktail(newCocktailName, newCocktailDesc, ingredients, thumbnail) {
    const newCocktail = new Cocktail(newCocktailName, newCocktailDesc, ingredients, thumbnail);

    showCustomToastify("New cocktail added");

    saveCocktailToLocalStorage(newCocktail);
    addCocktailToIndex(newCocktail);
    cocktails.push(newCocktail);
}

function addCocktailToIndex(cocktail) {
    let newCocktailHTML = document.createElement("li");
    newCocktailHTML.className = "cocktail-card";
    newCocktailHTML.innerHTML += `
        <h1 class="cocktail-card-title">${cocktail.name}</h1>

        <div class="cocktail-card-desc">
            <img src="${cocktail.thumbnail}" alt="Whiskey Sour Thumbnail">
            <p>${cocktail.description}</p>
        </div>

        <h1 class="cocktail-card-title">Ingredients</h1>    
        `;

    let ingredients_ul = document.createElement("ul");
    ingredients_ul.className = "cocktail-card-ingredients";

    newCocktailHTML.appendChild(ingredients_ul);

    cocktail.ingredients.forEach((ing) => {
        let newIngredient = document.createElement("li");
        newIngredient.className = "cocktail-card-ingredient";
        newIngredient.innerText = `${ing.name}: ${ing.measure === "" ? "Fill with" : ing.measure}`;
        ingredients_ul.appendChild(newIngredient);
    });

    cocktail_ul.appendChild(newCocktailHTML);
}

function clearCocktailsFromIndex() {
    cocktail_ul.innerHTML = "";
}

function openNewCocktailPanel() {
    const newCocktailPanel = document.getElementById("new-cocktail-panel");
    newCocktailPanel.style.display = "flex";
    newCocktailPanel.style.opacity = "100%";
}

function closeNewCocktailPanel() {
    const newCocktailPanel = document.getElementById("new-cocktail-panel");
    newCocktailPanel.style.display = "none";
    newCocktailPanel.style.opacity = "0%";

    const newCocktailNameInput = document.getElementById("newCocktailNameInput");
    const newCocktailDescInput = document.getElementById("newCocktailDescInput");

    newCocktailDescInput.style.backgroundColor = "#ffffff";
    newCocktailNameInput.style.backgroundColor = "#ffffff";
}

function validateNewCocktailForm(e) {}

function generateAllCocktails() {
    clearCocktailsFromIndex();
    cocktails.forEach((cocktail) => {
        addCocktailToIndex(cocktail);
    });
}

function saveCocktailToLocalStorage(cocktail) {
    const stringed = JSON.stringify(cocktail);

    const localStorageCocktails = localStorage.getItem("customCocktails") || null;

    if (localStorageCocktails) {
        let localStored = JSON.parse(localStorage.getItem("customCocktails"));

        localStored["cocktails"].push(JSON.parse(stringed));

        localStorage.setItem("customCocktails", JSON.stringify(localStored));
    } else {
        const newToStorage = `{"cocktails":[${stringed}]}`;
        localStorage.setItem("customCocktails", newToStorage);
    }
}

function showCustomToastify(toastifyText) {
    Toastify({
        text: toastifyText,
        duration: 2500,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
            background: "black",
        },
    }).showToast();
}
