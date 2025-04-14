document.addEventListener("DOMContentLoaded", function() {
    
    const tableRows = document.querySelectorAll("#menuTable tbody tr");
    tableRows.forEach(function(row) {
      
      row.setAttribute("draggable", "true");
  
      
      row.addEventListener("dragstart", function(e) {
        const product = {
          id: row.getAttribute("data-id"),
          name: row.cells[0].textContent.trim(),
          price: parseFloat(row.cells[1].textContent.trim()),
          category: row.cells[2].textContent.trim(),
          availability: row.cells[3].textContent.trim(),
          quantity: 1  // Alapértelmezett mennyiség
        };
        e.dataTransfer.setData("text/plain", JSON.stringify(product));
      });
    });
  
    // Drop zone események
    const dropZone = document.getElementById("dropZone");
    if (dropZone) {
      
      dropZone.addEventListener("dragover", function(e) {
        e.preventDefault();
      });
  
      // Drop esemény: amikor az elem a drop zone-ba kerül
      dropZone.addEventListener("drop", function(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (data) {
          const product = JSON.parse(data);
          // Kérjük a felhasználótól, hogy adja meg a kívánt mennyiséget
          let qtyStr = prompt("Hány adagot szeretnél hozzáadni?", "1");
          if (qtyStr !== null && qtyStr.trim() !== "") {
            let quantity = parseInt(qtyStr, 10);
            if (isNaN(quantity) || quantity < 1) {
              alert("Érvénytelen mennyiség!");
              return;
            }
            product.quantity = quantity;
          }
          // Hívjuk meg azt a függvényt, ami a kosárba helyezést végzi
          addToCart(product);
        }
      });
    }
  
    
    function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id == product.id);
      if (existing) {
        existing.quantity += product.quantity;
      } else {
        cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(product.name + " " + product.quantity + " adag kosárba került!");
    }
  });
  