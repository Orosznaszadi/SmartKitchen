// workerDemo.js
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startWorkerBtn");
    let myWorker = null;
    
    startButton.addEventListener("click", function() {
      if (typeof(Worker) !== "undefined") {
        if (!myWorker) {
          myWorker = new Worker("worker.js");
          myWorker.onmessage = function(e) {
            document.getElementById("workerOutput").innerHTML += e.data + "<br>";
          };
        } else {
          alert("A worker már fut!");
        }
      } else {
        document.getElementById("workerOutput").textContent = "A böngésződ nem támogatja a Web Worker-eket.";
      }
    });
  });
  