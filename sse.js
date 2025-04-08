document.addEventListener("DOMContentLoaded", function() {
    if (typeof(EventSource) !== "undefined") {
      // Ha nincs valódi SSE endpoint, szimuláljuk az értesítéseket egy setInterval segítségével:
      setInterval(function() {
        const now = new Date().toLocaleTimeString();
        // Az összes korábbi üzenet helyett csak a legújabb jelenik meg:
        document.getElementById("sseOutput").innerHTML = "Új rendelés érkezett: " + now;
      }, 10000); // 10 másodpercenként frissít (módosíthatod az időtartamot)
    } else {
      document.getElementById("sseOutput").textContent = "A böngésződ nem támogatja a Server-Sent Events-t.";
    }
  });
  