(function () {
var shooter = {
    left: 575,
    top: 650
};
var gameOver = false;
var refreshInterval;
document.getElementById("scorediv").style.margin = "20px 20px 120px 1350px";
var score;
var bullet = [];
var rebel = [];
var boundaries;


 function resetObjects() {

    rebel = [
        { left: 200, top: 100 },
        { left: 300, top: 100 },
        { left: 400, top: 100 },
        { left: 500, top: 100 },
        { left: 600, top: 100 },
        { left: 700, top: 100 },
        { left: 800, top: 100 },
        { left: 900, top: 100 },
        { left: 1000, top: 100 },
        { left: 1100, top: 100 },
        { left: 1200, top: 100 },
        { left: 1300, top: 100 },
        { left: 1400, top: 100 },
        { left: 100, top: 100 },
        { left: 200, top: 175 },
        { left: 300, top: 175 },
        { left: 400, top: 175 },
        { left: 500, top: 175 },
        { left: 600, top: 175 },
        { left: 700, top: 175 },
        { left: 800, top: 175 },
        { left: 900, top: 175 },
        { left: 1000, top: 175 },
        { left: 1100, top: 175 },
        { left: 1200, top: 175 },
        { left: 1300, top: 175 },
        { left: 1400, top: 175 },
        { left: 100, top: 175 },
        { left: 200, top: 25 },
        { left: 300, top: 25 },
        { left: 400, top: 25 },
        { left: 500, top: 25 },
        { left: 600, top: 25 },
        { left: 700, top: 25 },
        { left: 800, top: 25 },
        { left: 900, top: 25 },
        { left: 1000, top: 25 },
        { left: 1100, top: 25 },
        { left: 1200, top: 25 },
        { left: 1300, top: 25 },
        { left: 1400, top: 25 },
        { left: 100, top: 25 }
    ];
    
    boundaries = {
      left: 0,
      right: 1450
      } 
	  score= 0;
	  document.getElementById("scorediv").innerHTML = "Score: ";
 }

document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        // Left arrow
        shooter.left = Math.max(boundaries.left, shooter.left - 15);
    }
    if (e.keyCode === 39) {
        // Right arrow
        shooter.left = Math.min(boundaries.right, shooter.left + 15);
        
    }
    if (e.keyCode === 32) {
        // Spacebar to file 
        bullet.push({
            left: shooter.left + 20,
            top: shooter.top - 20 
        });
        drawbullet()
    }
    shooterdrawing();

}


function shooterdrawing() {
    document.getElementById('shooter').style.left = shooter.left + 'px';
    document.getElementById('shooter').style.top = shooter.top + 'px';
}

function bulletdrawing() {
    document.getElementById('bullet').innerHTML = ""
    for(var i = 0 ; i < bullet.length ; i++ ) {
        document.getElementById('bullet').innerHTML += `<div class='missile1' style='left:${bullet[i].left}px; top:${bullet[i].top}px'></div>`;
    }
}

function bulletmovement() {
    for(var i = 0 ; i < bullet.length ; i++ ) {
        bullet[i].top = bullet[i].top - 8
    }
}

function rebeldrawing() {
    document.getElementById('rebel').innerHTML = ""
    for(var i = 0 ; i < rebel.length ; i++ ) {
        document.getElementById('rebel').innerHTML += `<div class='enemy' style='left:${rebel[i].left}px; top:${rebel[i].top}px'></div>`;
    }
}

function shootingRebels() {
    for (var i = 0; i < rebel.length; i++) {
        for (var j = 0; j < bullet.length; j++) {
            if ( 
                bullet[j].left >= rebel[i].left  &&
                bullet[j].left <= (rebel[i].left + 50)  &&
                bullet[j].top <= (rebel[i].top + 50)  &&
                bullet[j].top >= rebel[i].top
            ) {
                rebel.splice(i, 1);
                bullet.splice(j, 1);
                score ++;
                document.getElementById("scorediv").innerHTML = "Score: " +score;
            }
        }
    }
}

function rebelmovement() {
    for(var i = 0 ; (i < rebel.length && !gameOver) ; i++ ) {
    if (rebel[i].top === shooter.top - 15) {
        alert("Game Over.\nYour score is:" + " " + score + "\n Press Ok to start a new game.");  
        restartGame();
    }
    else
    {
    rebel[i].top = rebel[i].top + 2;
    }		
    }
}


function Play() {
    bulletmovement();
    bulletdrawing();
    rebelmovement();
    rebeldrawing();
    shootingRebels();
}

function startGame() {
    gameOver = false;
    resetObjects();
	score = 0;
    refreshInterval = setInterval(Play, 100)
}

function stopGame() {
    clearInterval(refreshInterval);
    gameOver = true;
 }

 function restartGame() {
    stopGame();
    startGame();
 }

startGame();

})();