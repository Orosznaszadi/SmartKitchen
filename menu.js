document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("orderForm");
    const foodSelect = document.getElementById("food");
    const quantityInput = document.getElementById("quantity");
    const cartTableBody = document.querySelector("#cart tbody");
    const totalPriceElement = document.getElementById("totalPrice");

    let cart = []; // Kosár tartalma, ami objektumokat fog tartalmazni

    // Ételek és áraik
    const foodPrices = {
        leves: 1500,
        foetel: 2500,
        desszert: 1000,
        vegetáriánus: 2000
    };

    function updateCart() {
        cartTableBody.innerHTML = "";
        let totalPrice = 0;

        cart.forEach(item => {
            const row = document.createElement("tr");

            const foodCell = document.createElement("td");
            foodCell.textContent = item.food;
            row.appendChild(foodCell);

            const priceCell = document.createElement("td");
            priceCell.textContent = item.price + " Ft";
            row.appendChild(priceCell);

            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const sumCell = document.createElement("td");
            sumCell.textContent = (item.price * item.quantity) + " Ft";
            row.appendChild(sumCell);

            const actionCell = document.createElement("td");
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Törlés";
            removeBtn.addEventListener("click", function () {
                cart = cart.filter(cartItem => cartItem !== item);
                updateCart();
            });
            actionCell.appendChild(removeBtn);
            row.appendChild(actionCell);

            cartTableBody.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice;
    }

    if(orderForm) {
      orderForm.addEventListener("submit", function (event) {
          event.preventDefault();
          const selectedFood = foodSelect.value;
          const quantity = parseInt(quantityInput.value);
          const price = foodPrices[selectedFood];
          const existingItem = cart.find(item => item.food === selectedFood);
          if (existingItem) {
              existingItem.quantity += quantity;
          } else {
              cart.push({ food: selectedFood, price: price, quantity: quantity });
          }
          updateCart();
      });
    }

    const currentUrl = window.location.href;
    const homeLink = document.getElementById("homeLink");
    const menuLink = document.getElementById("menuLink");
    const contactLink = document.getElementById("contactLink");
    const orderLink = document.getElementById("orderLink");

    if (currentUrl.includes("index.html")) {
        homeLink.classList.add("active");
    } else if (currentUrl.includes("menu.html")) {
        menuLink.classList.add("active");
    } else if (currentUrl.includes("contact.html")) {
        contactLink.classList.add("active");
    } else if (currentUrl.includes("order.html")) {
        orderLink.classList.add("active");
    }
});

// Már meglévő táblázat funkciók (rendezés, kategória és elérhetőség duplakattintással történő módosítása)
document.addEventListener("DOMContentLoaded", function () {
    const menuTable = document.getElementById("menuTable");
    if (!menuTable) return; // Ha nincs táblázat, kilépünk

    // 1. Táblázat rendezése fejlécre kattintva
    const headers = menuTable.querySelectorAll("thead th");
    headers.forEach((header, index) => {
        // Csak az első négy oszlop esetén (Étel, Ár, Kategória, Elérhetőség)
        if (index < 4) {
            header.style.cursor = "pointer";
            header.addEventListener("click", function () {
                sortTableByColumn(menuTable, index);
            });
        }
    });

    function sortTableByColumn(table, columnIndex) {
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));
        // Az aktuális oszlop fejlécének irányának váltogatása
        const header = table.querySelectorAll("thead th")[columnIndex];
        let direction = header.getAttribute("data-sort-direction") || "asc";
        direction = direction === "asc" ? "desc" : "asc";
        header.setAttribute("data-sort-direction", direction);

        rows.sort((a, b) => {
            const aText = a.cells[columnIndex].textContent.trim();
            const bText = b.cells[columnIndex].textContent.trim();
            // Az Ár oszlop esetén numerikus rendezés
            if (columnIndex === 1) {
                return direction === "asc" ? parseFloat(aText) - parseFloat(bText) : parseFloat(bText) - parseFloat(aText);
            } else {
                return direction === "asc" ? aText.localeCompare(bText) : bText.localeCompare(aText);
            }
        });

        // A rendezett sorok visszahelyezése a tbody-be
        rows.forEach(row => tbody.appendChild(row));
    }

    // 2. Kategória cella dupla kattintás – lenyíló a kategóriák választásához
    const availableCategories = ["Főétel", "Vegetáriánus", "Leves", "Desszert"];
    const rows = menuTable.querySelectorAll("tbody tr");
    rows.forEach(row => {
        const categoryCell = row.cells[2]; // 3. oszlop: Kategória
        categoryCell.addEventListener("dblclick", function () {
            // Ha már létezik egy select, ne csináljunk újat
            if (categoryCell.querySelector("select")) return;
            const currentCategory = categoryCell.textContent.trim();
            const select = document.createElement("select");
            availableCategories.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat;
                option.textContent = cat;
                if (cat === currentCategory) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            categoryCell.textContent = "";
            categoryCell.appendChild(select);
            // Változás vagy fókusz elvesztésekor a cella frissítése
            select.addEventListener("change", function () {
                categoryCell.textContent = this.value;
            });
            select.addEventListener("blur", function () {
                categoryCell.textContent = this.value;
            });
            select.focus();
        });
    });

    // 3. Elérhetőség cella dupla kattintás – lenyíló az elérhetőség módosításához
    rows.forEach(row => {
        const availabilityCell = row.cells[3]; // 4. oszlop: Elérhetőség
        availabilityCell.addEventListener("dblclick", function () {
            if (availabilityCell.querySelector("select")) return;
            const currentValue = availabilityCell.textContent.trim();
            const select = document.createElement("select");
            const options = ["Elérhető", "Nem elérhető"];
            options.forEach(optionText => {
                const option = document.createElement("option");
                option.value = optionText;
                option.textContent = optionText;
                if (optionText === currentValue) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            availabilityCell.textContent = "";
            availabilityCell.appendChild(select);
            select.addEventListener("change", function () {
                availabilityCell.textContent = this.value;
            });
            select.addEventListener("blur", function () {
                availabilityCell.textContent = this.value;
            });
            select.focus();
        });
    });
});

// Új funkciók: "Új étel hozzáadása" gomb és kereső funkció
document.addEventListener("DOMContentLoaded", function () {
    // Új étel hozzáadása gomb funkció
    const addItemBtn = document.getElementById("addItem");
    const menuTableBody = document.querySelector("#menuTable tbody");

    if(addItemBtn && menuTableBody) {
        addItemBtn.addEventListener("click", function(){
            const food = prompt("Add meg az étel nevét:");
            if(!food) return;
            const priceInput = prompt("Add meg az árát (Ft):");
            if(!priceInput || isNaN(priceInput)) {
                alert("Érvénytelen ár!");
                return;
            }
            const price = parseFloat(priceInput);
            const category = prompt("Add meg a kategóriát (pl.: Főétel, Vegetáriánus, Leves, Desszert):", "Főétel") || "Főétel";
            const availability = "Elérhető"; // Alapértelmezett érték
            const newRow = document.createElement("tr");
            newRow.setAttribute("data-id", Date.now());
            newRow.innerHTML = `
                <td>${food}</td>
                <td>${price}</td>
                <td>${category}</td>
                <td class="availability">${availability}</td>
                <td class="actions">
                  <button class="edit">Szerkesztés</button>
                  <button class="delete">Törlés</button>
                </td>
                <td>
                  <button class="addToCartBtn">Kosárba</button>
                </td>
            `;
            menuTableBody.appendChild(newRow);
        });
    }

    // Kereső funkció
    const searchInput = document.getElementById("searchInput");
    if(searchInput) {
        searchInput.addEventListener("input", function(){
            const term = this.value.toLowerCase();
            const rows = document.querySelectorAll("#menuTable tbody tr");
            rows.forEach(row => {
                const cellsText = Array.from(row.cells).map(cell => cell.textContent.toLowerCase());
                if(cellsText.some(text => text.includes(term))){
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }
});
