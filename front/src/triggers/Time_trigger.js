export const onTime = (react, argsA, argsR, callback) => {
    fetch("http://localhost:8081/action/time/on-time")
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

export const haltTime = (react, argsA, argsR, callback) => {
    fetch("http://localhost:8081/action/time/half-time")
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