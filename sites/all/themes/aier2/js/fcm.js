var config = {
  apiKey           : "AIzaSyDhq4ItvL4NuJmU8Jco9kuKq2z2iVVA9SI",
  authDomain       : "knectar-aier.firebaseapp.com",
  databaseURL      : "https://knectar-aier.firebaseio.com",
  projectId        : "knectar-aier",
  storageBucket    : "knectar-aier.appspot.com",
  messagingSenderId: "297121235501"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

if (!fcm_st_get()) {
  messaging.requestPermission()
    .then(function() {
      //console.log('Permission granted.');
      return messaging.getToken();
    })
    .then(function(token) {
      //console.log(token);
      fcm_send(token);
    })
    .catch(function(err) {
      //console.log('Unable to get permission to notify.', err);
    });
  fcm_st_set();
}

// User is on page.
messaging.onMessage(function(payload) {
  //console.log('onMessage: ', payload);
});

/**
 * Send subscription to the server.
 */
function fcm_send(token) {
  var d = new Date();
  jQuery.post('/fcm/subscribe?' + d.getTime(),
    JSON.stringify({
      token: token,
      type: 'web'
    })
  );
}

/**
 * Set sessionStorage value.
 */
function fcm_st_set() {
  sessionStorage['fcm_check'] = 1;
}

/**
 * Gets sessionStorage value.
 * @returns {*}
 */
function fcm_st_get() {
  return sessionStorage['fcm_check'];
}
