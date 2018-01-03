//menu
var menu = document.getElementById('menu');
var menuLine = document.querySelectorAll('.menu-line');
//buttons
var btnMap = document.getElementById('show-map');
var btnAll = document.getElementById('show-all');
var save = document.getElementById('save');

var mapContainer = document.getElementById('map-container');
var allPositions = document.getElementById('all');
//google maps
var map;
var marker;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 42.9854526, lng: -81.2449256},
        disableDefaultUI: true
    });
};
//firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDC9nEswkJNazc1jBdZfn-a4mygPTkonME",
    authDomain: "college-1506741952765.firebaseapp.com",
    databaseURL: "https://college-1506741952765.firebaseio.com",
    projectId: "college-1506741952765",
    storageBucket: "college-1506741952765.appspot.com",
    messagingSenderId: "1019455657876"
};
firebase.initializeApp(config);
var dbRefTeam = firebase.database().ref('ITFUN');
var dbRefMarkers = dbRefTeam.child('markers');
//show data from firebase
//change list when added
dbRefMarkers.on('child_added', function (data) {
    var li = document.createElement('li');
    var dbLat = data.val().latitude;
    var dbLong = data.val().longitude;
    li.innerHTML = dbLat + '<br>' + dbLong;
    li.id = data.key;
    //create li elements with data
    allPositions.appendChild(li);
});
//change list when removed
dbRefMarkers.on('child_removed', function (data) {
   var liToRemove = document.getElementById(data.key);
   liToRemove.remove();
});


//show me on map
btnMap.addEventListener('click', function() {
    //hide all positions if visible
    if (allPositions.style.display === 'block') {
        allPositions.style.display = 'none';
    }
    //animate menu
    menuLine.forEach( function (e) {
        e.classList.add('rotate');
    });
    //disable this button so you will not place marker again
    this.disabled = true;
    //change text color of this button
    this.style.color = 'rgba(255, 255, 255, 0.4)';
    btnAll.style.color = 'rgba(255, 255, 255, 0.7)';
    //show map
    mapContainer.style.display = 'block';
    //show button
    save.style.display = 'block';
    
    //get current position
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
    
    function onSuccess(position) {
        // coordinates
        var myCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
        //set center
        map.setCenter(myCoords);
        //marker
        marker = new google.maps.Marker({
            position: myCoords
          });
        //set zoom
        map.setZoom(13);
        //set marker
        marker.setMap(map);
        //save marker to firebase
        var data = {
            latitude: myCoords.lat,
            longitude: myCoords.lng
        }
        save.addEventListener('click', function () {
            dbRefMarkers.push(data);
            // clear marker
            marker.setMap(null);
            //remove marker
            marker = null;
        });
    };
    
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }
});

btnAll.addEventListener('click', function() {
    // clear marker
    if (marker) {
        marker.setMap(null);
        //remove marker
        marker = null;
    }
    //enable show map button back
    btnMap.disabled = false;
    //change text color of show map button
    btnMap.style.color = 'rgba(255, 255, 255, 0.7)';
    //change text color of this button
    this.style.color = 'rgba(255, 255, 255, 0.4)';
    //animate menu
    menuLine.forEach( function (e) {
        e.classList.add('rotate');
    });
    //hide map
    mapContainer.style.display = 'none';
    //hide button
    save.style.display = 'none';
    //show all positions
    allPositions.style.display = 'block';
});



//menu button change from humburger to X
// menu.addEventListener( 'click', function() {
//     if (nav.style.visibility === 'hidden') {
//         menuLine.forEach( function (e) {
//             e.classList.add('rotate');
//         });
//     } else {
//         menuLine.forEach( function (e) {
//             e.classList.remove('rotate');
//         });
//     }
// });