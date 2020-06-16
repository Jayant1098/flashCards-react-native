import {AsyncStorage} from 'react-native'

const STORAGE_KEY='UDACI:FLASHCARDS'

const initalData= {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

export function getData(){
    return initalData
}

export function getDecks(){
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(results => {
            if( results === null ){
                AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(initalData))
                return initalData
            }
            else{
                return JSON.parse(results)
            }
        })
}

export function saveDeckTitle(deckTitle){
    // const deck = JSON.stringify({
    //     [deckTitle]: {
    //         title : deckTitle,
    //         questions: [] 
    //     }
    // })
    return AsyncStorage.mergeItem(STORAGE_KEY,JSON.stringify({
        [deckTitle]: {
            title : deckTitle,
            questions: [] 
        }
    }))
}

export function removeAll(){
    AsyncStorage.clear()
}

export function addDeckCard(deck,question){
    return AsyncStorage.getItem(STORAGE_KEY)
      .then((decks)=>JSON.parse(decks))
      .then(parsedDeck => {
        const questions = [...parsedDeck[deck].questions,question]
        // console.log('questionsArrrayy',questions)
        const updatedObject = JSON.stringify({[deck] : {title : deck, questions}})
        // console.log(updatedObject)
        return AsyncStorage.mergeItem(STORAGE_KEY,updatedObject)
      })
}

export function removeDeck(deck,cb){
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(JSON.parse)
      .then(parsedDeck => {
        delete parsedDeck[deck]
        // console.log('Updated Deck',parsedDeck)
        return AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(parsedDeck)).then(cb())
      })
      .catch(console.log)
}