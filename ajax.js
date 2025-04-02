document.addEventListener("DOMContentLoaded", function() {
    // API URL és egyedi kód (a formátum: BBBBBBefg456, itt add meg a sajátodat)
    const apiUrl = "http://gamf.nhely.hu/ajax2/";
    const code = "ABCDEFxyz123";  // Cseréld ki a saját kódodra!

    const dataListDiv = document.getElementById("dataList");
    const statsDiv = document.getElementById("stats");
    
    const nameInput = document.getElementById("name");
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const updateIdInput = document.getElementById("updateId");
    
    // AJAX kérés segédfüggvénye (fetch API használatával)
    async function ajaxRequest(params) {
        const formData = new URLSearchParams(params);
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: formData.toString()
            });
            return await response.json();
        } catch (error) {
            console.error("AJAX request error:", error);
            return null;
        }
    }
    
    // Adatok lekérése (Read művelet)
    async function loadData() {
        const result = await ajaxRequest({ op: "read", code: code });
        if (result) {
            displayData(result);
            computeStats(result);
        }
    }
    
    // Adatok megjelenítése a dataListDiv-ben
    function displayData(data) {
        let html = "";
        if (data.list && data.list.length > 0) {
            data.list.forEach(item => {
                html += `<p>ID: ${item.id} - Termék: ${item.name}, Eladott mennyiség: ${item.height}, Ár: ${item.weight}</p>`;
            });
        } else {
            html = "<p>Nincs megjeleníthető adat.</p>";
        }
        dataListDiv.innerHTML = html;
    }
    
    // Statisztikák számítása a "height" (eladott mennyiség) értékekből
    function computeStats(data) {
        if (!data.list || data.list.length === 0) {
            statsDiv.innerHTML = "";
            return;
        }
        const values = data.list.map(item => Number(item.height));
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const max = Math.max(...values);
        statsDiv.innerHTML = `<p>Összeg: ${sum}, Átlag: ${avg.toFixed(2)}, Legnagyobb: ${max}</p>`;
    }
    
    // Create művelet: új rekord létrehozása
    document.getElementById("createBtn").addEventListener("click", async function() {
        const name = nameInput.value.trim();
        const height = heightInput.value.trim();
        const weight = weightInput.value.trim();
        if (!name || !height || !weight) {
            alert("Minden mezőt ki kell tölteni, maximum 30 karakter!");
            return;
        }
        if (name.length > 30 || height.length > 30 || weight.length > 30) {
            alert("Maximum 30 karakter hosszú lehet!");
            return;
        }
        const result = await ajaxRequest({ op: "create", name: name, height: height, weight: weight, code: code });
        alert("Létrehozás eredménye: " + result);
        loadData();
    });
    
    // Update művelet: meglévő rekord módosítása
    document.getElementById("updateBtn").addEventListener("click", async function() {
        const id = updateIdInput.value.trim();
        const name = nameInput.value.trim();
        const height = heightInput.value.trim();
        const weight = weightInput.value.trim();
        if (!id || !name || !height || !weight) {
            alert("Minden mezőt ki kell tölteni a módosításhoz!");
            return;
        }
        if (name.length > 30 || height.length > 30 || weight.length > 30) {
            alert("Maximum 30 karakter hosszú lehet!");
            return;
        }
        const result = await ajaxRequest({ op: "update", id: id, name: name, height: height, weight: weight, code: code });
        alert("Módosítás eredménye: " + result);
        loadData();
    });
    
    // Delete művelet: rekord törlése
    document.getElementById("deleteBtn").addEventListener("click", async function() {
        const id = updateIdInput.value.trim();
        if (!id) {
            alert("Adja meg a törlendő rekord ID-ját!");
            return;
        }
        const result = await ajaxRequest({ op: "delete", id: id, code: code });
        alert("Törlés eredménye: " + result);
        loadData();
    });
    
    // Adatok betöltése ID alapján (az Update művelet előkészítésére)
    document.getElementById("getDataForIdBtn").addEventListener("click", async function() {
        const id = updateIdInput.value.trim();
        if (!id) {
            alert("Adja meg az ID-t!");
            return;
        }
        const result = await ajaxRequest({ op: "read", code: code });
        if (result && result.list) {
            const item = result.list.find(item => item.id == id);
            if (item) {
                nameInput.value = item.name;
                heightInput.value = item.height;
                weightInput.value = item.weight;
            } else {
                alert("Nincs ilyen ID-jű rekord.");
            }
        }
    });
    
    // Kezdeti adatok betöltése
    loadData();
});
