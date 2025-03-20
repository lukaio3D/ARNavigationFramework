const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log("Your current position is:");
    document.getElementById("lat").innerHTML = `Latitude : ${crd.latitude}`;
    document.getElementById("lon").innerHTML = `Longitude: ${crd.longitude}`;
    document.getElementById("acc").innerHTML = `More or less ${crd.accuracy} meters.`;
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);