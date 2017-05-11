;(function(){

    // Reducer
    //  (state, action) => state
    //      INCREMENT ? state + 1
    //      DECREMENT ? state - 1
    var counterReducer = function(state, action) {
        // INITIAL STATE
        if(state === undefined){
            return 0;
        }

        // return new state based on actions
        switch(action.type) {
            case 'INCREMENT':
                return state + 1;
            
            case 'DECREMENT':
                return state - 1;

            default:
                return state;
        }
    };

    // Store
    //  createStore(reducer)
    //  subscribe to change
    var store = Redux.createStore(counterReducer);

    // Action Creators
    //  INCREMENT
    //  DECREMENT
    var increment = function(){
        return {type: 'INCREMENT'}
    };
    
    var decrement = function(){
        return {type: 'DECREMENT'}
    };

    // View
    var updateView = function(){
        var count = store.getState().toString();
        document.getElementById('count').innerHTML = count;
    };
    
    store.subscribe(updateView)

    // View Actions
    document.getElementById('increment')
        .addEventListener('click', function(){
            store.dispatch(increment())
        });

    document.getElementById('decrement')
        .addEventListener('click', function(){
            store.dispatch(decrement())
        });
    
}());
