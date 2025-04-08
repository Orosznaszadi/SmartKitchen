document.getElementById('saveStorageBtn').addEventListener('click', function() {
    const data = document.getElementById('storageInput').value;
    localStorage.setItem('myData', data);
    document.getElementById('storageOutput').textContent = 'Mentett adat: ' + data;
  });
  
  document.getElementById('clearStorageBtn').addEventListener('click', function() {
    localStorage.removeItem('myData');
    document.getElementById('storageOutput').textContent = 'Az adat törlődött.';
  });
  