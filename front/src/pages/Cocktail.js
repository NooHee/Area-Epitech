import React from "react"
import '../Cocktail.css'

export const CocktailAlcoholic = () => {
    const displayIngredients = (ingredients) => {
        if (!ingredients)
            return
        var arr = ingredients.map((ingredient, index) => ingredient = (<li className="ingredient" key={index}>{ingredient}</li>));
        return arr
    }

    if (!window.value)
        window.close();
    var ingredients = displayIngredients(window.value.ingredients);
    return (
        <div>
            <center>
                <h1>
                    {window.value.ingredient ? 'You picked ' + window.value.ingredient : ''}
                </h1>
                <h2>
                    {window.value.name ? 'I can suggest you The ' + window.value.name : 'Cocktail name'}
                </h2>
            </center>
            <div className="info">
                <br />
                {window.value.img ? <img className="cocktail" src={window.value.img} alt={'Cocktail image ' + window.value.name} /> : ''}
                <br />
                {ingredients ? <ul>
                    <li>
                        {'Ingredients:'}
                        <br />
                        <ul className="ingredient">
                            {ingredients}
                        </ul>
                    </li>
                </ul>
                    : ''}
            </div>
            <center>
                {window.value.instructions ? window.value.instructions : ''}
            </center>
        </div>
    )
}

export default CocktailAlcoholic