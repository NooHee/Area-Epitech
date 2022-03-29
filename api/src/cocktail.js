const express = require('express')
const app = express()
const bodyParser = require("body-parser");
var cors = require('cors');
const fetch = require('node-fetch')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = function (app) {
    app.get("/trigger/cocktail/random-cocktail-alcoholic", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.ingredient == undefined || req.query.ingredient == '') {
            return res.status(400).json({ result: 'KO', error: 'empty ingredient' });
        }
        var ig = ["Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps", "Scotch", "Apricot brandy", "Triple sec", "Southern Comfort", "Orange bitters", "Brandy", "Lemon vodka", "Blended whiskey", "Dry Vermouth", "Amaretto", "Tea", "Champagne", "Coffee liqueur", "Bourbon", "Tequila", "Vodka", "A\u00f1ejo rum", "Bitters", "Sugar", "Kahlua", "demerara Sugar", "Dubonnet Rouge", "Watermelon", "Lime juice", "Irish whiskey", "Apple brandy", "Carbonated water", "Cherry brandy", "Creme de Cacao", "Grenadine", "Port", "Coffee brandy", "Red wine", "Rum", "Grapefruit juice", "Ricard", "Sherry", "Cognac", "Sloe gin", "Apple juice", "Pineapple juice", "Lemon juice", "Sugar syrup", "Milk", "Strawberries", "Chocolate syrup", "Yoghurt", "Mango", "Ginger", "Lime", "Cantaloupe", "Berries", "Grapes", "Kiwi", "Tomato juice", "Cocoa powder", "Chocolate", "Heavy cream", "Galliano", "Peach Vodka", "Ouzo", "Coffee", "Spiced rum", "Water", "Espresso", "Angelica root", "Orange", "Cranberries", "Johnnie Walker", "Apple cider", "Everclear", "Cranberry juice", "Egg yolk", "Egg", "Grape juice", "Peach nectar", "Lemon", "Firewater", "Lemonade", "Lager", "Whiskey", "Absolut Citron", "Pisco", "Irish cream", "Ale", "Chocolate liqueur", "Midori melon liqueur", "Sambuca", "Cider", "Sprite", "7-Up", "Blackberry brandy", "Peppermint schnapps", "Creme de Cassis"];
        var v = 'empty'
        index = ig.findIndex(element => {
            if (element.toLowerCase() == req.query.ingredient.toLowerCase())
                v = element
        })
        if (v == 'empty') {
            return res.status(400).json({ result: 'KO', error: 'Not a valid ingredient name' });
        }
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${v}&a=Alcoholic`).then((response) => response.json())
            .then((data) => {
                if (data.drinks) {
                    var ran = Math.floor(Math.random() * (data.drinks.length - 1) + 0);
                    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data.drinks[ran].idDrink}`).then((response) => response.json())
                        .then((data) => {
                            if (data.drinks == null) {
                                return res.status(404).json({ result: 'KO', error: 'No cocktail matching the ingredient' });
                            } else {
                                var cocktail = data.drinks[0];
                                var ingredients = [cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3,
                                cocktail.strIngredient4, cocktail.strIngredient5, cocktail.strIngredient6,
                                cocktail.strIngredient7, cocktail.strIngredient8, cocktail.strIngredient9,
                                cocktail.strIngredient10]
                                ingredients = ingredients.filter(n => n)
                                return res.json({
                                    result: 'OK', cocktail: {
                                        name: cocktail.strDrink,
                                        img: cocktail.strDrinkThumb,
                                        ingredients: ingredients,
                                        ingredient: v,
                                        instructions: cocktail.strInstructions
                                    }
                                });
                            }
                        })
                }
            })
    })

    app.get("/trigger/cocktail/random-cocktail-non-alcoholic", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.query.ingredient == undefined || req.query.ingredient == '') {
            return res.status(400).json({ result: 'KO', error: 'empty ingredient' });
        }
        var ig = ["Tea", "Bitters", "Sugar", "Watermelon", "Lime juice", "Carbonated water", "Grenadine", "Grapefruit juice", "Sloe gin", "Apple juice", "Pineapple juice", "Lemon juice", "Sugar syrup", "Milk", "Strawberries", "Chocolate syrup", "Yoghurt", "Mango", "Ginger", "Lime", "Cantaloupe", "Berries", "Grapes", "Kiwi", "Tomato juice", "Cocoa powder", "Chocolate", "Heavy cream", "Coffee", "Water", "Espresso", "Angelica root", "Orange", "Cranberries", "Apple cider", "Cranberry juice", "Egg yolk", "Egg", "Grape juice", "Peach nectar", "Lemon", "Lemonade", "Sprite", "7-Up", "Peppermint schnapps"];
        var v = 'empty'
        index = ig.findIndex(element => {
            if (element.toLowerCase() == req.query.ingredient.toLowerCase())
                v = element
        })
        if (v == 'empty') {
            return res.status(400).json({ result: 'KO', error: 'Not a valid ingredient name' });
        }
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${v}&a=Non_Alcoholic`).then((response) => response.json())
            .then((data) => {
                if (data.drinks) {
                    var ran = Math.floor(Math.random() * (data.drinks.length - 1) + 0);
                    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${data.drinks[ran].idDrink}`).then((response) => response.json())
                        .then((data) => {
                            if (data.drinks == null) {
                                return res.status(404).json({ result: 'KO', error: 'No cocktail matching the ingredient' });
                            } else {
                                var cocktail = data.drinks[0];
                                var ingredients = [cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3,
                                cocktail.strIngredient4, cocktail.strIngredient5, cocktail.strIngredient6,
                                cocktail.strIngredient7, cocktail.strIngredient8, cocktail.strIngredient9,
                                cocktail.strIngredient10]
                                ingredients = ingredients.filter(n => n)
                                return res.json({
                                    result: 'OK', cocktail: {
                                        name: cocktail.strDrink,
                                        img: cocktail.strDrinkThumb,
                                        ingredients: ingredients,
                                        ingredient: v,
                                        instructions: cocktail.strInstructions
                                    }
                                });
                            }
                        })
                }
            })
    })
}


