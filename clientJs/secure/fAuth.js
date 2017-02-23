
var auth2;
var user;
var eventListener;
var fcount = 0;
/**
 * Initializes the Sign-In client.
 */
function initFClient(listener, fbLoadSuccess) {
    eventListener = listener;
    initFB(fbLoadSuccess);
};

function initFB(fbLoadSuccess){

  if("undefined" === typeof FB){
    fcount++

    if(fcount < 3)
      setTimeout(function(){ initFB(fbLoadSuccess) }, 1000);

    return
  }

  FB.init({
  appId      : '1882742771959476',
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.8' // use graph api version 2.8
  });
  fbLoadSuccess();
  checkLoginState();

}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    user = {}
    user.token = response.authResponse.accessToken;
    user.service = "fb";
    getProfileInfo();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    eventListener(false);
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    eventListener(false);
  }
}

function getProfileInfo(){
  FB.api('/me?fields=id,name,email,picture', function(response) {
       user.id = response.id;
       user.email = response.email;
       user.name = response.name;
       user.imageUrl = response.picture.data.url
       eventListener(true,user);
     });
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function signIn(){
  FB.login(function(response){
    statusChangeCallback(response);
  },{scope: 'public_profile,email'});
}


const FAuth = {
  init:initFClient,
  signIn:signIn
}
export default FAuth
