// --- Device Orientation ---
function initDeviceOrientation() {
    if (window.DeviceOrientationEvent) {
      // Auf iOS 13+ muss die Erlaubnis explizit eingeholt werden.
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(function(permissionState) {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, true);
            } else {
              console.error("Erlaubnis für DeviceOrientation wurde nicht erteilt.");
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    } else {
      console.error("DeviceOrientationEvent wird von diesem Browser nicht unterstützt.");
    }
  }
  
  function handleOrientation(event) {
    let heading;
    // iOS-Safari liefert häufig den Wert in webkitCompassHeading.
    if (event.webkitCompassHeading !== undefined) {
      heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      // Umrechnung: Bei manchen Geräten entspricht event.alpha nicht direkt der Himmelsrichtung.
      heading = 360 - event.alpha;
    }
    if (heading !== undefined) {
      document.getElementById('heading').textContent = Math.round(heading) + '°';
    }
  }
  
  // --- Geolocation ---
  function initGeolocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        function(position) {
          const coords = position.coords;
          const posText = "Lat: " + coords.latitude.toFixed(6) +
                          ", Lon: " + coords.longitude.toFixed(6) +
                          " (Genauigkeit: " + coords.accuracy + " m)";
          document.getElementById('position').textContent = posText;
        },
        function(error) {
          console.error("Fehler beim Abrufen der Geolocation:", error);
          document.getElementById('position').textContent = "Position konnte nicht geladen werden.";
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    } else {
      console.error("Geolocation wird von diesem Browser nicht unterstützt.");
      document.getElementById('position').textContent = "Geolocation nicht unterstützt.";
    }
  }
  
  // --- Initialisierung ---
  initDeviceOrientation();
  initGeolocation();