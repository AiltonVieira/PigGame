/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var playerActive, dice, scores, roundScore, playing, goal;

function init(){
    scores = [0,0]
    roundScore = 0
    playerActive = 0
    goal = 20
    document.querySelector('.btn-start').style.display = 'none';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.querySelector('.goal').style.display = 'none';
    console.log("init")
}
init()


    document.querySelector('.btn-roll').addEventListener('click', function(){
        if(playing == true){
        dice = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice, dice2)
        
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice2').style.display = 'block';
        document.querySelector('.dice').src = 'assets/dice-' + dice + '.png';
        document.querySelector('.dice2').src = 'assets/dice-' + dice2 + '.png';
        
        if(dice == 6 && dice2 == 6){
            roundScore = 0;
            scores[playerActive] = 0
            document.querySelector('#current-' + playerActive).textContent = scores[playerActive];
            document.querySelector('#score-' + playerActive).textContent = scores[playerActive];
            document.querySelector('.player-' + playerActive + '-panel').classList.remove('active');
            playerActive == 0 ? playerActive = 1 : playerActive = 0;
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + playerActive + '-panel').classList.add('active')
        } else {
            if(dice != 1 && dice2 != 1){
                roundScore += dice + dice2
                document.querySelector('#current-' + playerActive).textContent = roundScore;
            } else {
                roundScore = 0;
                document.querySelector('#current-' + playerActive).textContent = roundScore;
                document.querySelector('.player-' + playerActive + '-panel').classList.remove('active');
                playerActive == 0 ? playerActive = 1 : playerActive = 0;
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.dice2').style.display = 'none';
                document.querySelector('.player-' + playerActive + '-panel').classList.add('active')
            }
        }
    }
    })

    document.querySelector('.btn-hold').addEventListener('click', function(){
        if(playing == true){
            scores[playerActive] += roundScore
            roundScore = 0;
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('#score-' + playerActive).textContent = scores[playerActive]
            document.querySelector('#current-' + playerActive).textContent = roundScore;
            document.querySelector('.player-' + playerActive + '-panel').classList.remove('active');
            if(scores[playerActive] >= goal){
                document.querySelector('#name-' + playerActive).textContent = 'WINNER!'
                document.querySelector('.player-' + playerActive + '-panel').classList.remove('active');
                document.querySelector('.player-' + playerActive + '-panel').classList.add('winner');
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.dice2').style.display = 'none';
                document.querySelector('.btn-roll').disabled = true;
                playing = false;
            } else {
                if(playerActive == 0){
                    playerActive = 1
                } else {
                    playerActive = 0
                }
                document.querySelector('.player-' + playerActive + '-panel').classList.add('active');
            }
        }
    })

document.querySelector('.btn-new').addEventListener('click', function(){
    scores = [0,0];
    roundScore = 0;
    playerActive = 0;
    document.querySelector('.goal').disabled = false;
    document.querySelector('.btn-start').style.display = 'block';
    document.querySelector('.goal').style.display = 'block';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'PLAYER 1'
    document.querySelector('#name-1').textContent = 'PLAYER 2'
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.btn-roll').disabled = true;
    playing = false;
})


document.querySelector('.btn-start').addEventListener('click', function(){
    scores = [0,0];
    roundScore = 0;
    playerActive = 0;
    goal = document.querySelector('.goal').value;
    document.querySelector('.goal').disabled = true;
    document.querySelector('.btn-start').style.display = 'none';
    document.querySelector('.btn-roll').disabled = false;
    playing = true;
})


document.querySelector('.btn-rules').addEventListener('click', function(){
    document.querySelector(".rules-layout").style.display = "block";
    document.querySelector(".btn-rules").disabled = true;
    document.querySelector('.btn-new').disabled = true;
    

})

document.querySelector('.btn-ok').addEventListener('click', function(){
    document.querySelector(".rules-layout").style.display = "none";
    document.querySelector(".btn-rules").disabled = false;
    document.querySelector('.btn-new').disabled = false;
    
})