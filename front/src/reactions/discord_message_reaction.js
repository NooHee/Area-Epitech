export const Discord_Message_Reaction = (args, callback) => {
    fetch(`http://localhost:8081/trigger/discord/message?channel=${args[0]}&message=${args[1]}`)
        .then(response => {
            if (!response.ok) throw response;
            else return response.json();
        }).then((data) => {
            if (data.result === 'OK')
                {}
        })
        .catch(async (error) => {
            var result = await error.json()
            if (result && result.error) {
                callback(result.error)
            }
        })
}

export const Discord_Message4All_Reaction = (args, callback) => {
    fetch(`http://localhost:8081/trigger/discord/message-for-all?channel=${args[0]}&message=${args[1]}`)
        .then(response => {
            if (!response.ok) throw response;
            else return response.json();
        }).then((data) => {
            if (data.result === 'OK')
                {}
        })
        .catch(async (error) => {
            var result = await error.json()
            if (result && result.error) {
                callback(result.error)
            }
        })
}

export const Discord_Channel_Reaction = (args, callback) => {
    fetch(`http://localhost:8081/trigger/discord/create-channel?sname=${args[0]}&channel=${args[1]}`)
        .then(response => {
            if (!response.ok) throw response;
            else return response.json();
        }).then((data) => {
            if (data.result === 'OK')
                {}
        })
        .catch(async (error) => {
            var result = await error.json()
            if (result && result.error) {
                callback(result.error)
            }
        })
}

export const Discord_PM_Reaction = (args, callback) => {
    fetch(`http://localhost:8081/trigger/discord/send-pm?user=${args[0]}&message=${args[1]}`)
        .then(response => {
            if (!response.ok) throw response;
            else return response.json();
        }).then((data) => {
            if (data.result === 'OK')
                {}
        })
        .catch(async (error) => {
            var result = await error.json()
            if (result && result.error) {
                callback(result.error)
            }
        })
}