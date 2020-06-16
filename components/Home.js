import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
 import {Text, View, StyleSheet} from 'react-native'


const Tab = createBottomTabNavigator()

function Home(){
    // console.log("Render HOme")
    return(
      
    <Tab.Navigator
          initialRouteName={DeckList}
          backBehavior='initialRoute' 
          tabBarOptions={{
          activeTintColor: '#6306e9',
    }}>
          <Tab.Screen 
            name="Decks" 
            component ={DeckList} options={{
            tabBarIcon: ({ focused,color, size }) => (
              <MaterialCommunityIcons name="layers-triple" color={focused ? '#6306e9' : color} size={size} />
          ),}}
          />
          <Tab.Screen name="Add Deck" component = {AddDeck} 
            options={{
              tabBarIcon: ({ focused,color, size }) => (
              <Ionicons name="ios-add-circle-outline" color={focused ? '#6306e9' : color} size={size} />
            ),}} 
          />
    </Tab.Navigator>
    )
}

export default Home;