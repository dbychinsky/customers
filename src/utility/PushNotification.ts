/**
 * Класс работы с нотифкацией
 */
export class PushNotification {

    static createNotification(title: string) {
        let notification = new Notification(title, {
            icon: 'https://phppot.com/badge.png',
            body: 'New article published!',
            requireInteraction: true,

        });
        // url that needs to be opened on clicking the notification
        // finally everything boils down to click and visits right
        notification.onclick = function (event) {
            // window.open('http://localhost:3000/');
            window.focus();
        };
    }

    static pushNotify(title: string) {
        if (!("Notification" in window)) {
            // checking if the user's browser supports web push Notification
            alert("Web browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            console.log("Permission to show web push notifications granted.");
            // if notification permissions is granted,
            // then create a Notification object
            this.createNotification(title);
        } else if (Notification.permission !== "denied") {
            alert("Going to ask for permission to show web push notification");
            // User should give explicit permission
            Notification.requestPermission().then((permission) => {
                // If the user accepts, let's create a notification
                this.createNotification(title);
            });
        }
        // User has not granted to show web push notifications via Browser
        // Let's honor his decision and not keep pestering anymore
    }
}

