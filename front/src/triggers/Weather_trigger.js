export const higherThan20 = async (react, argsA, argsR, callback) => {

    fetch(`http://localhost:8081/action/weather/higher-than-20?city=${argsA[0]}`)
        .then(response => {
            if (!response.ok) throw response;
            else return response.json();
        }).then((data) => {
            if (data.result === 'OK')
                react(argsR, callback)
        })
        .catch(async (error) => {
            var result = await error.json()
            if (result && result.error) {
                callback(result.error)
            }
        })
}

