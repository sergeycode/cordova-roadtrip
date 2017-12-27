//menu
var menu = document.getElementById('menu');
var menuLine = document.querySelectorAll('.menu-line');
//buttons
var btnMap = document.getElementById('show-map');
var btnAll = document.getElementById('show-all');
var save = document.getElementById('save');

var allPositions = document.getElementById('all');
var map = document.getElementById('map');
var googleMap;
function initMap() {
    googleMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        disableDefaultUI: true
    });
}

btnMap.addEventListener('click', function() {
    //hide all positions if visible
    if (allPositions.style.visibility = 'visible') {
        allPositions.style.visibility = 'hidden';
        allPositions.style.opacity = '0';
    }
    //animate menu
    menuLine.forEach( function (e) {
        e.classList.add('rotate');
    });
    //show map
    map.style.visibility = 'visible';
    map.style.opacity = '1';
    //show button
    save.style.visibility = 'visible';
    save.style.opacity = '1';
    save.style.webkitTransform = 'translate3d(0, -10px, 0)';
    //get current position
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
    function onSuccess(position) {
        // coordinates
        var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
        //set center
        googleMap.setCenter(myLatLng);
        //marker
        var marker = new google.maps.Marker({
            position: myLatLng
          });
        //set marker
        marker.setMap(googleMap);
    };
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }
});

btnAll.addEventListener('click', function() {
    //animate menu
    menuLine.forEach( function (e) {
        e.classList.add('rotate');
    });

    if (map.style.visibility === 'visible') {
        //hide map
        map.style.visibility = 'hidden';
        map.style.opacity = '0';
        //hide button
        save.style.visibility = 'vishiddenible';
        save.style.opacity = '0';
        save.style.webkitTransform = 'translate3d(0, 0, 0)';
    }
    allPositions.style.visibility = 'visible';
    allPositions.style.opacity = '1';
    allPositions.innerHTML = 'All here';
});



//menu button change from humburger to X
menu.addEventListener( 'click', function() {
    if (nav.style.visibility === 'hidden') {
        menuLine.forEach( function (e) {
            e.classList.add('rotate');
        });
    } else {
        menuLine.forEach( function (e) {
            e.classList.remove('rotate');
        });
    }
});

/*
document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {

                var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
                document.getElementById('btn').onclick = function() {
                    navigator.geolocation.clearWatch(watchID);
                    document.getElementById('stop-message').innerHTML = 'last location stopped';
                }
            }
            
            // onSuccess Callback
            // This method accepts a Position object, which contains the
            // current GPS coordinates
            //
            var onSuccess = function(position) {
                document.getElementById('geo').innerHTML =  'Latitude: ' + position.coords.latitude + '<br>' +
                                                            'Longitude: ' + position.coords.longitude + '<br>';
            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
            }
*/