import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { saveDeckTitle, getDecks, removeAll } from '../utils/api'
import Deck from './Deck'

class AddDeck extends Component{
    state={
        deckTitle:""
    }
    
    addDeckTitle = () =>{
        if(this.state.deckTitle===''){
            Alert.alert(
                'Oops',
                'This deck has no title',
                [
                  { text: 'Ok' },
                ]
                ,{ cancelable: false }
            )
        }
        else{
        const deckTitle=this.state.deckTitle.charAt(0).toUpperCase() + this.state.deckTitle.slice(1)
        saveDeckTitle(deckTitle).then(this.navigateToDetails)
        }
        // getDecks().then(console.log)
    }
    navigateToDetails=()=>{
        this.props.navigation.navigate('Deck',{deckTitle:this.state.deckTitle})
        // this.props.navigation.navigate('Deck')
    }
    render(){
    
        return(
        <View style={styles.container}>
            <Text style={{flex:0.3,paddingTop:100,fontSize:32,textAlign:"center"}}> What's the title of your new Deck </Text>
            <TextInput value= {this.state.deckTitle} label='Deck Title' style={{width:'80%'}} onChangeText={(deckTitle) => this.setState({deckTitle})}/>
            <View style={{flex:0.3,width:'80%', marginTop:'10%' }}>
                <Button mode="outlined" onPress={this.addDeckTitle}>
                    Add Deck
                </Button>    
            </View>    
        </View>
    )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent:'flex-start',
    },
});

export default AddDeck;
