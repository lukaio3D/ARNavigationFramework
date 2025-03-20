document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("startButton");
    btn.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(success, error, options);
    });
});

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    document.getElementById("lat").innerHTML = `Latitude : ${crd.latitude}`;
    document.getElementById("lon").innerHTML = `Longitude: ${crd.longitude}`;
    document.getElementById("acc").innerHTML = `More or less ${crd.accuracy} meters.`;
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function handleOrientation(event){
    document.getElementById("north").innerHTML = `heading ${event.absolute}° `;
    document.getElementById("alpha").innerHTML = `alpha ${event.alpha}° `;
    document.getElementById("beta").innerHTML = `beta ${event.beta}° `;
    document.getElementById("gamma").innerHTML = `gamma ${event.gamma}° `;
  }

  window.addEventListener("deviceorientation", handleOrientation);