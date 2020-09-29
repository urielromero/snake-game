document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width =10;

    let currentIndex = 0; // 1st divon grid
    let appleIndex = 0; // 1st div on grid for now
    let currentSnake = [2,1,0]  //  2 is the HEAD,  0s TAIL and 1s the BODY.

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;


    //start and reset game function

    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score =0;
        //random apple
        direction =1;
        scoreDisplay.innerHTML = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach (index => squares[index].classList.add('snake'));
        interval =setInterval(moveOutcomes, intervalTime);

    }

    //check all move outcomes
    function moveOutcomes(){

        //check snake hitting border or itself
        if(
            (currentSnake[0] + width >= (width * width) && direction === width)||   // hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) ||            // hits right wall   
            (currentSnake[0] % width === 0 && direction === -1) ||                  // left wall 
            (currentSnake[0] - width < 0 && direction === -width) ||                // hits the top
            squares[currentSnake[0] + direction].classList.contains('snake')        // hits itself
            
            ){
                return clearInterval(interval); // clear interval if hit
        }

        const tail = currentSnake.pop();            // removes last square from snake array and shows it
        squares[tail].classList.remove('snake');    // remove class name from TAIL  square
        currentSnake.unshift(currentSnake[0]+ direction);   // gives direction to head of array

         
        //check snake hitting apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');         //clear apple class from all sqaures once hit
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            //random apple
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }

        squares[currentSnake[0]].classList.add('snake');

    }



    function control (e){
        squares[currentIndex].classList.remove('snake'); // remove class of snake from ALL squares


        if(e.keyCode === 39){           // right arrow press moves snake to the right 
            direction = 1;
        }else if (e.keyCode === 38){     // up arrow press moves snake back 10 spaces
            direction = -width;
        }else if (e.keyCode === 37){    // left arrow press moves snake to the left one div
            direction = -1;             
        }else if (e.keyCode === 40){     // down arrow press
            direction = +width; 
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);


})