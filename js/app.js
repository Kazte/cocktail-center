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

let cocktail_ul = document.getElementById("cocktail-list");

let question = prompt("Deseas agregar un nuevo trago (\"agregar\") o buscar uno nuevo (\"buscar\")");

while (question != "agregar" && question != "buscar") {
    question = prompt("Deseas agregar un nuevo trago (\"agregar\") o buscar uno nuevo (\"buscar\")");
}

if (question == "buscar") {
    let search = "";

    do {
        search = prompt("Ingresá el nombre del trago a buscar:");
    } while (search == "" || search == null);

    const cocktailsFinded = searchCockatils(search);

    if (cocktailsFinded.length <= 0) {
        alert("No se han encontrado cockteles con ese nombre.");
    }

    cocktailsFinded.forEach(cocktail => {
        addCocktailToIndex(cocktail);
    });

} else if (question == "agregar") {
    let newCocktailName = ""

    do {
        newCocktailName = prompt("Ingresá un nombre válido!");
    } while (newCocktailName == "" || newCocktailName == null);

    let newCocktailDesc = ""

    do {
        newCocktailDesc = prompt("Ingresá una descripcion válida del Cocktail");
    } while (newCocktailDesc == "" || newCocktailDesc == null);

    addNewCocktail(newCocktailName, newCocktailDesc);

    cocktails.forEach(cocktail => {
        addCocktailToIndex(cocktail);
    });
}

// console.log(cocktails);


// // Functions
function searchCockatils(name) {
    if (name == null || name == "") return null;

    return cocktails.filter(x => x.name.toLowerCase().includes(name.toLowerCase()));
}


function addNewCocktail(newCocktailName, newCocktailDesc) {
    const newCocktail = new Cocktail(newCocktailName, newCocktailDesc);
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