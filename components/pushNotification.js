import { Permissions, Notifications } from 'expo';
import { Platform } from 'react-native';

const PUSH_ENDPOINT = 'http://172.30.1.28:8080/notification'; //TODO endpoint

const GRANTED = 'granted';
const ALERT_MSG = "You need to grant the permission for push notification";
const CHANNEL_ID = 'Hangil_Notification_Channel';
const CHANNEL_NAME = 'NOTIFICATION NAME';


/**
 * A function to register the push notification.
 * @param {String} id The ID string.
 */
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
        alert(ALERT_MSG);
        // Android remote notification permissions are granted during the app install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== GRANTED) {
        alert(ALERT_MSG);
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    console.log(token);

    /* 
     * Check if the platform is android.
     * If so, open a channel to listen the push notification.
     * Apparently, this is unnecessary for ios.
     */
    if (Platform.OS === 'android') {
        Expo.Notifications.createChannelAndroidAsync(CHANNEL_ID, {
            name: CHANNEL_NAME,
            sound: true,
        });
    }

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
    }).catch(function (error) {
        if (error)
            console.log('Error');
    });
}
