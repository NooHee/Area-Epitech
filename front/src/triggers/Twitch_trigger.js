export const isLive = (react, argsA, argsR, callback) => {
    fetch(`http://localhost:8081/action/twitch/is-live?streamer_name=${argsA[0]}`)
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

export const stream1H = (react, argsA, argsR, callback) => {
    fetch(`http://localhost:8081/action/twitch/stream-1h?streamer_name=${argsA[0]}`)
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

export const top100 = (react, argsA, argsR, callback) => {
    fetch(`http://localhost:8081/action/twitch/top-100?game=${argsA[0]}`)
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