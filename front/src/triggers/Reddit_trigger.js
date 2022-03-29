export const nbSub = async (react, argsA, argsR, callback, uid) => {
    var key = '';
    await fetch(`http://localhost:8081/get-keys?uid=${uid}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'OK') {
                if (data.reddit)
                    key = data.reddit.key;
            }
        })
    fetch(`http://localhost:8081/action/reddit/nb-sub?key=${key}`)
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