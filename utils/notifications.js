import { AsyncStorage } from "react-native";
import { Notifications } from "expo"
import * as Permissions from 'expo-permissions';

const NOTIF_KEY = "FlashCards:notifications";

  
  export const clearNotifications = () => {
    AsyncStorage.removeItem(NOTIF_KEY).then(Notifications.cancelAllScheduledNotificationsAsync());
  };
  
  export const setLocalNotification = () => {  
    AsyncStorage.getItem(NOTIF_KEY)
      .then(JSON.parse)
      
      .then(result => {
        
        if (result === null) 
    
        {
          Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();
              let date = new Date();
              date.setDate(date.getDate()+1);
              date.setHours(12);
              date.setMinutes(1);
              
              Notifications.scheduleLocalNotificationAsync(
                generateNotifications(), { 
                    time: date,
                    repeat: "day"
              });
  
              AsyncStorage.setItem(NOTIF_KEY, JSON.stringify(true));
            }
          });
        }
      });
  };

  export const generateNotifications = () => ({
    title: "Practice Practice Practice",
    body: "Don't forget to see your cards today",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      vibrate: true,
      priority: "high",
      sticky: false
    }
  });