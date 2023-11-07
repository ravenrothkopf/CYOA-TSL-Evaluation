document.getElementById('generateCSV').addEventListener("click", generateCSV);

let csvData = "";

function createCSVFile() {
  // Initialize the CSV data with a header row
  csvData = "Run,Step,InCave,InMarket,InTown\n";
  
  // Reset the run count
  runs = 1;
}


function appendToCSVFile(run, step, inCave, inMarket, inTown) {
    csvData += `${run},${step},${inCave},${inMarket},${inTown}\n`;
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
  

