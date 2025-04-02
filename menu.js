document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("menuTable").querySelector("tbody");
    const addItemBtn = document.getElementById("addItem");
    const searchInput = document.getElementById("searchInput");

    // Segédfüggvény a mezők validációjához
    function validateField(value, fieldName) {
        if (!value) {
            alert(fieldName + " kötelező mező!");
            return false;
        }
        if (value.length > 30) {
            alert(fieldName + " maximum 30 karakter lehet!");
            return false;
        }
        return true;
    }
    // Inline szerkesztés a kategória cellához: lenyíló lista
    function enableInlineCategoryEdit(cell) {
        if (cell.querySelector("select")) return;
        
        const select = document.createElement("select");
        const options = ["leves", "foetel", "koret", "desszert", "egyéb"];
        options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            if (cell.textContent.trim().toLowerCase() === opt.toLowerCase()) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        cell.textContent = "";
        cell.appendChild(select);
        select.focus();
        select.addEventListener("change", function () {
            cell.textContent = select.value;
        });
        select.addEventListener("blur", function () {
            cell.textContent = select.value;
        });
    }

    // Inline szerkesztés az elérhetőség cellához: lenyíló lista
    function enableInlineAvailabilityEdit(cell) {
        if (cell.querySelector("select")) return;
        
        const select = document.createElement("select");
        const options = ["elérhető", "nem elérhető"];
        options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            if (cell.textContent.trim().toLowerCase() === opt.toLowerCase()) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        cell.textContent = "";
        cell.appendChild(select);
        select.focus();
        select.addEventListener("change", function () {
            cell.textContent = select.value;
        });
        select.addEventListener("blur", function () {
            cell.textContent = select.value;
        });
    }

    // Új sor hozzáadása a táblázathoz
    function addRow(name, price, category, availability) {
        const row = document.createElement("tr");
        row.innerHTML = 
            <><td>${name}</td><td>${price}</td><td class="category">${category}</td><td class="availability">${availability}</td><td class="actions">
                <button class="editBtn">Szerkesztés</button>
                <button class="deleteBtn">Törlés</button>
            </td></>
        ;
        tableBody.appendChild(row);
        addEventListenersToRow(row);
    }

    // Eseménykezelők hozzáadása egy táblázatsorhoz
    function addEventListenersToRow(row) {
        // Megkeressük az edit és delete gombokat (mindkét osztálylehetőséggel)
        let editButton = row.querySelector(".editBtn") || row.querySelector(".edit");
        let deleteButton = row.querySelector(".deleteBtn") || row.querySelector(".delete");

        if (editButton) {
            editButton.addEventListener("click", function () {
                let name = row.children[0].textContent;
                let price = row.children[1].textContent;
                // Kategória és elérhetőség inline módosítható dupla kattintással, ezért itt csak a név és ár kerül promptba
                let newName = prompt("Új étel neve:", name);
                let newPrice = prompt("Új ár:", price);

                if (!validateField(newName, "Étel neve") ||
                    !validateField(newPrice, "Ár")) {
                    return;
                }
                if (isNaN(newPrice)) {
                    alert("Ár értéke szám kell legyen!");
                    return;
                }
                row.children[0].textContent = newName;
                row.children[1].textContent = newPrice;
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener("click", function () {
                if (confirm("Biztosan törölni szeretnéd ezt az ételt?")) {
                    row.remove();
                }
            });
        }

        // A kategória cella dupla kattintással inline szerkeszthetővé válik
        let categoryCell = row.querySelector(".category") || row.children[2];
        categoryCell.addEventListener("dblclick", function () {
            enableInlineCategoryEdit(categoryCell);
        });

        // Az elérhetőség cella dupla kattintással inline szerkeszthetővé válik
        let availabilityCell = row.querySelector(".availability") || row.children[3];
        availabilityCell.addEventListener("dblclick", function () {
            enableInlineAvailabilityEdit(availabilityCell);
        });
    }

    // Új étel hozzáadása gomb eseménykezelője
    addItemBtn.addEventListener("click", function () {
        let name = prompt("Étel neve:");
        let price = prompt("Ár:");
        // Új sor esetén alapértelmezett kategória legyen "leves" és elérhetőség "elérhető"
        let category = "leves"; 
        let availability = "elérhető";

        // Validálás
        if (!validateField(name, "Étel neve") ||
            !validateField(price, "Ár")) {
            return;
        }
        if (isNaN(price)) {
            alert("Ár értéke szám kell legyen!");
            return;
        }
        addRow(name, price, category, availability);
    });

    // Keresési funkció
    searchInput.addEventListener("keyup", function () {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });
    });

    // Meglévő sorok eseménykezelőinek hozzárendelése
    const existingRows = tableBody.querySelectorAll("tr");
    existingRows.forEach(row => {
        addEventListenersToRow(row);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // A már létező kódod után, vagy külön kódrészletként:
    
    // Kiválasztjuk a táblázatot és a fejléc celláit
    const table = document.getElementById("menuTable");
    const headers = table.querySelectorAll("th");
    
    // Minden fejléc cellához hozzáadunk egy kattintási eseményt
    headers.forEach((header, columnIndex) => {
      header.addEventListener("click", function () {
        const tbody = table.querySelector("tbody");
        // A sorokat átalakítjuk tömbbé, hogy rendezni tudjuk
        const rowsArray = Array.from(tbody.querySelectorAll("tr"));
        
        // Rendezés: próbáljuk meg számként értelmezni, ha nem, akkor szövegként.
        rowsArray.sort((rowA, rowB) => {
          const cellA = rowA.querySelectorAll("td")[columnIndex].textContent.trim();
          const cellB = rowB.querySelectorAll("td")[columnIndex].textContent.trim();
          
          const numA = parseFloat(cellA);
          const numB = parseFloat(cellB);
          
          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB; // Növekvő sorrend
          }
          // Szöveges rendezés:
          return cellA.localeCompare(cellB);
        });
        
        // Töröljük a táblázat törzsét és újra hozzáadjuk a rendezett sorokat
        tbody.innerHTML = "";
        rowsArray.forEach(row => tbody.appendChild(row));
      });
    });
  });