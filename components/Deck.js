import React from 'react';
import {Text, View, StyleSheet, Alert } from 'react-native'
import {getDecks} from '../utils/api'
import { Button, TextInput } from 'react-native-paper';
import { removeDeck } from '../utils/api'

class Deck extends React.Component{
    
    state={
        deck:{},
        loaded:false,
    }

    startQuiz(questions){
        if(questions === 0){
            Alert.alert(
                'Oops',
                'This quiz has no questions',
                [
                  { text: 'Ok' },
                ]
                ,{ cancelable: false }
            )
        }
        else{
            this.props.navigation.navigate('Quiz',{deckTitle:this.props.route.params.deckTitle})
        }
    }

    deleteDeck(deckTitle){
        removeDeck(deckTitle,()=>this.props.navigation.navigate('Home',{
            screen: 'Decks',}))
    }

    componentDidMount(){
        getDecks().then(decks=> this.setState({deck: decks[this.props.route.params.deckTitle],loaded:true}))
        // console.log()

        const unsubscribe = this.props.navigation.addListener('focus', () => {
            getDecks().then(decks=> this.setState({deck: decks[this.props.route.params.deckTitle],loaded:true}))
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }

    render(){
        const {deck} = this.state
        
        if(!this.state.loaded){
            return(
                <View></View>
            )
        }

        return(
            <View style={styles.container}> 
                <View style={{flex:0.4,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:40,}}> {deck.title} </Text>
                    <Text style={{fontSize:30,}}>{deck.questions.length} Question in this quiz</Text>
                </View>
                <View style={{flex:0.2,}} />
                <View style={{flex:0.2,justifyContent:'space-evenly',width:'70%',}}>
                    <Button mode="outlined" onPress={() => this.props.navigation.navigate('AddCard',{deckTitle:this.props.route.params.deckTitle})}>
                        Add Card
                    </Button>    
                    <Button mode="contained" onPress={() => this.startQuiz(deck.questions.length)}>
                        Start Quiz
                    </Button>
                    <Button mode="text" onPress={() => this.deleteDeck(deck.title)}>
                        Delete Deck
                    </Button>
                </View>
                <View style={{flex:0.2,}} />     
            </View>        
        )
    }
}
export default Deck;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent:'space-around',
    },
  });