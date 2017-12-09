console.log('app.js is connected')

document.addEventListener('DOMContentLoaded', function() {
  // gen 5 x 5 board
  const board = [], solution = [];
  let tries = 5, correctMoves = 0, playerMoves = 0;
  
  for(let i = 0; i < 5; i++) {
    const arr = [], sol = [];
    for(let x = 0; x < 5; x ++) {
      let rand = ( Math.floor(Math.random() * 5)) // random number from 0 to 4
      console.log(`random number for row: ${x + 1}`, rand)
      // arr.push((`${i},${x}`))
      arr.push({row: i + 1, col: x + 1})

      // create mine if col equal to random number
      if(!(x % rand)) {
        sol[x] = 'X' // mine
      } else {
        sol[x] = null
        correctMoves += 1
      }
    }
    board.push(arr)
    solution.push(sol)
  }
  
  console.log('solutions', solution, '\n', 'board', board)


  const container = document.getElementById('container');
  const flash = document.getElementById('flash');
  const lives = document.getElementById('lives');
  lives.innerText = tries;

  board.forEach(el => {
    const row = document.createElement('section');
    row.classList.add('row')
    el.forEach(cell => {
      const span = document.createElement('span');
      span.dataset.location = JSON.stringify(cell)
      span.classList.add('cell'); // css

      span.addEventListener('click', function checkForMine() {
        const { row, col } = cell; // extracting row + column from cell object

        // game over, prevent squares from being clicked on
        if(!tries) return;

        // hit a mine
        if(solution[row - 1][col - 1]) {
          
          this.innerText = 'X'
          tries -= 1;
          lives.innerText = tries;

          if(!tries) {
            flash.innerText = 'You lost'
            displayMines();
          };

        } else { // did not hit a mine

          this.style.background = 'red'; 
          playerMoves +=1 

          if(checkWin(playerMoves, correctMoves)) {
            flash.innerText = `You won with ${tries} lives remaining!`;
            displayMines();

            // prevent extra moves
            tries = 0;
          }
        }

        this.removeEventListener('click', checkForMine)
      })

      row.appendChild(span);
    })

    container.appendChild(row);
  })

  // match player moves with num of correct moves, playermoves incremented when they don't hit a mine
  function checkWin(playerMoves, correctMoves) {
    return playerMoves === correctMoves ? true : false
  }

  // display all mines (occurs for a win or loss)
  function displayMines() {
    document.querySelectorAll('.cell').forEach(el => {
      const { row, col } = JSON.parse(el.dataset.location)
      
      el.innerText = solution[row - 1][col -1];

    })
  }
})
