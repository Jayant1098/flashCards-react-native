import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import {getDecks} from '../utils/api'
import { Button } from 'react-native-paper'

class Quiz extends React.Component{

    state ={
        questionIndex:0,
        deck:{},
        answeredCorrectly:0,
        loaded:false,
        showAnswer:false,
    }

    updateAppBar(){
        // console.log('WTG')
        const {questionIndex,deck}=this.state
        this.props.navigation.setOptions({ title: `Question(${questionIndex+1}/${deck.questions.length})` })
    }
    componentDidMount(){
        getDecks().
            then(decks=> this.setState({deck: decks[this.props.route.params.deckTitle],loaded:true}))

        // if Quiz is Reset
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            // console.log(this.props)
            if(this.props.route.params.reset){
                this.setState({questionIndex:0,answeredCorrectly:0,showAnswer:false})
            }
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }

    handleAnswer(choice){
        const {deck,questionIndex,answeredCorrectly} = this.state
        
        // Todo: Add answer Handling Logic
        const correctAnswers = choice ? answeredCorrectly +1 : answeredCorrectly
        this.props.navigation.setOptions({ title: `Question(${questionIndex+1}/${deck.questions.length})` })
        if(questionIndex+1 === deck.questions.length){
            this.props.navigation.navigate(
                'Result', {
                    correct:correctAnswers,
                    total:deck.questions.length,
                    deckTitle:this.props.route.params.deckTitle,
                }
            )
        }
        else{this.setState({questionIndex: questionIndex+1,showAnswer:false,answeredCorrectly : correctAnswers})}
    }

    render(){

        const {questionIndex,deck,answeredCorrectly,loaded,showAnswer} = this.state
        
        if(!loaded){
        return(
            <View><Text>Loading your quiz</Text></View>
        )}
        this.updateAppBar()
        

        return(
            <View style={styles.container}>
                <View  style={{flex:0.5,fontSize:32,justifyContent:'center',width:'80%'}}>
                <Text style={{textAlign:'center',fontSize:32}}> 
                    {showAnswer 
                        ? deck.questions[questionIndex].answer 
                        : deck.questions[questionIndex].question}
                </Text>
                </View>                
                <Button style={{flex:0.3}} mode="text" onPress={() => this.setState(({showAnswer})=>({showAnswer:!showAnswer}))}>
                    {showAnswer ? 'Show Question' : 'Show Answer'}
                </Button>
                {showAnswer && 
                <View style={{flex:0.2,flexDirection:'row',width:'80%',justifyContent:'space-evenly'}}>
                <Button  style={{flex:0.3, height:50,justifyContent:'center'}} mode="contained" onPress={() => this.handleAnswer(true)}>
                    Correct
                </Button>
                <Button style={{flex:0.3 ,height:50,justifyContent:'center'}}  dark='false' mode="contained" onPress={() => this.handleAnswer(false)}>
                    Incorrect
                </Button>
                </View>}
            </View>
        )
    }
    
}

export default Quiz;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent:'center',
      alignItems:'center',
      justifyContent:'flex-start',
    },
  });