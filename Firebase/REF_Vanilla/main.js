(function(){
    
    // Initialize firebase
    // TODO: Replace with your project's customized code snippet
    var config = {
        apiKey: "AIzaSyAOVp-y_2-7TWHQi2DExoCeTqpAEBRNEUU",
        authDomain: "diarystudy-99fd2.firebaseapp.com",
        databaseURL: "https://diarystudy-99fd2.firebaseio.com",
        projectId: "diarystudy-99fd2",
        storageBucket: "diarystudy-99fd2.appspot.com",
        messagingSenderId: "327031784623"
    };
    firebase.initializeApp(config);

    // Authentication
    firebase.auth().onAuthStateChanged(function(auth) {
        console.log("AuthChanged")
        console.log(auth)
    });

    // Login
    $("#login").on("click", function(){
        $("#error").empty();

        var email = $("#email").val();
        var password = $("#password").val();

        console.log("logging in: " + email)
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(function(result){
                console.log("Successfully logged in")
                console.log(result)
                uid = result.uid;
            })
            .catch(function(error){
                console.log("Error logging in")
                console.log(error)
                $("#error").text(error.message)
            })
    })

    // Register
    $("#register").on("click", function(){
        $("#error").empty();

        var email = $("#email").val();
        var password = $("#password").val();

        console.log("registering: " + email)
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(result){
                console.log("Successfully registered")
                console.log(result)
                uid = result.uid
                
                // create new users
                firebase.database().ref("/users/" + uid)
                    .set({                        
                        name: email
                    })
            })
            .catch(function(error){
                console.log("Error registering")
                console.log(error)
                $("#error").text(error.message)
            })
    })

    // Create new Game
    $("#newgame").on("click", function(){
        console.log("new game")
        var gameKey = firebase.database().ref("/games")
            .push({
                    "currentPlayerNumber" : 1,
                    "height" : 10,
                    "lines" : [ ],
                    "players" : [ {
                        "name" : "test1",
                        "uid" : "EQiVyJtP4VeTLnulXc4Ym1rPD9p2"
                    }, {
                        "name" : "test2",
                        "uid" : "6sStROgWUtdXeJAFRpoe3rTAjUT2"
                    } ],
                    "width" : 10
                }).key;
            firebase.database().ref("/users/" + uid + "/games")
                .push(gameKey)
        })
        

    // Get a list of all the games
    $("#games").on("click", function(){
        console.log("games")
        firebase.database().ref("/users/" + uid + "/games")
            .on("value", function(snapshot){
                console.log(snapshot.val())
            })
    })

})()