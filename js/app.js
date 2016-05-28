
var main = function(){
  var domLocation = document.getElementById("cityLocation");
  var latitude, longitude;
  var getLocation = function(){
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position){
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;
      domLocation.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    }

    function error(){
      console.log('can not find you');
    }
  };
  getLocation();
};

var init = (function(){
  main();
})();
