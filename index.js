
const redux = require('redux');
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        quantity: qty,
    }
}

const initialState = {
    numOfCakes: 10,
}

// (previousState, action) => newState

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }


        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.quantity,
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
store.dispatch(restockCake(3))

unsubscribe() //unregister listener 