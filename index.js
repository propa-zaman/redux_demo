
const redux = require('redux');
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED';

function orderCake(){
  return  {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

const initialState = {
    numOfCakes: 10,
}

// (previousState, action) => newState

const reducer = (state= initialState, action) =>{
    switch(action.type){
        case CAKE_ORDERED:
            return{
                numOfCakes: state.numOfCakes - 1,
            }
            default:
                return state
    }
}

const store = createStore(reducer)
console.log('Initial State', store.getState())  //allow access to state via getState()

const unsubscribe = store.subscribe(() => console.log('pdate state', store.getState())) //register listener

store.dispatch(orderCake()) //allow state to be updated
store.dispatch(orderCake())
store.dispatch(orderCake())

unsubscribe() //unregister listener 