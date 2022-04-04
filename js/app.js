class Cocktail {
    id = -1;
    name = "";
    description = "";
    ingredients = [];
    thumbnail = "";

    constructor(id, name, description, ingredients, thumbnail) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.thumbnail = thumbnail;
    }
}

async function getRandomCocktail() {
    const resp = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const data = await resp.json();

    return data["drinks"][0];
}

const cocktails = [];

// import { data } from "./../data/data.js";

for (let i = 0; i < 10; i++) {
    const cocktail = await getRandomCocktail();

    const ingredients = getIngredientsFromJson(cocktail);

    const newCocktail = new Cocktail(cocktail["idDrink"], cocktail["strDrink"], cocktail["strInstructions"], ingredients, cocktail["strDrinkThumb"]);

    cocktails.push(newCocktail);
}

function getIngredientsFromJson(cocktail) {
    var ing = [];

    for (let index = 1; index <= 15; index++) {
        var ingredient = cocktail[`strIngredient${index}`];

        if (ingredient != null || ingredient == "") {
            ing.push({ name: `${cocktail[`strIngredient${index}`]}`, measure: `${cocktail[`strMeasure${index}`] || ""}` });
        } else {
            break;
        }
    }
    return ing;
}

const dataFromLocalStorage = localStorage.getItem("customCocktails") || null;

if (dataFromLocalStorage) {
    let localStored = JSON.parse(localStorage.getItem("customCocktails"));

    for (const cocktail of localStored["cocktails"]) {
        const newCocktail = new Cocktail(-1, cocktail.name, cocktail.description, cocktail.ingredients, cocktail.thumbnail);
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
// const searchCocktailBtn = document.getElementById("searchCocktailBtn");

// searchCocktailBtn.addEventListener("click", (e) => {
//     const searchCocktailInput = document.getElementById("searchCocktailInput");
//     const value = searchCocktailInput.value;
//     if (value.length > 0) {
//         const cocktailsSearched = await searchCockatils(value);

//         clearCocktailsFromIndex();

//         console.log(cocktailsSearched);

//         // cocktailsSearched.forEach((cocktail) => {
//         //     const ingredients = getIngredientsFromJson(cocktail);

//         //     const newCocktail = new Cocktail(cocktail["idDrink"], cocktail["strDrink"], cocktail["strInstructions"], ingredients, cocktail["strDrinkThumb"]);

//         //     cocktails.push(newCocktail);
//         // });
//     } else {
//         generateAllCocktails();
//     }
// });

searchCocktailForm.addEventListener("search", async (e) => {
    console.log(e);
    if (value.length > 0) {
        const cocktailsSearched = await searchCockatils(value);

        clearCocktailsFromIndex();

        console.log(cocktailsSearched);

        // cocktailsSearched.forEach((cocktail) => {
        //     const ingredients = getIngredientsFromJson(cocktail);

        //     const newCocktail = new Cocktail(cocktail["idDrink"], cocktail["strDrink"], cocktail["strInstructions"], ingredients, cocktail["strDrinkThumb"]);

        //     cocktails.push(newCocktail);
        // });
    } else {
        generateAllCocktails();
    }
});

// Functions
async function searchCockatils(name) {
    if (name == null || name == "") return null;

    // cocktails.filter((x) => x.name.toLowerCase().includes(name.toLowerCase()));

    const resp = await fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await resp.json();

    return data["drinks"];
}

function addNewCocktail(newCocktailid, newCocktailName, newCocktailDesc, ingredients, thumbnail) {
    const newCocktail = new Cocktail(newCocktailid, newCocktailName, newCocktailDesc, ingredients, thumbnail);

    showCustomToastify("New Cocktail Added");

    saveCocktailToLocalStorage(newCocktail);
    addCocktailToIndex(newCocktail);

    cocktails.push(newCocktail);
}

function addCocktailToIndex(cocktail) {
    let newCocktailHTML = document.createElement("li");

    const { id, name, description, ingredients, thumbnail } = cocktail;

    newCocktailHTML.className = "cocktail-card";
    newCocktailHTML.innerHTML += `
        <h1 class="cocktail-card-title">${name}</h1>

        <div class="cocktail-card-desc">
            <img src="${thumbnail}" alt="Whiskey Sour Thumbnail">
            <p>${description}</p>
        </div>

        <h1 class="cocktail-card-title">Ingredients</h1>    
        `;

    let ingredients_ul = document.createElement("ul");
    ingredients_ul.className = "cocktail-card-ingredients";

    newCocktailHTML.appendChild(ingredients_ul);

    for (const ing of ingredients) {
        let newIngredient = document.createElement("li");
        newIngredient.className = "cocktail-card-ingredient";
        newIngredient.innerText = `${ing.name}: ${ing.measure === "" ? "Fill with" : ing.measure}`;
        ingredients_ul.appendChild(newIngredient);
    }

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

function showCustomToastify(text) {
    Toastify({
        text: text,
        duration: 2500,
        close: true,
        gravity: "bottom",
        position: "left",
        style: {
            background: "black",
            borderRadius: "5px",
        },
    }).showToast();
}
