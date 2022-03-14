class Cocktail {
    name = ""
    description = ""

    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

const cocktails = [
    new Cocktail("Margarita", "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass."),
    new Cocktail("Cuba Libre", "Build all ingredients in a Collins glass filled with ice. Garnish with lime wedge."),
    new Cocktail("Martini", "Straight: Pour all ingredients into mixing glass with ice cubes. Stir well. Strain in chilled martini cocktail glass. Squeeze oil from lemon peel onto the drink, or garnish with olive."),
    new Cocktail("Kiwi Martini", "You'll simply muddle slices of kiwi with simple syrup, then shake it with vodka. It's a drink that anyone can mix up in minutes and a perfect cocktail to show off your favorite vodka."),
    new Cocktail("Mojito", "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw."),
    new Cocktail("Whiskey Sour", "Shake with ice. Strain into chilled glass, garnish and serve. If served 'On the rocks', strain ingredients into old-fashioned glass filled with ice.")
];

const cocktail_ul = document.getElementById("cocktail-list");

generateAllCocktails();

const bntNewCocktail = document.getElementById("btnNewCocktail");

bntNewCocktail.addEventListener("click", () => {
    openNewCocktailPanel();

    const newCocktailForm = document.getElementById("newCocktailForm");

    newCocktailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateNewCocktailForm(e)
    });

    newCocktailForm.addEventListener('reset', closeNewCocktailPanel);
});


const searchCocktailForm = document.getElementById("searchCocktailForm");
searchCocktailForm.addEventListener("submit", e => e.preventDefault());
searchCocktailForm.addEventListener("search", e => {
    const value = e.target.value;
    if (value.length > 0) {
        const cocktailsSearched = searchCockatils(value);
        clearCocktailsFromIndex();
        cocktailsSearched.forEach(cocktail => {
            addCocktailToIndex(cocktail);
        });

    } else {
        generateAllCocktails();
    }

});


// Functions
function searchCockatils(name) {
    if (name == null || name == "") return null;

    return cocktails.filter(x => x.name.toLowerCase().includes(name.toLowerCase()));
}


function addNewCocktail(newCocktailName, newCocktailDesc) {
    const newCocktail = new Cocktail(newCocktailName, newCocktailDesc);
    addCocktailToIndex(newCocktail);
    cocktails.push(newCocktail);
}

function addCocktailToIndex(cocktail) {
    cocktail_ul.innerHTML += `
                <li class="cocktail-card">
                        <h1 class="cocktail-card-title">${cocktail.name}</h1>
                        <div class="cocktail-card-desc">
                            <img src="./img/whiskey_sour_thumb.jpg" alt="Whiskey Sour Thumbnail">
                            <p>${cocktail.description}</p>
                        </div>
                </li>
                `
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

function validateNewCocktailForm(e) {
    const newCocktailNameInput = document.getElementById("newCocktailNameInput");
    const newCocktailDescInput = document.getElementById("newCocktailDescInput");

    if (newCocktailNameInput.value.length > 0 && newCocktailDescInput.value.length > 0) {
        addNewCocktail(newCocktailNameInput.value, newCocktailDescInput.value)

        newCocktailNameInput.value = "";
        newCocktailDescInput.value = "";
        closeNewCocktailPanel();
    } else {

        newCocktailNameInput.style.backgroundColor = "#ff2300";

        newCocktailDescInput.style.backgroundColor = "#ff2300";



        newCocktailNameInput.addEventListener("focusin", () => {
            newCocktailDescInput.style.backgroundColor = "#ffffff";
            newCocktailNameInput.style.backgroundColor = "#ffffff";
        })
        newCocktailDescInput.addEventListener("focusin", () => {
            newCocktailDescInput.style.backgroundColor = "#ffffff";
            newCocktailNameInput.style.backgroundColor = "#ffffff";
        })
    }
}

function generateAllCocktails() {
    clearCocktailsFromIndex();
    cocktails.forEach(cocktail => {
        addCocktailToIndex(cocktail);
    });
}