import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/auth';

function handleClose(data, callback) {
    callback(data);
    window.close()
}

export function WidgetCreator(user, obj, callback) {
    fetch(`http://localhost:8081/add-widget?widget=${obj}&uid=${user.uid}`)
        .then(data => console.log(data)).then((data) => {
            handleClose(data, callback)
        })
}
