import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'http://172.30.1.28:8080/notification'; //TODO endpoint

const GRANTED = 'granted';

export default async function registerForPushNotificationsAsync(id) {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    /**
     * Check if the notification is granted.
     * It will only ask if permissions have not already been determined, because iOS won't necessarily prompt the user a second time.
     */
    if (existingStatus !== GRANTED) {
        alert("You need to grant the permission for push notification");
        // Android remote notification permissions are granted during the app install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== GRANTED) {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    console.log(token);

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {
                value: token,
            },
            user: {
                id: id
            },
        }),
    }).then(function(res) {
        console.log('hello!');
        return res.json();
    }).then((data) => {
        console.log(JSON.stringify(data));
    }).catch(function (error) {
        console.log('Error');
        console.log(error);
    });
}
