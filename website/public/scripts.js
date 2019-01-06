// Initialize Firebase
var config = {
  apiKey: "AIzaSyBTuq1Xvp6c8quCspd-1HEJu2GHnd3UKQc",
  authDomain: "titanscoutandroid.firebaseapp.com",
  databaseURL: "https://titanscoutandroid.firebaseio.com",
  projectId: "titanscoutandroid",
  storageBucket: "titanscoutandroid.appspot.com",
  messagingSenderId: "1097635313476"
};
firebase.initializeApp(config);
// FirebaseUI config.
var uiConfig = {
  callbacks:{
    signInSuccessWithAuthResult:function(authResult, redirectUrl) {
      if (authResult.user) {
        handleSignedInUser(authResult.user);
      }
      return false;
    }
  },
  //signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  //  firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: function(){alert("this is a test app. don't use it");},
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    alert("we will steal all of the data");
  }
};
var handleSignedInUser = function(user) {
  document.getElementById("mainhead").innerHTML = "TitanScout- Create Form";
  if (user.displayName != null){
    document.getElementById('status').innerHTML = "You are signed in as: " + user.displayName;
  }else if (user.email != null) {
    document.getElementById('status').innerHTML = "You are signed in as: " + user.email;
  }else if (user.phoneNumber != null) {
    document.getElementById('status').innerHTML = "You are signed in as: " + user.phoneNumber;
  }else{
    document.getElementById('status').innerHTML = "You are signed in.";
  }
  document.getElementById('signout').style.display='inline-block';
  document.getElementById('deleteacc').style.display='inline-block';
}
var handleSignedOutUser = function() {
  document.getElementById("mainhead").innerHTML = "TitanScout- Sign In";
  document.getElementById('status').innerHTML = "You are not signed in.";
  document.getElementById('signout').style.display='none';
  document.getElementById('deleteacc').style.display='none';
  ui.start('#firebaseui-auth-container', uiConfig);
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
var deleteAccount = function() {
  try {
    firebase.auth().currentUser.delete()
    handleSignedOutUser()
  } catch (error) {
    if (error.code == 'auth/requires-recent-login') {
      // The user's credential is too old. She needs to sign in again.
      signout()
        // The timeout allows the message to be displayed after the UI has
        // changed to the signed out state.
      setTimeout(function() {
          alert('Please sign in again to delete your account.');
        }, 1);
      }
  }
};
function signout() {
  var user = firebase.auth().currentUser;
  firebase.auth().signOut()
  handleSignedOutUser()
}