// JavaScript Document

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    getLocation();
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
}


//=======================Geolocation Operations=======================//
// onGeolocationSuccess Geolocation
function onGeolocationSuccess(position) {
    // Use Google API to get the location data for the current coordinates
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({ "latLng": latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if ((results.length > 1) && results[1]) {
                $("#myLocation").html(results[1].formatted_address);
            }
        }
    });

    // Use Google API to get a map of the current location
    // http://maps.googleapis.com/maps/api/staticmap?size=280x300&maptype=hybrid&zoom=16&markers=size:mid%7Ccolor:red%7C42.375022,-71.273729&sensor=true
    var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&zoom=16&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng;
    var mapImg = '<img src="' + googleApis_map_Url + '" />';
    $("#map_canvas").html(mapImg);
}

// onGeolocationError Callback receives a PositionError object
function onGeolocationError(error) {
    $("#myLocation").html("<span class='err'>" + error.message + "</span>");
}



//=======================Say Hello (Page 1) Operations=======================//
function sayHello() {
    var inputText = $('#txtName').val();

    $("#helloWorldText").html('Hello, ' + inputText + '!').slideDown();
    $("#helloWorldInput").slideUp();
}

function sayHelloReset() {
    $("#helloWorldText").html('').slideUp();
    $("#helloWorldInput").val('').slideDown();
}







function createChart() {
    $("#chart").kendoChart({
        theme: $(document).data("kendoSkin") || "default",
        title: {
            text: "Spain Electricity2008"
        },
        legend: {
            position: "bottom",
            labels: {
                template: "#= text # (#= value #%)"
            }
        },
        seriesDefaults: {
            labels: {
                visible: false,
                format: "{0}%"
            }
        },
        series: [{  
            type: "pie",
            data: [ {
                category: "Hydro",
                value: 22
            }, {
                category: "Solar",
                value: 2
            }, {
                category: "Nuclear",
                value: 49
            }, {
                category: "Wind",
                value: 27
            } ]
        }],
        tooltip: {
            visible: true,
            format: "{0}%"
        }
    });
}

$(document).ready(function() {
        createChart();

        $("#example").bind("kendo:skinChange", function(e) {
            createChart();
        });
    
      //var app = new kendo.mobile.Application(document.body, { transition: "", layout: "mobile-tabstrip" });

});