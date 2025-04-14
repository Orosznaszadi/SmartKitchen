// 1. Aktív menüpont beállítása
document.addEventListener("DOMContentLoaded", function() {
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

// 2. Táblázat rendezés, kategória illetve elérhetőség duplakattintásos módosítása
document.addEventListener("DOMContentLoaded", function () {
    const menuTable = document.getElementById("menuTable");
    if (!menuTable) return; // Ha nincs táblázat, kilépünk

    // 2.1 Táblázat rendezése fejlécre kattintva
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

    // 2.2 Kategória cella dupla kattintás – lenyíló a kategóriák választásához
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

    // 2.3 Elérhetőség cella dupla kattintás – lenyíló az elérhetőség módosításához
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

// 3. Új étel hozzáadása és kereső funkció
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
                  <button class="edit"><i class="fa fa-edit"></i></button>
                  <button class="delete"><i class="fa fa-trash"></i></button>
                </td>
                <td>
                  <button class="addToCartBtn"><i class="fa fa-shopping-cart"></i></button>
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

// 4. Edit, Delete és Kosárba gombok működésének megvalósítása
document.addEventListener("DOMContentLoaded", function () {
    const menuTableBody = document.querySelector("#menuTable tbody");
    menuTableBody.addEventListener("click", function(event) {
        const target = event.target;
        const row = target.closest("tr");
        if (!row) return;

        // Szerkesztés
        if (target.classList.contains("edit")) {
            // Az első négy cella (Étel, Ár, Kategória, Elérhetőség) prompt segítségével módosítható
            const foodCell = row.cells[0];
            const priceCell = row.cells[1];
            const categoryCell = row.cells[2];
            const availabilityCell = row.cells[3];

            // Étel név validáció
            let newFood = prompt("Új étel neve:", foodCell.textContent.trim());
            if (newFood === null || newFood.trim() === "") {
                alert("Az étel neve nem lehet üres!");
            } else {
                foodCell.textContent = newFood.trim();
            }

            // Ár validáció
            let newPrice = prompt("Új ár (Ft):", priceCell.textContent.trim());
            if (newPrice === null || newPrice.trim() === "") {
                alert("Az ár nem lehet üres!");
            } else {
                let parsedPrice = parseFloat(newPrice);
                if (isNaN(parsedPrice)) {
                    alert("Érvénytelen ár! Kérlek számot adj meg.");
                } else {
                    priceCell.textContent = parsedPrice;
                }
            }

            // Kategória validáció
            let newCategory = prompt("Új kategória:", categoryCell.textContent.trim());
            if (newCategory === null || newCategory.trim() === "") {
                alert("A kategória nem lehet üres!");
            } else {
                categoryCell.textContent = newCategory.trim();
            }

            // Elérhetőség validáció
            let newAvailability = prompt("Új elérhetőség (Elérhető/Nem elérhető):", availabilityCell.textContent.trim());
            if (newAvailability === null || newAvailability.trim() === "") {
                alert("Az elérhetőség megadása kötelező!");
            } else {
                newAvailability = newAvailability.trim();
                if(newAvailability !== "Elérhető" && newAvailability !== "Nem elérhető") {
                    alert("Érvénytelen elérhetőség! Csak 'Elérhető' vagy 'Nem elérhető' érték adható meg.");
                } else {
                    availabilityCell.textContent = newAvailability;
                }
            }
        }
        // Törlés
        else if (target.classList.contains("delete")) {
            if (confirm("Biztosan törlöd ezt a sort?")) {
                row.remove();
            }
        }
        // Kosárba gomb kezelése
        else if (target.classList.contains("addToCartBtn")) {
            const id = row.getAttribute("data-id") || Date.now();
            const name = row.cells[0].textContent.trim();
            const priceText = row.cells[1].textContent.trim();
            const price = parseFloat(priceText);
            const category = row.cells[2].textContent.trim();
            const availability = row.cells[3].textContent.trim();
            let qtyStr = prompt("Hány adagot szeretnél rendelni?", "1");
            if (qtyStr === null || qtyStr.trim() === "") {
                alert("A mennyiség megadása kötelező!");
                return;
            }
            let quantity = parseInt(qtyStr, 10);
            if (isNaN(quantity) || quantity < 1) {
                alert("Érvénytelen mennyiség! Kérlek pozitív számot adj meg.");
                return;
            }
            const product = { id, name, price, category, availability, quantity };

            // Kosárba helyezés (localStorage)
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
});
