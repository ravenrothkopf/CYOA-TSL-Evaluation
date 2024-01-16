document.getElementById('generateCSV').addEventListener("click", generateCSV);

let csvData = "";

function createCSVFile() {
  // Initialize the CSV data with a header row
  csvData = "Run,Step,InCave,InTown,Update,CurrentState,SafeChoice,SafeCount\n";
  // Reset the run count
  runs = 1;
}

function appendToCSVFile(arr) {
  if (firstRound(currentText)){
    csvData += arr.join(",") + "\n";
  }
  else {
    csvData += arr.join(",") + ",";
  }
}

function updateCSVFile(arr) {
  csvData += arr.join(",") + "\n";
}

function generateCSV() {
    const csvDataBlob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(csvDataBlob);
  
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = "game_results.csv";
  
    document.body.appendChild(a);
    a.click();
  
    URL.revokeObjectURL(url);
}
  
