export const Cocktail_Alcoholic_Reaction = (args) => {
    fetch(`http://localhost:8081/trigger/cocktail/random-cocktail-alcoholic?ingredient=${args[0]}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'KO') { }
            else {
                var w = window.open('http://localhost:8080/reaction/cocktail', "_blank", "resizable=no, location=no, toolbar=no, menubar=no, width=1200, height=900, top=100, left=100")
                w.value = data.cocktail
            }
        })
}

export const Cocktail_NonAlcoholic_Reaction = (args) => {
    fetch(`http://localhost:8081/trigger/cocktail/random-cocktail-non-alcoholic?ingredient=${args[0]}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'KO')
                console.log(JSON.stringify(data))
            else {
                var w = window.open('http://localhost:8080/reaction/cocktail', "_blank", "resizable=no, location=no, toolbar=no, menubar=no, width=1200, height=900, top=100, left=100")
                w.value = data.cocktail
            }
        })
}