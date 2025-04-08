document.getElementById('getLocationBtn').addEventListener('click', function() {
    // Ellenőrizzük, hogy a böngésző támogatja-e a geolocation API-t
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.getElementById('geoOutput').textContent = "A böngésződ nem támogatja a helymeghatározást.";
    }
  });
  
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // Egyszerű megjelenítés: kiírja a szélességet és hosszúságot
    document.getElementById('geoOutput').innerHTML = "Szélesség: " + lat + "<br>Hosszúság: " + lon;
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById('geoOutput').textContent = "A helymeghatározás engedélyezése megtagadva.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById('geoOutput').textContent = "Az információ nem elérhető.";
        break;
      case error.TIMEOUT:
        document.getElementById('geoOutput').textContent = "A kérelem időtúllépett.";
        break;
      default:
        document.getElementById('geoOutput').textContent = "Ismeretlen hiba történt.";
        break;
    }
  }
  