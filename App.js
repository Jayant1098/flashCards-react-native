import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home'
import Quiz from './components/Quiz'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Result from './components/Result';
import { setLocalNotification } from './utils/notifications'


const Stack = createStackNavigator()

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render(){
    return (
      
        <NavigationContainer>
        <StatusBar/>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false,}} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Deck" component={Deck} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
        </NavigationContainer>
      
    );
  }
}


// function MainNavigator(){
  

//   return(
   
      

//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

