
var main = function(){
  var latitude ;
  var longitude;
  var latlng;
  var cityState;
  var city;
  var state;
  var formattedCityState;
  var domLocation = document.getElementById("cityLocation");


  // put ajax call to open weather here 

  // api.openweathermap.org/data/2.5/forecast?lat=35&lon=139 















// converts the lat and long to a location
// places a marker and infowindow label on the map
  var geocodeLatLng= function(geocoder, map, infowindow) {
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          cityState = results[1].formatted_address;
          city = results[1].address_components[1].long_name;
          state = results[1].address_components[3].short_name;
          formattedCityState = city + ", " + state;
          infowindow.setContent(formattedCityState);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
// initialize the google map
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: latlng
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    
    // convert the coordinates in to a location on the map 
    geocodeLatLng(geocoder, map, infowindow);
  };
// function to obtain geolocation from the browser
// once it completes, it calls the initMap function
  var getLocation = function(){
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position){
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;
      domLocation.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
      latlng = {lat: latitude, lng: longitude};

      initMap();
    }
    // if geolocation fails
    function error(){
      console.log('can not find you');
    }
  };
// get the geolocation from the browser
  getLocation();
};
// called after google maps call returns
var init = function(){
  main();
};
// called if google map api fails to load
var mapAPILoadFailed = function(){
  console.log("the map api load failed");
};
