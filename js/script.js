$(document).ready(function(){
  function getRandNumber(max, min = 1) {
    return Math.floor((Math.random() * max) + min);
  }
  function checkPos(maxX, maxY) {
    var flag = false;
    var it = 0;
    while (!flag) {
      it ++;
      var x = getRandNumber(maxX);
      var y = getRandNumber(maxY);
      console.log(x);
      console.log(y);
      console.log("iteration = " + it);
      console.log("-------------");
      if(x !== JSON.parse(localStorage.getItem('playerPos')).x && y !== JSON.parse(localStorage.getItem('playerPos')).y ) {
         if(x !== JSON.parse(localStorage.getItem('goalPos')).x && y !== JSON.parse(localStorage.getItem('goalPos')).y) {
           flag = true;
           return {
             "x": x,
             "y": y
           };
         }
      }
    }
  }
  function init() {
    if(localStorage.getItem('gameState') == null) {
      localStorage.setItem('gameState', 'optionScreen');
      displayScreen(localStorage.getItem('gameState'));
    } else {
      if(localStorage.getItem('gameState') == "playScreen") {
        generateGame();
      }
      displayScreen(localStorage.getItem('gameState'));
    }
  }
  function generateGame() {
    var baseX = JSON.parse(localStorage.getItem('gameAxes')).x;
    var baseY = JSON.parse(localStorage.getItem('gameAxes')).y;
    var playScreen = $('section[data-state="playScreen"]');
    var html = "<div><h5 class='option1'>Aide JSON le fantôme<br>à rentrer chez lui<br>dans son manoir hanté.<br>Mais fais attention<br>aux Zombies Geeks qui<br>veulent le coder<br>au plus vite !</h5></div><div style='width:" + baseX * 40 + "px'class='gameContainer'>";
    for (var y = 1; y <= baseY; y++) {
      for (var x = 1; x <= baseX; x++) {
        html += "<div data-x='" + x + "' data-y='" + y + "'class='gameDiv'></div>";
      };
    };
    html += "</div>";
    html +="<div>";
     html += "";
   html += "</div>";
    $(playScreen).html(html);
    insertObjects();
  }
  function insertObjects() {
    if(localStorage.getItem('playerPos') == null) {
      var pos = {
        "x": 1,
        "y": 1
      };
      localStorage.setItem('playerPos', JSON.stringify(pos));
    }
    if(localStorage.getItem('goalPos') == null){
     var pos = {
       "x": JSON.parse(localStorage.getItem('gameAxes')).x,
       "y": JSON.parse(localStorage.getItem('gameAxes')).y
     };
     localStorage.setItem('goalPos', JSON.stringify(pos));
   };
   if(localStorage.getItem('monsterPos') == null) {
     var pos = checkPos(JSON.parse(localStorage.getItem('gameAxes')).x, JSON.parse(localStorage.getItem('gameAxes')).y);
     localStorage.setItem('monsterPos', JSON.stringify(pos));
   }
   var playerPos = JSON.parse(localStorage.getItem('playerPos'));
   var goalPos = JSON.parse(localStorage.getItem('goalPos'));
   var monsterPos = JSON.parse(localStorage.getItem('monsterPos'));
   $('.gameDiv[data-x="' + playerPos.x + '"][data-y="' + playerPos.y + '"]').html('<img style="width: 100%; height:100%;" src="./image/ghost.png">');
   $('.gameDiv[data-x="' + goalPos.x + '"][data-y="' + goalPos.y + '"]').html('<img style="width: 100%; height:100%;" src="./image/halloweenhouse2.png">');
   $('.gameDiv[data-x="' + monsterPos.x + '"][data-y="' + monsterPos.y + '"]').html('<img style="width: 100%; height:100%;" src="./image/zombie.png">');
   $('body').on('keydown', function (e) {
     if(e.keyCode == 38 /* UP key */){
       movePlayer('UP');
     } else if (e.keyCode == 40 /* DOWN key */){
       movePlayer('DOWN');
     } else if (e.keyCode == 37 /* LEFT key */){
       movePlayer('LEFT');
     } else if (e.keyCode == 39 /* RIGHT key */){
       movePlayer('RIGHT');
     }
   });
  }
  function checkVictory(currentPlayerPos) {
    if (currentPlayerPos.x == JSON.parse(localStorage.getItem('goalPos')).x && currentPlayerPos.y == JSON.parse(localStorage.getItem('goalPos')).y) {
          displayScreen('victory');
          localStorage.setItem('gameState', 'victory');
    }
  }
  function movePlayer(direction){
    var currentPlayerPos = JSON.parse(localStorage.getItem('playerPos'));
    var gameSize = JSON.parse(localStorage.getItem('gameAxes'));
    if(direction == "UP") {
      if((currentPlayerPos.y - 1) > 0) {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width: 100%; height:100%;" src="./image/ghost.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        console.log('Euh, le fantôme a disparût !');
      }
    } else if(direction == "DOWN") {
      if((currentPlayerPos.y + 1) <= gameSize.y) {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width: 100%; height:100%;" src="./image/ghost.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        console.log('Euh, le fantôme a disparût !');
      }
    } else if(direction == "LEFT") {
      if((currentPlayerPos.x - 1) > 0) {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width: 100%; height:100%;" src="./image/ghost.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        console.log('Euh, le fantôme a disparût !');
      }
    } else if(direction == "RIGHT") {
      if((currentPlayerPos.x + 1) <= gameSize.x) {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width: 100%; height:100%;" src="./image/ghost.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        console.log('Euh, le fantôme a disparût !');
      }
    }
    console.log('Je me déplace !');
    checkDefeat();
    moveMonster();
    while(JSON.parse(localStorage.getItem('monsterPos')).x == JSON.parse(localStorage.getItem('goalPos')).x && JSON.parse(localStorage.getItem('monsterPos')).y == JSON.parse(localStorage.getItem('goalPos')).y) {
     moveMonster();
     $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('goalPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('goalPos')).y + '"]').html('<img style="width:100%;height:100%;" src="/image/halloweenhouse2.png">');
   }
    checkDefeat();
  }
  function moveMonster() {
    var gameSize = JSON.parse(localStorage.getItem('gameAxes'));
    var currentMonsterPos = JSON.parse(localStorage.getItem('monsterPos'));
    if(getRandNumber(2) == 1) {
      if(getRandNumber(2) == 1) {
        if((currentMonsterPos.y - 1) > 0) {
          $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('');
          currentMonsterPos.y -= 1;
          $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('<img style="width:100%;height:100%;" src="/image/zombie.png">');
          localStorage.setItem('monsterPos', JSON.stringify(currentMonsterPos));
        }
      } else {
        if((currentMonsterPos.y + 1) <= gameSize.y) {
          $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('');
          currentMonsterPos.y += 1;
          $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('<img style="width:100%;height:100%;" src="/image/zombie.png">');
          localStorage.setItem('monsterPos', JSON.stringify(currentMonsterPos));
        }
      }
    } else {
      if(getRandNumber(2) == 1) {
        if((currentMonsterPos.x + 1) <= gameSize.x) {
          $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('');
          currentMonsterPos.x += 1;
          $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('<img style="width:100%;height:100%;" src="/image/zombie.png">');
          localStorage.setItem('monsterPos', JSON.stringify(currentMonsterPos));
        }
      } else {
        if((currentMonsterPos.x - 1) > 0) {
          $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('');
          currentMonsterPos.x -= 1;
          $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('<img style="width:100%;height:100%;" src="/image/zombie.png">');
          localStorage.setItem('monsterPos', JSON.stringify(currentMonsterPos));
        }
      }
    }
  }
  function checkDefeat() {
    var playerPos = JSON.parse(localStorage.getItem('playerPos'));
    var monsterPos = JSON.parse(localStorage.getItem('monsterPos'));
    if(playerPos.x == monsterPos.x && playerPos.y == monsterPos.y) {
      displayScreen('defeat');
      localStorage.setItem('gameState', 'defeat');
    }
  }
  function displayScreen(gameState) {
    $.each($('section[data-state!="' + gameState + '"]'), function(key, value) {
      $(this).addClass('hidden');
    })
    $('section[data-state!="' + gameState + '"]').addClass('hidden');
    $('section[data-state="' + gameState + '"]').removeClass('hidden');
  }

  $('button[data-action="startGame"]').on('click', function(){
    var baseX = $('input[name="x"]').val();
    var baseY = $('input[name="y"]').val();
    if(baseX == "" || baseY == "") {
      alert('Tu n\'as pas mis de bonnes valeurs .. MOUHAHAHAHAHA !');
    } else {
      var axes = {
        "x": baseX,
        "y": baseY
      };
      localStorage.setItem('gameAxes', JSON.stringify(axes));
      localStorage.setItem('gameState', "playScreen");
      generateGame();
      displayScreen(localStorage.getItem('gameState'));
    }
  });
  $('button[data-action="reset"]').on('click',function(){
    localStorage.clear();
    location.reload();
  });



  init();
});
