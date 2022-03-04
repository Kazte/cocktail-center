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
    new Cocktail("Kiwi Martini", "The kiwi martini is a very fun vodka cocktail and it is one of the best drinks that makes use of fresh fruit. Though there are a few recipes floating around, this is one of the easiest and it is an absolutely delightful green martini to drink.\r\n\r\nFor this recipe, you'll simply muddle slices of kiwi with simple syrup, then shake it with vodka. It's a drink that anyone can mix up in minutes and a perfect cocktail to show off your favorite vodka."),
    new Cocktail("Mojito", "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw."),
    new Cocktail("Whiskey Sour", "Shake with ice. Strain into chilled glass, garnish and serve. If served 'On the rocks', strain ingredients into old-fashioned glass filled with ice.")
];

cocktails.forEach(cocktail => {
    console.log(cocktail.name);
});

let search = prompt("Ingresá el nombre del trago a buscar:");

function searchCockatils(name) {
    return cocktails.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
}

console.log(searchCockatils(search));