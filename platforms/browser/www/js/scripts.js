
//buttons
var save = document.getElementById('save');
var refresh = document.getElementById('refresh');
//message area
var message = document.getElementById('message');
//containers
var mapContainer = document.getElementById('map-container');
var allPositions = document.getElementById('all');
//inputs
var locName = document.getElementById('name');
var locDesc = document.getElementById('desc');
//google maps
var map;
var marker;
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         disableDefaultUI: true
//     });
// }
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
var dbRefTeamMembers = dbRefTeam.child('team_members');
var dbRefMarkers = dbRefTeam.child('markers');
var teamMembers = {
    dev_1: 'Serhii Ovcharenko',
    dev_2: 'Nataliia Stefurak',
    dev_3: 'Valentyn Simeiko',
    dev_4: 'Sergii Kuts'
}
//set team members to firebase
dbRefTeamMembers.set(teamMembers);
//show data from firebase
//change list when added
dbRefMarkers.on('child_added', function (data) {
    var li = document.createElement('li');
    var dbLat = data.val().latitude;
    var dbLng = data.val().longitude;
    var dbName = data.val().name;
    var dbDesc = data.val().desc;
    //generage map as image
    var dbMap = "http://maps.googleapis.com/maps/api/staticmap?center=" + 
                dbLat + "," + dbLng + 
                "&zoom=14&size=" + 120 + "x" + 120 + 
                "&maptype=roadmap&markers=color:red%7C" +
                dbLat + "," + dbLng + "&sensor=false";
    li.innerHTML = '<img class="map-img" src="' + dbMap + '">' + '<p class="map-desc">Name: <br> ' + dbName + '<br> Description: <br>' + dbDesc + '</p>';
    li.id = data.key;
    //create li elements with data
    allPositions.appendChild(li);
});
//change list when removed
dbRefMarkers.on('child_removed', function (data) {
   var liToRemove = document.getElementById(data.key);
   liToRemove.remove();
});


//get current position
// navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
// function onSuccess(position) {
//     // coordinates
//     var myCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
//     //set center
//     map.setCenter(myCoords);
//     //marker
//     marker = new google.maps.Marker({
//         position: myCoords
//         });
//     //set zoom
//     map.setZoom(13);
//     //set marker
//     marker.setMap(map);
    
//     save.addEventListener('click', function () {
//         //get value of name
//         var nameValue = locName.value;
//         //get value of description
//         var descValue = locDesc.value;
//         //if values are empty
//         if (!nameValue) {
//             nameValue = 'No name';
//         }
//         if (!descValue) {
//             descValue = 'No description';
//         }
//         //data object
//         var data = {
//             latitude: myCoords.lat,
//             longitude: myCoords.lng,
//             name: nameValue,
//             desc: descValue
//         };
//         //save data to firebase
//         dbRefMarkers.push(data);
//         //disable name text
//         locName.disabled = 'true';
//         //disable discription text
//         locDesc.disabled = 'true';
//         //disable button
//         this.disabled = 'true';
//         this.style.backgroundColor = '#93ced6';
//         //message
//         message.style.display = 'block';
//         message.innerHTML = '<p>Position saved. Please, scroll down to see all saved positions. Or tap Refresh Position to get new position.</p>'
//     });
//     refresh.addEventListener('click', function () {
//         //reload the page
//         location.reload();
//         alert('Location refreshed');
//     });
// }
// function onError(error) {
//     alert('code: '    + error.code    + '\n' +
//         'message: ' + error.message + '\n');
// }