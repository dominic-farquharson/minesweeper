console.log('app.js is connected')

document.addEventListener('DOMContentLoaded', function() {
  // gen 5 x 5
  const board = [], solution = [];
  let tries = 5, correctMoves = 0, playerMoves = 0;
  
  for(let i = 0; i < 5; i++) {
    const arr = [], sol = [];
    for(let x = 0; x < 5; x ++) {
      // arr.push((`${i},${x}`))
      arr.push({row: i + 1, col: x + 1})
      if(x % 3) {
        sol[x] = 'X'
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
      span.classList.add('cell'); // css

      span.addEventListener('click', function checkForMine() {
        const { row, col } = cell;

        if(!tries || checkWin(playerMoves, correctMoves)) {
         alert('you won!')
         return;
        }

        // hit a mine
        if(solution[row - 1][col - 1]) {
          this.innerText = 'X'
          tries -= 1;
          lives.innerText = tries;
        } else { // did not hit a mine
          this.style.background = 'red'; 
          playerMoves +=1 
          if(checkWin(playerMoves, correctMoves)) {
            flash.innerText = `You won with ${tries} lives remaining!`;
          }
        }

        this.removeEventListener('click', checkForMine)
      })

      row.appendChild(span);
    })

    container.appendChild(row);
  })
})

function checkWin(playerMoves, correctMoves) {
  return playerMoves === correctMoves ? true : false
}