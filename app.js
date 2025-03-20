const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  document.getElementById("lat").innerHTML = `Latitude : ${crd.latitude}`;
  document.getElementById("lon").innerHTML = `Longitude: ${crd.longitude}`;
  document.getElementById(
    "acc"
  ).innerHTML = `More or less ${crd.accuracy} meters.`;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function handleOrientation(event) {
  let heading = 360 - event.alpha;

  document.getElementById("north").innerHTML = `Heading: ${Math.round(
    heading
  )}° `;
  document.getElementById("alpha").innerHTML = `alpha: ${Math.round(
    event.alpha
  )}° `;
  document.getElementById("beta").innerHTML = `beta: ${Math.round(
    event.beta
  )}° `;
  document.getElementById("gamma").innerHTML = `gamma: ${Math.round(
    event.gamma
  )}° `;
}

// Initialize on start
const btn = document.getElementById("start");
btn.addEventListener("click", () => {
  navigator.geolocation.watchPosition(success, error, options);

  // Prüfe, ob iOS explizite Berechtigung benötigt
  if (
    window.DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        } else {
          console.error("Device orientation permission denied.");
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", handleOrientation);
  }
});
