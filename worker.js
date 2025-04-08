// worker.js
let counter = 0;

function compute() {
  counter++;
  // Minden 1e6 lépésnél küldjünk egy üzenetet
  if (counter % 1000000 === 0) {
    postMessage("Feldolgozott lépések: " + counter);
  }
  // Folyamatosan folytatjuk a számolást
  setTimeout(compute, 0);
}

compute();
