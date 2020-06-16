import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'

function Result(props) {
    
    const {correct,total,deckTitle} = props.route.params
    
    return(
        <View style={styles.container}>
            <Text style={{flex:0.5,paddingTop:100,fontSize:32,textAlign:"center"}}> You answered {correct} out of {total} questions correctly </Text>
            <Button style={{width:'50%',height:50,justifyContent:'center'}} mode="contained" onPress={() => props.navigation.navigate('Quiz',{deckTitle,reset:true})}>
                    Restart Quiz
            </Button>
            <Button style={{marginTop:20,width:'50%',height:50,justifyContent:'center'}} mode="contained" onPress={() => props.navigation.navigate('Deck',{deckTitle})}>
                    Back to Deck
            </Button>
        </View>
    )
}

export default Result;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent:'center',
      alignItems:'center',
      justifyContent:'flex-start',
    },
  });