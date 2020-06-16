import React from 'react';
import { Button,TextInput } from 'react-native-paper'
import { View, Alert, StyleSheet } from 'react-native'
import {addDeckCard} from '../utils/api'

class AddCard extends React.Component {
    state = {
         question:'',
         answer:'' 
    }
    
    addCardToDeck(){
        const { question, answer } = this.state
        
        if (question==='' || answer===''){
            Alert.alert(
                'Missing',
                'Add both Question and Answer',
                [
                  { text: 'Ok', onPress: () => console.log('Ask me later pressed') },
                ]
                ,{ cancelable: false }
            )
        }
        else{
            const deck= this.props.route.params.deckTitle
            const questionToBeAdded = { question,answer}
            addDeckCard(deck,questionToBeAdded).then(()=>this.setState({question:'',answer:''}))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <TextInput
                        label='Question'
                        value={this.state.question}
                        onChangeText={question => this.setState({ question })}
                    />                
                    <TextInput
                        label='Answer'
                        value={this.state.answer}
                        onChangeText={answer => this.setState({ answer })}
                    />
                    <Button mode="contained" onPress={()=>this.addCardToDeck()}>
                        Submit
                    </Button>
                </View>                
            </View>        
        );
    }
}

export default AddCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    top:{
        flex: 0.4,
        backgroundColor: '#fff',
        justifyContent:'flex-start',
    }
  });