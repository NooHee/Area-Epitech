export const isPopular = async (react, argsA, argsR, callback, uid) => {
    var key = '';
    await fetch(`http://localhost:8081/get-keys?uid=${uid}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'OK') {
                if (data.spotify)
                    key = data.spotify.key;
            }
        })
    fetch(`http://localhost:8081/action/spotify/is-popular?artist=${argsA[0]}&key=${key}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'KO') {
                if (data.error)
                    callback(data.error);
            } else {
                react(argsR, callback)
            }
        })
}

export const moreThan50K = async (react, argsA, argsR, callback, uid) => {
    var key = '';
    await fetch(`http://localhost:8081/get-keys?uid=${uid}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'OK') {
                if (data.spotify)
                    key = data.spotify.key;
            }
        })
    fetch(`http://localhost:8081/action/spotify/follower-50k?artist=${argsA[0]}&key=${key}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'KO') {
                if (data.error)
                    callback(data.error);
            } else {
                react(argsR, callback)
            }
        })
}