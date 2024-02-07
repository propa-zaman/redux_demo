
const redux = require('redux');
const createStore = redux.createStore; //to create reduxStore
const bindActionCreators = redux.bindActionCreators //to pass action objects as props
const combineReducers = redux.combineReducers //to pass multiple reducers

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger(); //middleware

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

//actions
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20,
// }

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}

// (previousState, action) => newState
//reducers
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }


        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            }


        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default:
            return state
    }
}

const rootReducers = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducers)
console.log('Initial State', store.getState())  //allow access to state via getState()

const unsubscribe = store.subscribe(() => console.log('Update state', store.getState())) //register listener

// store.dispatch(orderCake()) //allow state to be updated
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(6))

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(3);

unsubscribe() //unregister listener 