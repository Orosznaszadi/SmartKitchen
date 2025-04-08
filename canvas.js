document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("deliveryCanvas");
    if (!canvas) return; 
    const ctx = canvas.getContext("2d");
  
    let x = -120; // Az autó kezdeti pozíciója (balra a képernyőn, hogy be tudjon gurulni)
    const speed = 2; // Mozgási sebesség
  
    function drawCar() {
      // Töröljük a canvas tartalmát
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Autó testének rajzolása: egy téglalap
      ctx.fillStyle = "#007BFF"; // kék szín
      ctx.fillRect(x, canvas.height / 2 - 30, 100, 40); // pozíció: (x, canvas.height/2 - 30), szélesség: 100, magasság: 40
  
      // Autó tetejének rajzolása: kisebb téglalap, hogy kerekedjen az alakja
      ctx.fillStyle = "#66B2FF";
      ctx.fillRect(x + 20, canvas.height / 2 - 50, 60, 20);
  
      // Kerekek rajzolása
      ctx.beginPath();
      ctx.arc(x + 25, canvas.height / 2 + 10, 10, 0, Math.PI * 2); // bal oldali kerék
      ctx.arc(x + 75, canvas.height / 2 + 10, 10, 0, Math.PI * 2); // jobb oldali kerék
      ctx.fillStyle = "#333";
      ctx.fill();
  
      // Frissítjük az autó pozícióját
      x += speed;
      if (x > canvas.width) {
        x = -120; // Ha az autó elhagyja a jobb oldalt, visszaindul a balról
      }
      // Kérjük a böngészőt, hogy a következő frame-ben rajzoljon újra
      requestAnimationFrame(drawCar);
    }
  
    drawCar(); // Indítjuk az animációt
  });
  