/** Project: PROG3180 Programming: Mobile Applications
 * Purpose: Final Project
 *       - javascript for geo function.
 *
 * Revision History
 *       - 2018.04.08 Created by Moon
 */

var mapMarker;

/**
 * show google map
 */
function showGoogleMap() {
    //shortcut - try
    try {
        if (navigator.geolocation != null) {
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            function onSuccess(position) {
                var coordinates = position.coords;
                var lat = coordinates.latitude;
                var lng = coordinates.longitude;

                //shortcut - info
                console.info("Lat: " + lat + " Lng: " + lng);
                var type = google.maps.MapTypeId.ROADMAP;

                var mapOptions = {
                    zoom: 12,
                    center: {
                        lat: lat,
                        lng: lng
                    },
                    mapTypeId: type //roadmap, satellite, hybrid, terrain
                };

                var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                var markerOptions = {
                    position: {
                        lat: lat,
                        lng: lng
                    },
                    map: map,
                    title: "Moon Kim--Final Project",
                    draggable: true
                };

                mapMarker = new google.maps.Marker(markerOptions);
            }

            function onFail(error) {
                var msg = "";
                try {
                    if (error) {
                        //shortcut - switch
                        switch (error.code) {
                            case error.TIMEOUT:
                                msg = "TIMEOUT: " + error.message;
                            case error.PERMISSION_DENIED:
                                msg = "PERMISSION_DENIED: " + error.message;
                            case error.POSITION_UNAVAILABLE:
                                msg = "POSITION_UNAVAILABLE: " + error.message;
                                break;
                            default:
                                msg = "UNHANDLED MESSAGE CODE: (" + error.code + ") : " + error.message;
                                break;
                        }
                        console.error(msg);
                    }
                } catch (e) {
                    console.error("Exception (geolocationError): " + e);
                }

            }

            navigator.geolocation.getCurrentPosition(onSuccess, onFail, options);
        }
        else {
            console.error("HTML5 geolocation is not supported");
        }
    } catch (e) {
        //shortcut - error
        console.error("Exception in showMap(): " + e);
    }
}

function showGoogleMapEdit(lat, lng){
    //shortcut - try
    try {
        if (navigator.geolocation != null) {
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            function onSuccess(position) {
                var coordinates = position.coords;
                //var lat = coordinates.latitude;
                //var lng = coordinates.longitude;

                //shortcut - info
                console.info("Lat: " + lat + " Lng: " + lng);
                var type = google.maps.MapTypeId.ROADMAP;

                var mapOptions = {
                    zoom: 12,
                    center: {
                        lat: lat,
                        lng: lng
                    },
                    mapTypeId: type //roadmap, satellite, hybrid, terrain
                };

                var map = new google.maps.Map(document.getElementById('map-canvas-edit'), mapOptions);

                var markerOptions = {
                    position: {
                        lat: lat,
                        lng: lng
                    },
                    map: map,
                    title: "Moon Kim--Final Project",
                    draggable: true
                };

                mapMarker = new google.maps.Marker(markerOptions);
            }

            function onFail(error) {
                var msg = "";
                try {
                    if (error) {
                        //shortcut - switch
                        switch (error.code) {
                            case error.TIMEOUT:
                                msg = "TIMEOUT: " + error.message;
                            case error.PERMISSION_DENIED:
                                msg = "PERMISSION_DENIED: " + error.message;
                            case error.POSITION_UNAVAILABLE:
                                msg = "POSITION_UNAVAILABLE: " + error.message;
                                break;
                            default:
                                msg = "UNHANDLED MESSAGE CODE: (" + error.code + ") : " + error.message;
                                break;
                        }
                        console.error(msg);
                    }
                } catch (e) {
                    console.error("Exception (geolocationError): " + e);
                }

            }

            navigator.geolocation.getCurrentPosition(onSuccess, onFail, options);
        }
        else {
            console.error("HTML5 geolocation is not supported");
        }
    } catch (e) {
        //shortcut - error
        console.error("Exception in showMap(): " + e);
    }
}