const sendNotification = (title, body) => {
    if ('Notification' in window) {
        // Demandez la permission à l'utilisateur
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                // Créez et affichez une notification
                new Notification(title, {
                    body: body,
                    icon: 'bax.svg' 
                });
            }
        });
    }
}

module.exports = {
    sendNotification: sendNotification
}

