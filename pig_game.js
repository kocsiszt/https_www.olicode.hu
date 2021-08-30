/*GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, dice, gamePlaying;

init();

var lastDice;           // Ezt a challenge miatt tettem bele ha egy körben 2 hatost dobunk akkor vesztünk

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {                                                          //a Gameplyaying et a program leárása végett hoztam létre tehát letiltok minden push és roll gombot
            // 1. Random number
    var dice1 = Math.floor(Math.random() * 6 ) + 1;
    var dice2 = Math.floor(Math.random() * 6 ) + 1;

    // 2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    //diceDOM.style.display = 'block';                                     //visszateszem a képernyõre a kockát
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Update the round score if the rolled number was NOT 1

    if (dice1 !== 1 && dice2 !== 1) {
        // Add score
        roundScore += dice1 + dice2;                                             //roundscore = roundscore + dice
        document.querySelector('#current-' + activePlayer).textContent = roundScore;          
    } else {
        // Next player
        nextPlayer();        
    }


    /*
    if (dice === 6 && lastDice ===6) {
        //Player looses score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();

    } else if (dice !== 1) {
        // Add score
        roundScore += dice;                                             //roundscore = roundscore + dice
        document.querySelector('#current-' + activePlayer).textContent = roundScore;          
    } else {
        // Next player
        nextPlayer();        
    }
*/

    }


});



document.querySelector('.btn-hold').addEventListener('click', function() {
    // Add CURRENT score to global score, itt adom hozzá a HOLD buttonnal a nagy score hez a pontszámot

    if (gamePlaying) {
        scores[activePlayer] += roundScore;                                         // ez ezt jelenti scores[activePlayer] = scores[activePlayer] + roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;                               ///Challenge 2
        //console.log(input);
        var winningScore;

        // Undefined, 0, null or "" are Coerced to false
        // Anything else is COERCED to true
        if (input) {
            winningScore = input;    
        } else {
            winningScore = 100;
        }
    
        // Check if player won the game
        if (scores[activePlayer]  >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');                 //itt a vinner az a CSS ben van definiálva
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');              //active a CSS ben van definiálva ott van beállítva hogy piros lesz a betõ is STB
            gamePlaying = false;
    
        } else {
        // Next player
        nextPlayer();   
        }
    }     
});


//DRY miatt ezt a fügvényt hoztuk létre

function nextPlayer() {
            // Next player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            /*if (activePlayer === 0) {                                     //ez ugyan az mint a felsõ sor csak ternary operatorral a fenti jobb
                activePlayer = 1;
            } else {
                activePlayer = 0;
            } */
            roundScore = 0;                                                 //ezzel érem el hogy a az új pörgetés értékét adja hozzá  a current hez nem pedig a masik player teljes összegét
            
            document.getElementById('current-0').textContent = '0';         //a currenteket nullázok ki a pörgetés után
            document.getElementById('current-1').textContent = '0';
    
            document.querySelector('.player-0-panel').classList.toggle('active');   //a HTML class ben az active részt leveszem (kissé szürkébb háttér)
            document.querySelector('.player-1-panel').classList.toggle('active');      //és itt pedig a dent levett szürkés hátteret átrakom a player 1 re
            
            /*// itt levettem meg vissza raktam az active részt de ezt meg tudom úgy csinálni hogy a toggle t teszem be a remove és az add helyére
            document.querySelector('.player-0-panel').classList.remove('active');   //a HTML class ben az active részt leveszem (kissé szürkébb háttér)
            document.querySelector('.player-1-panel').classList.add('active');      //és itt pedig a dent levett szürkés hátteret átrakom a player 1 re
            */
    
           document.getElementById('dice-1').style.display = 'none';
           document.getElementById('dice-2').style.display = 'none';       
}


document.querySelector('.btn-new').addEventListener('click', init);                    //itt az init a lenti init(); függvényem



function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

//ezekkel nullázom le az össszes számot amit a HTML ben példaként megadtam
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;    //a querySelector kiválasztja a HTML bõl a current- object et. a textContent pedig a kiiratja a számot tehát nem az lesz benne amit alaõból megadtunk a HTML ben itt a 11  volt megadva
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';           //itt tudnánk javaScript bõl formázni a HTML szöveget

//var x = document.querySelector('#score-0').textContent;                  //itt az X et csak tárolásra hozzuk létre GETTING nek
//console.log(x);
