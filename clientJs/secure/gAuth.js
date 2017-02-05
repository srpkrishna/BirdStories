
var auth2;
var eventListener;
/**
 * Initializes the Sign-In client.
 */
function initGClient(listener, googleLoadSuccess) {
    eventListener = listener;
    gapi.load('auth2', function(){
        /**
         * Retrieve the singleton for the GoogleAuth library and set up the
         * client.
         */
        auth2 = gapi.auth2.init({
          client_id:"113332297879-2c0bl4e42qokglovtthficb1ubvldgch.apps.googleusercontent.com",
          cookiepolicy: 'single_host_origin',
          scope:'profile'
        });

        if(googleLoadSuccess && auth2){
          googleLoadSuccess(auth2)
        }
        // Listen for sign-in state changes.
        auth2.isSignedIn.listen(signinChanged);

        // Listen for changes to current user.
        auth2.currentUser.listen(userChanged);

        // Sign in the user if they are currently signed in.
        if (auth2.isSignedIn.get() == true) {
          auth2.signIn();
        }
    });
};

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val) {
  console.log('Signin state changed to ', val);
  //eventListener(val);
};

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function (response) {
  console.log('User now: ', response);

  var user;
  if(response.isSignedIn()){
    user = {}
    user.token = response.getAuthResponse().id_token;;
    user.id = response.getId();
    user.service = "google";
    var profile = response.getBasicProfile()
    user.email = profile.getEmail();
    user.name = profile.getName();
    user.imageUrl = profile.getImageUrl()
  }
  eventListener(response.isSignedIn(),user)
};


function signIn(){
  if(auth2){
    auth2.signIn();
  }
}

const GAuth = {
  init:initGClient,
  signIn:signIn
}
export default GAuth
