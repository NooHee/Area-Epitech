import { useEffect } from "react"

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const Spotify = () => {
    useEffect(() => {
        var code = getParameterByName('code')
        if (code && window && window.opener) {
            var data = new URLSearchParams();
            data.append('code', code);
            data.append('redirect_uri', 'http://localhost:8080/auth/spotify');
            data.append('grant_type', 'authorization_code');
            var authOptions = {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + (new Buffer.from('af8bbeca37274f82bf1234b019db122b:d28e0dd80a1c4c36b2720613cf656ebb').toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            };
            fetch('https://accounts.spotify.com/api/token', authOptions).then((response) => response.json())
                .then((data) => {
                    var res = { service: 'spotify', access: data.access_token, refresh: data.refresh_token }

                    window.opener.postMessage(JSON.stringify(res), 'http://localhost:8080/settings')
                    window.close()
                })
        }
        else {
            alert('You refused the OAuth access')
            window.opener.postMessage(JSON.stringify({ error_description: 'access refused' }), 'http://localhost:8080/settings')
            window.close()
        }
    }, [])
    return null
}

export default Spotify