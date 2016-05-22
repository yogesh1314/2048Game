var Game = (function () {
  var a = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  var prev = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var map = { 2:'two', 4:'four', 8:'eight', 16:'oneSix', 32:'threeTwo', 64:'sixFour', 128:'oneTwoEight', 256:'twoFiveSix', 512:'fiveOneTwo', 1024:'oneZeroTwoFour', 2048:'twoZeroFourEight'};
  var divList;
  var twozerofoureight = 0;
  var temp;
  var scoreUpdate = true;
  var score = 0;
  var preScore = 0;
  var highScore = 0;
  var preMatrix;
  var highScoreLS = localStorage.getItem('highscore');
  if(highScoreLS){
    highScore = highScoreLS;
  }
  console.log("in game");
  var scoreEle = document.getElementById("score");
  var hasReached2048 = false;
  var gameOverScreenEle;
  var restart1Ele;
  var reached2048Ele;
  var restart2Ele;
  var continueEle;
  var newGame;

  function moveUp(){
    prevState();
    preScore = score;
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=0; j<4 ; j++)//rows
      {
        if(!a[j][i])
        {
          for(var k=j+1; k<4 ; k++)
          {
            if(a[k][i])
            {
              a[j][i]=a[k][i];
              a[k][i]=0;
              break;
            }
          }
        }
      }
    }
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=0; j<3 ; j++)//rows
      {
        var k = j+1;
        if((a[j][i] !== 0) && (a[j][i] === a[k][i]))
        {
          a[j][i] += a[k][i];
          a[k][i] = 0;
          if(scoreUpdate === true){
            score += (((Math.log2(a[j][i])) - 1) * a[j][i]);
          }
        }
      }
    }
    if(scoreUpdate === false){
      scoreUpdate = true;
    }
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=0; j<4 ; j++)//rows
      {
        if(!a[j][i])
        {
          for(var k=j+1; k<4 ; k++)
          {
            if(a[k][i])
            {
              a[j][i]=a[k][i];
              a[k][i]=0;
              break;
            }
          }
        }
      }
    }
  }

  function moveDown(){
    prevState();
    preScore = score;
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=3; j>=0 ; j--)//rows
      {
        if(!a[j][i])
        {
          for(var k = j-1; k >= 0 ; k--)
          {
            if(a[k][i])
            {
              a[j][i] = a[k][i];
              a[k][i] = 0;
              break;
            }
          }
        }
      }
    }
    for(var i = 0; i < 4 ; i++)//cols
    {
      for(var j = 3; j > 0 ; j--)//rows
      {
        if((a[j][i] !== 0) && (a[j][i] === a[j-1][i]))
        {
          a[j][i] += a[j-1][i];
          a[j-1][i] = 0;
          if(scoreUpdate === true){
            score += (((Math.log2(a[j][i])) - 1) * a[j][i]);
          }
        }
      }
    }
    if(scoreUpdate === false){
    scoreUpdate = true;
    }
    for(var i = 0; i < 4 ; i++)//cols
    {
      for(var j = 3; j >= 0 ; j--)//rows
      {
        if(!a[j][i])
        {
          for(var k = j-1; k >= 0 ; k--)
          {
            if(a[k][i])
            {
              a[j][i] = a[k][i];
              a[k][i] = 0;
              break;
            }
          }
        }
      }
    }
  }

  function moveLeft(){
    prevState();
    preScore = score;
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=0; j<4 ; j++)//rows
      {
        if(!a[i][j])
        {
          for(var k=j+1; k<4 ; k++)
          {
            if(a[i][k])
            {
              a[i][j]=a[i][k];
              a[i][k]=0;
              break;
            }
          }
        }
      }
    }
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=0; j<3 ; j++)//rows
      {
        if(a[i][j] && a[i][j] === a[i][j+1])
        {
          a[i][j] += a[i][j+1];
          a[i][j+1] = 0;
          if(scoreUpdate === true){
          score += (((Math.log2(a[i][j])) - 1) * a[i][j]);
          }
        }
      }
    }
    if(scoreUpdate === false){
      scoreUpdate = true;
    }
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=0; j<4 ; j++)//rows
      {
        if(!a[i][j])
        {
          for(var k=j+1; k<4 ; k++)
          {
            if(a[i][k])
            {
              a[i][j]=a[i][k];
              a[i][k]=0;
              break;
            }
          }
        }
      }
    }
  }

  function moveRight(){
    prevState();
    preScore = score;
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=3; j>=0 ; j--)//rows
      {
        if(!a[i][j])
        {
          for(var k=j-1; k>=0 ; k--)
          {
            if(a[i][k])
            {
              a[i][j]=a[i][k];
              a[i][k]=0;
              break;
            }
          }
        }
      }
    }
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=3; j>0 ; j--)//rows
      {
        if(a[i][j]&&a[i][j]===a[i][j-1])
        {
          a[i][j]+=a[i][j-1];
          a[i][j-1]=0;
          if(scoreUpdate === true){
          score += (((Math.log2(a[i][j])) - 1) * a[i][j]);
          }
        }
      }
    }
    if(scoreUpdate === false){
      scoreUpdate = true;
    }
    for(var i=0; i<4 ; i++)//cols
    {
      for(var j=3; j>=0 ; j--)//rows
      {
        if(!a[i][j])
        {
          for(var k=j-1; k>=0 ; k--)
          {
            if(a[i][k])
            {
              a[i][j]=a[i][k];
              a[i][k]=0;
              break;
            }
          }
        }
      }
    }
  }

  function updateHighScore(){
    if(score > highScoreLS){
      highScore = score;
    }
    localStorage.setItem('highscore',highScore);
    var highScoreEle = document.getElementById('highscore');
    highScoreEle.innerText = highScore;
  }

  function reDraw(){
    for(var i = 0; i < a.length; i++){
      for(var j = 0; j < a.length; j++){
        var loc = i * (a.length) + j;
        var divEle = divList[loc];
        var classAdd = map[a[i][j]];
        if(a[i][j] !== 0){
          divEle.setAttribute('class','tile ' + classAdd);
        }
        else{
          divEle.setAttribute('class','tile');
        }
      }
    }
    updateHighScore();
    var scoreEle = document.getElementById('score');
    scoreEle.innerText = score;
  }


  function randomNumber(){
    var x = Math.floor((Math.random() * 10) + 1);
    if(x <= 8){
      return 2;
    }
    else{
      return 4;
    }
  }

  function randomIndex(){
    var arr = [Math.floor((Math.random()*4)), Math.floor((Math.random()*4))];
    return arr;
  }

  function placeTile(){
    while(1){
      var pos = randomIndex();
      if((a[pos[0]][pos[1]]) === 0){
        break;
      }
    }
    a[pos[0]][pos[1]] = randomNumber();
  }

  function initalize(){
    console.log("initalize");
    score = 0;
    preScore = 0;
    updateHighScore();
    var saved = localStorage.getItem('preMatrix');
    if(saved){
      score = JSON.parse(localStorage.getItem('score'));
      preScore = score;
      preMatrix = JSON.parse(saved);
      a = preMatrix;
      reDraw();
    }
    else{
      placeTile();
      placeTile();
    }
    prevState();
    reDraw();
  }

  function prevState(){
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
          prev[i][j] = a[i][j];
        }
      }
  }

  function restart(){
    localStorage.removeItem('score');
    localStorage.removeItem('preMatrix');
    clearScreen();
    console.log("in restart");
    a = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(var i = 0; i < divList.length; i++){
      divList[i].setAttribute('class',' tile ');
    }
    initalize();
    return;
  }

  function undo(){
    console.log("in undo");
    score = preScore;
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        a[i][j] = prev[i][j];
      }
    }
  }

  function check2048(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(a[i][j] === 2048){
          hasReached2048 = true;
        }
      }
    }
  }

  function reached2048(){
    twozerofoureight++;
    reached2048Ele.style.display = "block";
    restart2Ele.style.display = "block";
    continueEle.style.display = "block";
    //screen with congratulations you made 2048 tile
    //continue ?
    //restart ?
    //submit score
  }

  function matrixFull(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(a[i][j] === 0)
        return false;
      }
    }
    return true;
  }

  function gameOver(){
    console.log("gameover");
    gameOverScreenEle.style.display = "block";
    restart1Ele.style.display = "block";
    //when matrix if full and there is no 2048 tile in matrix.
    //screen with restart option.
  }
  function clearScreen(){
    gameOverScreenEle.style.display = "none";
    restart1Ele.style.display = "none";
    reached2048Ele.style.display = "none";
    restart2Ele.style.display = "none";
    continueEle.style.display = "none";
  }

  function isSame(one, two){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(one[i][j] === two[i][j]){
        }
        else{
          return false;
        }
      }
    }
  }

  function isGameOver(){
    console.log("in isGameOver");
    temp = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        temp[i][j] = a[i][j];
      }
    }
    scoreUpdate = false;
    moveUp();
    if(isSame(temp, a) === false){
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
          a[i][j] = temp[i][j];
        }
      }
      return false;
    }
    scoreUpdate = false;
    moveDown();
    if(isSame(temp, a) === false){
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
          a[i][j] = temp[i][j];
        }
      }
      return false;
    }
    scoreUpdate = false;
    moveLeft();
    if(isSame(temp, a) === false){
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
          a[i][j] = temp[i][j];
        }
      }
      return false;
    }
    scoreUpdate = false;
    moveRight();
    if(isSame(temp, a) === false){
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
          a[i][j] = temp[i][j];
      }
        }
      return false;
    }
    return true;
  }

  function placeRedraw(){
    if(isSame(prev, a) === false){
    placeTile();
    reDraw();
    }
  }

  function swipeDetect(){
    console.log("swipeDetect");
    $("body").swipe( {
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
          moveLeft();
          console.log("left");
          move(event);
          placeRedraw();
        }
    });
    $("body").swipe( {
        swipeRight:function(event, direction, distance, duration, fingerCount) {
          moveRight();
          move(event);
          placeRedraw();
          console.log("right");
        }
    });
    $("body").swipe( {
        swipeUp:function(event, direction, distance, duration, fingerCount) {
          moveUp();
          move(event);
          placeRedraw();
          console.log("up");
        }
    });
    $("body").swipe( {
        swipeDown:function(event, direction, distance, duration, fingerCount) {
          moveDown();
          move(event);
          placeRedraw();
          console.log("down");
        }
    });
  }


  function move(e){
    var keyFlag = 1;
    switch (e.keyCode) {
      case 37:
      case 65:
      moveLeft();
      break;
      case 38:
      case 87:
      moveUp();
      break;
      case 39:
      case 68:
      moveRight();
      break;
      case 40:
      case 83:
      moveDown();
      break;
      case 85:
      undo();
      keyFlag = 0;
      break;
      default:
      keyFlag = 0;
      break;
    }
    reDraw();
    localStorage.setItem('score', score);
    preMatrix = JSON.stringify(a);
    localStorage.setItem('preMatrix', preMatrix);
    if(twozerofoureight === 0){
      check2048();
    }
    if(matrixFull() === true){
      if(hasReached2048 === true){
        hasReached2048 = false;
        reached2048();
      }
      if(isGameOver() === true){
        gameOver();
      }
    }
    if(hasReached2048 === true){
      hasReached2048 = false;
      reached2048();
    }
    if(keyFlag === 1){
      placeRedraw();
    }
  }

  return{
    init: function(){
      divList = document.querySelectorAll('div.tile');
      initalize();
      reDraw();
      $("body").swipe({
          swipe:function(event, direction, distance, duration, fingerCount) {
            swipeDetect();
          }
      });
      window.addEventListener('keydown',move);
      gameOverScreenEle = document.getElementById('gameOverScreen');
      restart1Ele = document.getElementById('restart1');
      restart1Ele.addEventListener('click',restart);
      reached2048Ele = document.getElementById('reached2048');
      restart2Ele = document.getElementById('restart2');
      restart2Ele.addEventListener('click',restart);
      continueEle = document.getElementById('continue');
      newGameEle = document.getElementById('newGame');
      newGameEle.addEventListener('click',restart);
      continueEle.addEventListener('click', clearScreen);
    }
  };
})();
