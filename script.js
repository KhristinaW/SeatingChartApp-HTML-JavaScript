let names = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
];
// Global variables
let currentMode = "assign";
let selectedRow = -1;
let selectedCol = -1;
let totalSeats = 16;
let filledSeats = 0;

function drawChart() {
  let html = "<table border=1>";

  // if(names === ''){
  for (i = 0; i < names.length; i++) {
    html += "<tr>";
    for (j = 0; j < names.length; j++) {
        let selected = "";
        if(i === selectedRow && j == selectedCol){
            selected = "selected"
        }
      if (names[i][j] == "") {
        html += `<td class="empty ${selected}" onclick="cellClicked(this,${i},${j})">Empty</td>`;
      } else {
        html += `<td class="filled ${selected}" onclick="cellClicked(this,${i},${j})">${names[i][j]}</td>`;
      }
    }
    html += "</tr>";
  }

  html += "</table>";

  document.getElementById("grid").innerHTML = html;
  updateStats();
}
drawChart();

function cellClicked(cell, row, col) {
    selectedRow = row;
    selectedCol = col;
    cell.innerHTML = names[row][col];
    console.log(currentMode)
    let sname = document.getElementById('studentName');
    drawChart();

    if(currentMode === 'assign'){
        let input = sname.value.split(" ").filter(w => w!== "").join(" ");
        if(input === ''){

           document.getElementById("message").innerHTML = "⚠️ Type a name first";
           drawChart();
        }else
        if(cell.innerHTML !== ''){
            document.getElementById("message").innerHTML = "⚠️ Seat already taken";
        }else{
            cell.innerHTML = input;
            names[row][col] = input
            input = ' ';
            document.getElementById("message").innerHTML = `✅ Assigned ${cell.innerHTML} to row ${row}, seat ${col}.`;
            filledSeats++;
        } 
    }

    if(currentMode === 'remove'){
        let input = sname.value.split(" ").filter(w => w!== "").join(" ");
        if(cell.innerHTML == ''){
            document.getElementById("message").innerHTML = "⚠️ That Seat is Already Empty";

        }else{
            document.getElementById("message").innerHTML = `Removed ${input} from row ${row}, seat ${col}`;
            cell.innerHTML = ''
             names[row][col] = ""
            filledSeats--;
        }
    }
    drawChart();
};

function assignMode(){
    currentMode = 'assign'
    document.getElementById("modeText").innerHTML = "Mode: Assign (click an empty seat)";
};

function removeMode(){
    currentMode = 'remove'
    document.getElementById("modeText").innerHTML = "Mode: Remove (click filled seat)";
};

function resetChart(){
    for (i = 0; i < names.length; i++) {
        for (j = 0; j < names.length; j++) {
        names[i][j] = ""
        }
   
  }
 
  selectedRow = -1
  selectedCol = -1
  filledSeats = 0;
  document.getElementById("message").innerHTML = "(Seating Chart Reset...)";
  assignMode();
  drawChart();
};

function updateStats(){
    document.getElementById("stats").innerHTML = `Assigned Seats:  ${filledSeats} /  ${totalSeats})`; 

    // currentMode = 'assign'
    // drawChart();
}