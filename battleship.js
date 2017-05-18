// Create board
console.log("Creating array board");
var board = [[],[],[],[],[],[],[],[],[],[]];

// Track ships with global var that is constant
const SHIP = 1;
const leaveEmpty = -1;

// GAME SET UP
$(document).ready(function() {
  // Make game board
  make_board();
  // Place 5 ships randomly on board
  randomShipPlacement();
  // Track shots fired
  var shotsFired = 25;
  // Track shots that hit ships
  var shipsHit = 0;

  // Create a 10 x 10 board using for loops
  function make_board() {
    console.log("Creating html board ");
    // Update h2
    $("h2").text("Remaining torpedoes: 25");
    // Loop creates the 10 table rows
    var html_board = "";
    for(tableRow = 0; tableRow < 10; tableRow++) {
      html_board = html_board + "<tr>";
      // Loop creates the 10 table data inside the table rows (tr)
      for(tableData = 0; tableData < 10; tableData++) {
        html_board = html_board + "<td id=" + tableRow + tableData + "></td>";
      }
     // Var 'html_board', combines the 10 TRs and the 100 TDs created by the loops above and closes the tr
      html_board = html_board + "</tr>";
    }
    // Append everything the lopps did and adds it the the <table>
    $("table").html(html_board);
  }

  // Place 5 random ships on board withouth touching each other.
  function randomShipPlacement() {
    var randomRow;
    var randomColumn;
    var shipsOnBoard = 0;

  // Create 5 random rows and 5 random columns.
    while (shipsOnBoard < 5) {
      randomRow = Math.floor((Math.random() * 10));
      randomColumn = Math.floor((Math.random() * 10));
      //Place SHIP if slot doesn't have SHIP and leaveEmpty.
      if (board[randomRow][randomColumn] != SHIP && board[randomRow][randomColumn] != leaveEmpty) {
        board[randomRow][randomColumn] = SHIP;
        //Don't place anything if randomRow is -1 or 10.
        if (randomRow - 1 != -1 && randomRow + 1 != 10) {
          // Top of ship
          board[randomRow - 1][randomColumn] = leaveEmpty;
          // Bottom of ship
          board[randomRow + 1][randomColumn] = leaveEmpty;
        //Don't place anything if randomColumn is -1 or 10
          if (randomColumn - 1 != -1 && randomColumn + 1 != 10) {
            // Left of ship
            board[randomRow][randomColumn - 1] = leaveEmpty;
            // Right of ship
            board[randomRow][randomColumn +   1] = leaveEmpty;
          }
          // Corners.
          // Don't plance anything randomRow is -1 or 10 & randomColumn is -1 or 10.
          if (randomRow - 1 != -1 && randomRow + 1 != 10 && randomColumn - 1 != -1 && randomColumn + 1 != 10) {
          // TOP RIGHT CORNER
            board[randomRow - 1][randomColumn + 1] = leaveEmpty;
            // BOTTOM RIGHT CORNER
            board[randomRow + 1][randomColumn + 1] = leaveEmpty;
            // TOP LEFT CORNER
            board[randomRow - 1][randomColumn - 1] = leaveEmpty;
            // BOTTOM LEFT CORNER
            board[randomRow +1 ][randomColumn - 1] = leaveEmpty;
          }
        // console.log("The ship is at: " + randomRow + randomColumn);
        console.log("Row " + randomRow);
        console.log("column " + randomColumn);
        // Limit the while loop to 5 iterations
        shipsOnBoard++;
        }
      }
    }
  };

  // PLAY GAME
  // Shots Taken
  $("td").on("click", function () {
    // Pull the ID from the clicked TD
    var x = $(this).attr("id");
    // Get the value of first index of the string
    var row = x.charAt(0);
    // Get the value of second index of the string
    var col = x.charAt(1);
    // Shots fired counter
    shotsFired--;

    console.log("\n");

    console.log("Shot at: " + row + col);

    // Update h2 with shots fired
    $("h2").text("Remaining torpedoes: " + shotsFired);
    console.log("Torpedoes shot by user: " + shotsFired);
    // Check if clicked TD has the SHIP, update h3, update p add class "hit", and turn td off
    if (board[row][col] === SHIP) {
      shipsHit++;
      $("h3").text("Ships hit by user: " + shipsHit);
      $("p").text("you hit a ship");
      $(this).addClass("hit");
      $(this).off();
      console.log("Ships hit: " + shipsHit);
      // If clicked TD does not have a SHIP, update p, add class "missed", and and turn td off
    } else {
    $("p").text("you missed!");
    $(this).addClass("missed");
    $(this).off();
    }
    // Let user know they have won once all 5 ships have been hit, update p, and turn off ALL td's
    if(shipsHit === 5) {
      $("p").text("You have won!");
      $("td").off();
    }
    // Let user know the game is over at 25 shots, updates p, turn off all td's and display all ships (see 'gameOver' function)
    if (shotsFired === 0 && shipsHit != 5) {
      $("p").text("You have lost!");
      $("td").off();
      gameOver();
    }
  });
});

// Check every TD for a SHIP and displays all SHIPs when "shotsFired" equals 25
function gameOver() {
  for (row = 0; row < 10; row++) {
    for (col = 0; col < 10; col++) {
      // Checks if there is a ship in the indexes ([row] & [col]) are in the array
      if(board[row][col] == SHIP ) {
        // Add class "hit" to indexes with a SHIP.
        $("#"+row+col).addClass("hit")
      }
    }
  }
};
