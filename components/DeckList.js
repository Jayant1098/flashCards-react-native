import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/api'
import { ScrollView } from 'react-native-gesture-handler';

class DeckList extends React.Component{
    state={
        decks:{},
    }

    componentDidMount(){
        getDecks().then(decks => this.setState({decks:decks}))
        
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log("loded")
            getDecks().then(decks => this.setState({decks:decks}))
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }

    render(){
        const {decks} = this.state
        const {navigation} = this.props
        // console.log(decks)
        return Object.keys(decks).length 
            ? (
            <View style={styles.container}>
                <ScrollView>
                {Object.keys(decks).map((deck) => {
                    const { title, questions } = decks[deck]
                    return(
                        <TouchableOpacity key={title} style={styles.deck} onPress= {()=> navigation.navigate('Deck',{deckTitle:title})} >
                        <View >
                            <Text style={{fontSize:40,paddingBottom:10,}}>{title}</Text>
                            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                                <Text style={{fontSize:30,}}>{questions.length}</Text>
                                <Text style={{fontSize:17,}}> flashcards</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    )
                })}
                </ScrollView>                
            </View>
        ) : ( 
            <View style={styles.container}>
            <View style={styles.deck}>
                <Text style={{fontSize:40,paddingBottom:10,}}>Mobile Flashcards  </Text>
                <Text style={{fontSize:30,}}>Add a deck to begin</Text>
            </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      paddingTop:'5%',
    },
    deck:{
        alignSelf:'center',
        width:'90%',
        padding:'3%',
        borderRadius:5,
        backgroundColor: '#dbc6f7',
        marginBottom:'5%',
    }


  });

export default DeckList;