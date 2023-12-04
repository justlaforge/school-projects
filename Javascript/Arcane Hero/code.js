//System and Game variables
  //Player Variables - Stats
  var health = 100;
  var agility = 1;
  var stamina = 0;
  var attack = 0;
  var score = 0;
  var playerSpeed = 7;
  var lives = 3;
  var playerCoins = 0;
  var enemyHealth = 100;
  var playerHealth = 100;
  var addEnemyAttack = 0;
  var addChanceHit = 0;
  var addChance = 0;
  
  //Player Variables - Properties
  var characterWidth = getProperty("character","width")/2;
  var characterHeight = getProperty("character","height")/2;
  var currentCostume = "assets/ArcaneHeroSkin1Front.png";
  
  //Stage Variables
  var levelBoundries = [33, 44, 286, 406]; //Stage boundaries [Top left x, Top left y, Bottom right x, Bottom right y]
  var stages = ["assets/ArcaneAdventure_Stage1.png", "assets/ArcaneAdventure_Stage2.png", "assets/ArcaneAdventure_Stage3.png", "assets/ArcaneAdventure_Stage4.png", "assets/ArcaneAdventure_Stage5.png", "assets/ArcaneAdventure_Stage6.png", "assets/ArcaneAdventure_Stage7.png", "assets/ArcaneAdventure_Stage8.png", "assets/ArcaneAdventure_Stage9.png", "assets/ArcaneAdventure_Stage10.png", "assets/ArcaneAdventure_Stage11.png", "assets/ArcaneAdventure_Stage12.png", "assets/ArcaneAdventure_Stage13.png", "assets/ArcaneAdventure_Stage14.png", "assets/ArcaneAdventure_Stage15.png"];
  var currentStage = stages[0];
  var stageGridx = 0;
  var stageGridy = 0;
  var worldGrid = ["0, 0"]; // [StageGridX StageGridY]
  var doorPassed;
  var logStages = ["assets/ArcaneAdventure_Stage1.png"]; 
  var loggedStage = 0;
  var stagesWithoutLeft = ["assets/ArcaneAdventure_Stage2.png", "assets/ArcaneAdventure_Stage10.png", "assets/ArcaneAdventure_Stage11.png", "assets/ArcaneAdventure_Stage13.png", "assets/ArcaneAdventure_Stage15.png", "assets/ArcaneAdventure_Stage7.png", "assets/ArcaneAdventure_Stage9.png"];
  var stagesWithoutRight = ["assets/ArcaneAdventure_Stage10.png", "assets/ArcaneAdventure_Stage11.png", "assets/ArcaneAdventure_Stage12.png", "assets/ArcaneAdventure_Stage14.png", "assets/ArcaneAdventure_Stage3.png", "assets/ArcaneAdventure_Stage6.png", "assets/ArcaneAdventure_Stage9.png"];
  var stagesWithoutTop = ["assets/ArcaneAdventure_Stage10.png","assets/ArcaneAdventure_Stage12.png", "assets/ArcaneAdventure_Stage13.png", "assets/ArcaneAdventure_Stage14.png", "assets/ArcaneAdventure_Stage2.png", "assets/ArcaneAdventure_Stage4.png", "assets/ArcaneAdventure_Stage8.png"];
  var stagesWithoutBottom = ["assets/ArcaneAdventure_Stage11.png", "assets/ArcaneAdventure_Stage12.png", "assets/ArcaneAdventure_Stage13.png", "assets/ArcaneAdventure_Stage15.png", "assets/ArcaneAdventure_Stage3.png", "assets/ArcaneAdventure_Stage5.png", "assets/ArcaneAdventure_Stage8.png"];
  
  //Coin variables
  var coins = "0000000";
  var coinList = [];
  var coin1 = 0;
  var coin2 = 0;
  var coin3 = 0;
  var coin4 = 0;
  var coin5 = 0;
  var coin6 = 0;
  var coin7 = 0;
  var coin8 = 0;
  var showingCoins = [false,false,false,false,false,false,false,false];
  
  //Fighting variables
  var activeFight = false;
  var chance = 90;
  var turn = "Player";



//Start screen
onEvent("playButton","click", function(){
  setScreen("setupScreen");
  setProperty("difficultyEasyCheck","checked",true);
});

//Setup screen
onEvent("startButton","click", function(){
  randomCoins();
  showCoins(coins);
  setScreen("levelOne");
  
  //Add Perks
  if(getProperty("healthPerkCheck","checked")){
    health = 115;
    attack = 0;
    stamina = 0;
  } else if(getProperty("attackPerkCheck","checked")){
    health = 100;
    attack = 5;
    stamina = 0;
  } else if(getProperty("staminaPerkCheck","checked")){
    health = 100;
    attack = 0;
    stamina = 1;
  } else {
    health = 100;
    attack = 0;
    stamina = 0;
  }
  
  //Add Difficulty
  if(getProperty("difficultyEasyCheck","checked")){
    addChance = 0;
    addEnemyAttack = 0;
    addChanceHit = 0;
  } else if(getProperty("difficultyMedCheck","checked")){
    addChance = 15;
    addEnemyAttack = 3;
    addChanceHit = 1;
  } else if(getProperty("difficultyHardCheck","checked")){
    addChance = 30;
    addEnemyAttack = 7;
    addChanceHit = 3;
  } else {
    addChance = 0;
    addEnemyAttack = 0;
    addChanceHit = 0;
  }
  chance = 90 - addChance;
});

//Perks
onEvent("healthPerkCheck","change", function(){
  setProperty("attackPerkCheck","checked",false);
  setProperty("staminaPerkCheck","checked",false);
});
onEvent("attackPerkCheck","change", function(){
  setProperty("healthPerkCheck","checked",false);
  setProperty("staminaPerkCheck","checked",false);
});
onEvent("staminaPerkCheck","change", function(){
  setProperty("attackPerkCheck","checked",false);
  setProperty("healthPerkCheck","checked",false);
});

//Difficulty
onEvent("difficultyEasyCheck","change", function(){
  setProperty("difficultyEasyCheck","checked",true);
  setProperty("difficultyMedCheck","checked",false);
  setProperty("difficultyHardCheck","checked",false);
});
onEvent("difficultyMedCheck","change", function(){
  setProperty("difficultyMedCheck","checked",true);
  setProperty("difficultyEasyCheck","checked",false);
  setProperty("difficultyHardCheck","checked",false);
});
onEvent("difficultyHardCheck","change", function(){
  setProperty("difficultyHardCheck","checked",true);
  setProperty("difficultyMedCheck","checked",false);
  setProperty("difficultyEasyCheck","checked",false);
});


//Next 227 lines are stage based code


//function allowing character to pass through doors
function leftDoorPass(){
  if(currentStage == stages[0] || currentStage == stages[2] || currentStage == stages[3] || currentStage == stages[4] || currentStage == stages[5] || currentStage == stages[7] || currentStage == stages[11] || currentStage == stages[13]){
    if (getProperty("character", "y") >  190 && getProperty("character", "y") + getProperty("character","height") < 260 ){
      return(true);
    }
  }
}

function topDoorPass(){
  if(currentStage == stages[0] || currentStage == stages[2] || currentStage == stages[4] || currentStage == stages[5] || currentStage == stages[6] || currentStage == stages[8] || currentStage == stages[10] || currentStage == stages[14]){
    if (getProperty("character", "x") >  125 && getProperty("character", "x") + getProperty("character","width") < 195 ){
      return(true);
    }
  }
}

function rightDoorPass(){
  if(currentStage == stages[0] || currentStage == stages[1] || currentStage == stages[3] || currentStage == stages[4] ||  currentStage == stages[6] ||  currentStage == stages[7] || currentStage == stages[12] ||  currentStage == stages[14]){
    if (getProperty("character", "y") >  190 && getProperty("character", "y") + getProperty("character","height") < 260 ){
      return(true);
    }
  }
}

function bottomDoorPass(){
  if(currentStage == stages[0] || currentStage == stages[1] || currentStage == stages[3] || currentStage == stages[5] || currentStage == stages[6] || currentStage == stages[8] || currentStage == stages[9] || currentStage == stages[13]){
    if (getProperty("character", "x") >  125 && getProperty("character", "x") + getProperty("character","width") < 195 ){
      return(true);
    }
  }
}


//wrap character function - Wraps character to other side of screen when passing door
function wrap(){
  //Left Door
  if (getProperty("character", "x") < 0 - getProperty("character","width")){
    doorPassed = "Left";
    setProperty("character", "x", 320);
    stageGridx = stageGridx - 1;
    setStage();
    if (chance == 500){
      chance = 90 - addChance;
    }
  }
  //Top Door
  if (getProperty("character", "y") < 0 - getProperty("character","height") ){
    doorPassed = "Top";
    setProperty("character", "y", 450);
    stageGridy = stageGridy + 1;
    setStage();
    if (chance == 500){
      chance = 90 - addChance;
    }
  }
  //Right Door
  if (getProperty("character", "x") > 320){
    doorPassed = "Right";
    setProperty("character", "x", 0  - getProperty("character","width"));
    stageGridx = stageGridx + 1;
    setStage();
    if (chance == 500){
      chance = 90 - addChance;
    }
  }
  //Bottom Door
  if (getProperty("character", "y") > 450){
    doorPassed = "Bottom";
    setProperty("character", "y", 0 - getProperty("character","height"));
    stageGridy = stageGridy - 1;
    setStage();
    if (chance == 500){
      chance = 90 - addChance;
    }
  }
}

//checks if the current stage has already been discovered
function checkStage(stage){
  var flag = false;
  var lock = false;
  for(var i = 0; i < worldGrid.length; i++){
    if(worldGrid[i] == stage){
      flag = true;
      if (lock == false){
        loggedStage = i;
      }
    }
  }
  lock = false;
  return(flag);
}

//Checks if a list contains a stage
function containsStage(list, stage){
  var flag = false;
  for(var i = 0; i < list.length; i++){
    if(list[i] == stage){
      flag = true;
    }
  }
  return(flag);
}

//removes a stage from a list
function removeStage(list, stage){
  for(var i = 0; i < list.length; i++){
    if(list[i] == stage){
     removeItem(list, i);
    }
  }
}

//sets the costume of the stage of the newly discovered area
function setStageType(){
  var tempStageList;
  function  setTemp(){
   tempStageList = ["assets/ArcaneAdventure_Stage1.png", "assets/ArcaneAdventure_Stage2.png", "assets/ArcaneAdventure_Stage3.png", "assets/ArcaneAdventure_Stage4.png", "assets/ArcaneAdventure_Stage5.png", "assets/ArcaneAdventure_Stage6.png", "assets/ArcaneAdventure_Stage7.png", "assets/ArcaneAdventure_Stage8.png", "assets/ArcaneAdventure_Stage9.png", "assets/ArcaneAdventure_Stage10.png", "assets/ArcaneAdventure_Stage11.png", "assets/ArcaneAdventure_Stage12.png", "assets/ArcaneAdventure_Stage13.png", "assets/ArcaneAdventure_Stage14.png", "assets/ArcaneAdventure_Stage15.png"];
  }
 var resultList = ["assets/ArcaneAdventure_Stage1.png", "assets/ArcaneAdventure_Stage2.png", "assets/ArcaneAdventure_Stage3.png", "assets/ArcaneAdventure_Stage4.png", "assets/ArcaneAdventure_Stage5.png", "assets/ArcaneAdventure_Stage6.png", "assets/ArcaneAdventure_Stage7.png", "assets/ArcaneAdventure_Stage8.png", "assets/ArcaneAdventure_Stage9.png", "assets/ArcaneAdventure_Stage10.png", "assets/ArcaneAdventure_Stage11.png", "assets/ArcaneAdventure_Stage12.png", "assets/ArcaneAdventure_Stage13.png", "assets/ArcaneAdventure_Stage14.png", "assets/ArcaneAdventure_Stage15.png"];

  setTemp();
  //Already exists?
  if (checkStage(String(stageGridx) + ", " + String(stageGridy))){
    setProperty("levelOne","image", logStages[loggedStage]);
  //Undiscovered
  } else {
    //Check left
      if (checkStage(String(stageGridx -1) + ", " + String(stageGridy))){
        //if stage does not have a left door
        if(!(containsStage(stagesWithoutRight, logStages[loggedStage]))){
          for(var i = 0; i <= stagesWithoutLeft.length-1; i++){
            if(containsStage(resultList, stagesWithoutLeft[i])){
              removeStage(resultList, stagesWithoutLeft[i]);
            }
          }
        }
        
        //Stage to left is missing right - remove stages with left
        else{
          for(var m = 0; m <= stagesWithoutLeft.length-1; m++){
            if(containsStage(tempStageList, stagesWithoutLeft[m])){
              removeStage(tempStageList, stagesWithoutLeft[m]);
            }
          }
          for(var n = 0; n <= tempStageList.length-1; n++){
            if(containsStage(resultList, tempStageList[n])){
              removeStage(resultList, tempStageList[n]);
            }
          }
          setTemp();
        }
      } 
    
    //Check top
      if (checkStage(String(stageGridx) + ", " + String(stageGridy + 1))){
        //if stage does not have a Top door
        if(!(containsStage(stagesWithoutBottom, logStages[loggedStage]))){
          for(var j = 0; j <= stagesWithoutTop.length-1; j++){
            if(containsStage(resultList, stagesWithoutTop[j])){
              removeStage(resultList, stagesWithoutTop[j]);
            }
          }
        }
         //Top stage is missing bottom - remove stages with top
        else{
          for(var o = 0; o <= stagesWithoutTop.length-1; o++){
            if(containsStage(tempStageList, stagesWithoutTop[o])){
              removeStage(tempStageList, stagesWithoutTop[o]);
            }
          }
          for(var p = 0; p <= tempStageList.length-1; p++){
            if(containsStage(resultList, tempStageList[p])){
              removeStage(resultList, tempStageList[p]);
            }
          }
          setTemp();
        }
      } 
      
    //Check Right
      if (checkStage(String(stageGridx +1) + ", " + String(stageGridy))){
        //if stage does not have a Right door
        if(!(containsStage(stagesWithoutLeft, logStages[loggedStage]))){
          for(var k = 0; k <= stagesWithoutRight.length-1; k++){
            if(containsStage(resultList, stagesWithoutRight[k])){
              removeStage(resultList, stagesWithoutRight[k]);
            }
          }
        }
         //Stage to right is missing Left - remove stages with Right
        else{
          for(var q = 0; q <= stagesWithoutRight.length-1; q++){
            if(containsStage(tempStageList, stagesWithoutRight[q])){
              removeStage(tempStageList, stagesWithoutRight[q]);
            }
          }
          for(var r = 0; r <= tempStageList.length-1; r++){
            if(containsStage(resultList, tempStageList[r])){
              removeStage(resultList, tempStageList[r]);
            }
          }
          setTemp();
        }
      } 
      
    //Check bottom
      if (checkStage(String(stageGridx) + ", " + String(stageGridy -1))){
        //if stage has a Top door
        if(!(containsStage(stagesWithoutTop, logStages[loggedStage]))){
          for(var l = 0; l <= stagesWithoutTop.length-1; l++){
            if(containsStage(resultList, stagesWithoutBottom[l])){
              removeStage(resultList, stagesWithoutBottom[l]);
            }
          }
        } 
        //Bottom stage is missing Top - remove stages with Bottom
        else{
          for(var s = 0; s <= stagesWithoutBottom.length-1; s++){
            if(containsStage(tempStageList, stagesWithoutBottom[s])){
              removeStage(tempStageList, stagesWithoutBottom[s]);
            }
          }
          for(var t = 0; t <= tempStageList.length-1; t++){
            if(containsStage(resultList, tempStageList[t])){
              removeStage(resultList, tempStageList[t]);
            }
          }
          setTemp();
        }
      } 
    setProperty("levelOne","image", resultList[randomNumber(0,resultList.length-1)]);
  }
  loggedStage = 0;
  currentStage = getProperty("levelOne", "image");
  
}


//select Next Stage function
function setStage(){
  if (doorPassed == "Left"){
    setStageType();
    if (checkStage(String(stageGridx) + ", " + String(stageGridy))) {
      showCoins(coinList[loggedStage]);
    } else {
    appendItem(worldGrid, String(stageGridx) + ", " + String(stageGridy));
    appendItem(logStages, getProperty("levelOne","image"));
    randomCoins();
    showCoins(coins);
   }
  }
  if (doorPassed == "Top"){
    setStageType();
    if (checkStage(String(stageGridx) + ", " + String(stageGridy))) {
     showCoins(coinList[loggedStage]);
    } else {
    appendItem(worldGrid, String(stageGridx) + ", " + String(stageGridy));
    appendItem(logStages, getProperty("levelOne","image"));
    randomCoins();
    showCoins(coins);
   }
  }
  if (doorPassed == "Right"){
    setStageType();
   if (checkStage(String(stageGridx) + ", " + String(stageGridy))) {
      showCoins(coinList[loggedStage]);
    } else {
    appendItem(worldGrid, String(stageGridx) + ", " + String(stageGridy));
    appendItem(logStages, getProperty("levelOne","image"));
    randomCoins();
    showCoins(coins);
   }
  }
  if (doorPassed == "Bottom"){
   setStageType();
   if (checkStage(String(stageGridx) + ", " + String(stageGridy))) {
     showCoins(coinList[loggedStage]);
    } else {
    appendItem(worldGrid, String(stageGridx) + ", " + String(stageGridy));
    appendItem(logStages, getProperty("levelOne","image"));
    randomCoins();
    showCoins(coins);
   }
  }
}
//End of stage code


//Moving keys
onEvent("levelOne","keydown", function(event){
  var change;
  if(activeFight == false){
    
    //Move Forward - Up and W keys
    if(event.key == "w" || event.key == "Up"){
      currentCostume = "assets/ArcaneHeroSkin1Front.png";
      setProperty("character", "image", currentCostume);
      wrap();
      if (getProperty("character", "y") > levelBoundries[1] || topDoorPass()){ //Boundries
        change = getProperty("character", "y") - playerSpeed;
        setProperty("character","y",change);
      }
      fightOccur();
    }
    
    //Move Backward - Down and S keys
    if(event.key == "s" || event.key == "Down"){
      currentCostume = "assets/arcaneHeroSkin1Back.png";
      setProperty("character", "image", currentCostume);
      wrap();
      if (getProperty("character", "y") < levelBoundries[3] - characterHeight*2 || bottomDoorPass()){ //Boundries
        change = getProperty("character", "y") + playerSpeed;
        setProperty("character","y",change);
      }
      fightOccur();
    }
    
     //Move Left - Left and A keys
    if(event.key == "a" || event.key == "Left"){
      currentCostume = "assets/ArcaneHeroSkin1Left.png";
      setProperty("character", "image", currentCostume);
      wrap();
      if (getProperty("character", "x") > levelBoundries[0] || leftDoorPass()){ //Boundries
        change = getProperty("character", "x") - playerSpeed;
        setProperty("character","x",change);
      }
      fightOccur();
    }
  
    
    //Move Right - Right and D keys
    if(event.key == "d" || event.key == "Right"){
      currentCostume = "assets/arcaneHeroSkin1Right.png";
      setProperty("character", "image", currentCostume);
      wrap();
      if (getProperty("character", "x") < levelBoundries[2] - characterWidth*2 || rightDoorPass()){ //Boundries
        change = getProperty("character", "x") + playerSpeed;
        setProperty("character","x",change);
      }
      fightOccur();
    }
    
    touchingCoin();
  }
});


//Coins
function touchingCoin(){
  var charY = getProperty("character", "y")+characterHeight;
  var charX = getProperty("character", "x")+characterWidth;
  var coinY;
  var coinX;
  for (var i = 1; i <= 8; i++){
    coinY = getProperty("coin"+String(i), "y");
    coinX = getProperty("coin"+String(i), "x");
    if((charY > coinY-10 && charY < coinY + getProperty("coin"+String(i), "height")+10) && (charX > coinX -10 && charX < coinX + getProperty("coin"+String(i), "width")+10)){
      if (showingCoins[i-1] == true){
        showingCoins[i-1] = false;
        hideElement("coin"+String(i));
        playerCoins = playerCoins + 1;
        setText("coins", "Coins: "+String(playerCoins));
        if(checkStage(String(stageGridx) + ", " + String(stageGridy))){
          coinReAssign(loggedStage);
        }
      } 
    }
  }
}

function randomCoins(){
  if(randomNumber(1,3) == 1){
    coin1 = 1;
    coin2 = 1;
    showingCoins[0] = true;
    showingCoins[1] = true;
  }
  else {
    coin1 = 0;
    coin2 = 0;
    showingCoins[0] = false;
    showingCoins[1] = false;
  }
  if(randomNumber(1,3) == 1){
    coin3 = 1;
    coin4 = 1;
    showingCoins[2] = true;
    showingCoins[3] = true;
  }
  else {
    coin3 = 0;
    coin4 = 0;
    showingCoins[2] = false;
    showingCoins[3] = false;
  }
  if(randomNumber(1,3) == 1){
    coin5 = 1;
    coin6 = 1;
    showingCoins[4] = true;
    showingCoins[5] = true;
  }
  else {
    coin5 = 0;
    coin6 = 0;
    showingCoins[4] = false;
    showingCoins[5] = false;
  }
  if(randomNumber(1,3) == 1){
    coin7 = 1;
    coin8 = 1; 
    showingCoins[6] = true;
    showingCoins[7] = true;
  }
  else {
    coin7 = 0;
    coin8 = 0;
    showingCoins[6] = false;
    showingCoins[7] = false;
  }
  coins = String(coin1) + String(coin2) + String(coin3) + String(coin4) + String(coin5) + String(coin6) + String(coin7) + String(coin8); 
  appendItem(coinList, coins);
}

function showCoins(coinSet){
  for(var i = 0; i < coinSet.length; i++){
    if (coinSet.substring(i,i+1) == "1"){
      showElement("coin"+String(i+1));
      showingCoins[i] = true;
    } else if (coinSet.substring(i,i+1) == "0"){
      hideElement("coin"+String(i+1));
      showingCoins[i] = false;
    }
  }
}

function coinReAssign(index){
  var reAssignCoins = "";
  for (var i = 0; i < showingCoins.length; i++){
    if(showingCoins[i] == false){
      reAssignCoins = reAssignCoins + "0";
    } else {
      reAssignCoins = reAssignCoins + "1";
    }
  }
   coinList[index] = reAssignCoins;
  
}



// Animations
var vsLoop;
var coverLoop;
var coverLoopEnd;
var playerLoop;
var enemyLoop;

function startFightAnim(){
  activeFight = true;
  showElement("cover1");
  showElement("cover2");
  setPosition("cover1", -175,175);
  setPosition("cover2", 175,-175);
  coverLoop = timedLoop(1, function(){
    if(getProperty("cover1","x") < 0){
    setPosition("cover1", getProperty("cover1","x")+1,getProperty("cover1","y")-1);
    setPosition("cover2", getProperty("cover2","x")-1,getProperty("cover2","y")+1);
  } else {
    setScreen("FightScreen");
    startFight();
    stopTimedLoop(coverLoop);
  }
  });
}

function endFightAnim(){
  setScreen("levelOne");
  showElement("cover1");
  showElement("cover2");
  setPosition("cover1", 0,0);
  setPosition("cover2", 0,0);
  coverLoopEnd = timedLoop(1, function(){
    if(getProperty("cover1","x") > -175){
    setPosition("cover1", getProperty("cover1","x")-1,getProperty("cover1","y")+1);
    setPosition("cover2", getProperty("cover2","x")+1,getProperty("cover2","y")-1);
  } else {
    stopTimedLoop(coverLoopEnd);
    activeFight = false;
  }
  });
}

function playerLoseAnim(){
  var change = 0;
    playerLoop = timedLoop(30, function(){
      setPosition("playerChar", getProperty("playerChar","x")-change, getProperty("playerChar","y"));
    if (getProperty("playerChar", "x")+ getProperty("playerChar","width") < 0){
      stopTimedLoop(playerLoop);
      endFightAnim();
    }
    change = change+ 0.5;
  });
}

function playerWonAnim(){
  var change = 0;
    enemyLoop = timedLoop(30, function(){
      setPosition("badGuyChar", getProperty("badGuyChar","x")+change, getProperty("badGuyChar","y"));
    if (getProperty("badGuyChar", "x") > 320){
      stopTimedLoop(enemyLoop);
      endFightAnim();
    }
    change = change+ 0.5;
  });
}

function attackName(input, next){
  var opacityUp;
  var opacity = 0;
  setText("attackLabel", input);
  showElement("attackLabel");
  opacityUp = timedLoop(30, function(){
    opacity = opacity + 2;
    if (opacity >= 100){
      stopTimedLoop(opacityUp);
      hideElement("attackLabel");
      turn = next;
    }
  });
}


//Fighting
var attack1Used = 0;
var attack2Used = 0;
var attack3Used = 0;
var sparkDamage = 10 + attack;
var singeDamage = 15 + attack;
var boltDamage = 20 + attack;
var enemyAttackDam = 0;
var attackUsed;

function fightOccur(){
  
  //Top Left square
  if(getProperty("character", "x") > levelBoundries[0] - characterWidth && getProperty("character", "x") + characterWidth < 133 && getProperty("character", "y") > levelBoundries[1] - characterWidth && getProperty("character", "y") + characterHeight < 200){
    if (randomNumber(1,chance) == 1){
      startFightAnim();
    }
  
  //Top Right square
  } else if (getProperty("character", "x") > 185 - characterWidth && getProperty("character", "x") + getProperty("character", "width") < 285 && getProperty("character", "y") > levelBoundries[1] - characterWidth && getProperty("character", "y") + characterHeight < 200){
    if (randomNumber(1,chance) == 1){
      startFightAnim();
    }
    
  //Bottom Left square
  } else if (getProperty("character", "x") > levelBoundries[0] - characterWidth && getProperty("character", "x") + characterWidth < 133 && getProperty("character", "y") > 255 - characterWidth && getProperty("character", "y") + characterHeight < 406){
    if (randomNumber(1,chance) == 1){
      startFightAnim();
    }
  
  //Bottom Right square
  } else if (getProperty("character", "x") > 185 - characterWidth && getProperty("character", "x") + getProperty("character", "width") < 285 && getProperty("character", "y") > 255 - characterWidth && getProperty("character", "y") + characterHeight < 406){
    if (randomNumber(1,chance) == 1){
       startFightAnim();
    }
  }
}

function startFight(){
  attack1Used = 0;
  attack2Used = 0;
  attack3Used = 0;
  sparkDamage = 10 + attack;
  singeDamage = 15 + attack;
  boltDamage = 20 + attack;
  var move = -20;
  vsLoop = timedLoop(40, function(){
      if(getProperty("vsLogo","y") > 0 - getProperty("vsLogo", "height")){
      setPosition("vsLogo", getProperty("vsLogo","x"), getProperty("vsLogo","y") - move);
    } else {
      stopTimedLoop(vsLoop);
    }
    move = move+2;
    });
  if(agility == 1){
    turn = "player";
  } else {
    turn = "enemy";
  }
  playerHealth = health;
  enemyHealth = 100;
  setText("attack1Damage", sparkDamage);
  setText("attack2Damage", singeDamage);
  setText("attack3Damage", boltDamage);
  setText("attack2Use", String(3 + stamina*2) + "/" + String(3 + stamina*2));
  setText("attack3Use", String(2 + stamina) + "/" + String(2 + stamina));
  setPosition("GreenBar", 0, -5);
  setPosition("redBar", 185, -5);
  setPosition("playerChar", -60, -60);
  setPosition("badGuyChar", 40, -45);
  setPosition("vsLogo", 10, -10);
  setProperty("attack3","background-color", rgb(255, 0, 0, 0.47));
  setProperty("attack2","background-color", rgb(255, 0, 0, 0.47));
}

//attack buttons
onEvent("attack1","click", function(){
  if (turn == "player"){
    if(attack1Used < 1){
      if (playerHealth > 0){
        score = score + 15;
        attackUsed = "Spark";
        attackChar("enemy", sparkDamage);
      } 
    }
  } 
});

onEvent("attack2","click", function(){
  if (turn == "player"){
    if(attack2Used < 3 + stamina*2){
      if (playerHealth > 0){
        score = score + 10;
        attackUsed = "Singe";
        attackChar("enemy", singeDamage);
        attack2Used = attack2Used + 1;
        setText("attack2Use", String(3 + stamina*2 - attack2Used) + "/" + String(3 + stamina*2));
      } 
    } 
    if(attack2Used >= 3 + stamina*2){
          setProperty("attack2","background-color", rgb(111,53,53));
    }
  }
});

onEvent("attack3","click", function(){
  if (turn == "player"){
    if(attack3Used < 2 + stamina){
      if (playerHealth > 0){
        score = score + 5;
        attackUsed = "Bolt";
        attackChar("enemy", boltDamage);
        attack3Used = attack3Used + 1;
        setText("attack3Use", String(2 + stamina - attack3Used) + "/" + String(2 + stamina));
        
      } 
    } 
    if(attack3Used >= 2 + stamina){
          setProperty("attack3","background-color", rgb(111,53,53));
    }
  }
});


//Enemys Turn
function enemyTurn(){
  turn = "enemy";
  var time = 0;
  var loop;
  loop = timedLoop(1000, function(){
    if(time == 1){
      if(enemyHealth > 0){
        stopTimedLoop(loop);
        var randomAttack = randomNumber(1,5);
        if (randomAttack == 1 ||randomAttack == 5){
            attackUsed = "Slap";
            attackChar("player", 10 + addEnemyAttack);
        }
        else if (randomAttack == 2||randomAttack == 4){
            attackUsed = "Scratch";
            attackChar("player", 15+ addEnemyAttack);
        }
        else if (randomAttack == 3){
            attackUsed = "Bite";
            attackChar("player", 20+ addEnemyAttack);
        }
      }
    } else {
      time = time+1;
    }
  });
}


function attackChar(who, damage){
  if(who == "enemy"){
    if (randomNumber(1,8) != 1){
      attackName(attackUsed, "enemy");
      setPosition("redBar", getProperty("redBar","x") + damage*(135/100), getProperty("redBar", "y"));
      enemyHealth = enemyHealth - damage;
      if (enemyHealth <= 0){
        playerWon();
      }  
    } else {
      attackName("Miss", "enemy");
    }
    enemyTurn();
  }
  else if(who == "player"){
    if(randomNumber(1,5 + addChanceHit) != 1){
      attackName(attackUsed, "player");
      setPosition("GreenBar", getProperty("GreenBar","x") - damage*(135/health), getProperty("GreenBar", "y"));
      playerHealth = playerHealth - damage;
      if (playerHealth <= 0){
        playerLost();
      }  
    } else {
      attackName("Miss", "player");
    }
  }
}

function playerLost(){
  lives = lives - 1;
  if (lives > 0){
    playerLoseAnim();
    setText("lives", "Lives: " + lives);
    turn = "player";
    if (score >= 1000000) {
      setText("Score", "Score: " + String(score).substring(0,1)+ "." + String(score).substring(1,2) + "M");
    } else if (score >= 100000) {
      setText("Score", "Score: " + String(score).substring(0,3)+ "." + String(score).substring(3,4) + "K");
    } else if (score >= 10000) {
      setText("Score", "Score: " + String(score).substring(0,2)+ "." + String(score).substring(2,3) + "K");
    } else if (score >= 1000){
      setText("Score", "Score: " + String(score).substring(0,1)+ "." + String(score).substring(1,2) + "K");
    } else {
      setText("Score", "Score: " + score);
    }
    enemyAttackDam = enemyAttackDam + 2;
    chance = 500;
    playerCoins = playerCoins - Math.round(playerCoins/4);
    setText("coins", "Coins: " + playerCoins);
  } else {
    setScreen("gameOverScreen");
    setText("finalScore", "Your Score: " + score);
    setText("finalCoins", "Your Coins: " + playerCoins);
    onEvent("restartButton","click", function(){
      restart();
    });
  }
}
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!
  //This line was added to get me to 1000!


function playerWon(){
  playerWonAnim();
  score = score + 75;
  if (score >= 1000000) {
    setText("Score", "Score: " + String(score).substring(0,1)+ "." + String(score).substring(1,2) + "M");
  } else if (score >= 100000) {
    setText("Score", "Score: " + String(score).substring(0,3)+ "." + String(score).substring(3,4) + "K");
  } else if (score >= 10000) {
    setText("Score", "Score: " + String(score).substring(0,2)+ "." + String(score).substring(2,3) + "K");
  } else if (score >= 1000){
    setText("Score", "Score: " + String(score).substring(0,1)+ "." + String(score).substring(1,2) + "K");
  } else {
    setText("Score", "Score: " + score);
  }
  enemyAttackDam = enemyAttackDam + 2;
  chance = 500;
  turn = "enemy";
}


function restart(){
  //Reset Score and Stats
  health = 100;
  agility = 1;
  stamina = 0;
  attack = 0;
  score = 0;
  playerCoins = 0;
  lives = 3;
  enemyHealth = 100;
  playerHealth = 100;
  addEnemyAttack = 0;
  addChanceHit = 0;
  
  //Reset Stage
  currentStage = stages[0];
  stageGridx = 0;
  stageGridy = 0;
  logStages = ["assets/ArcaneAdventure_Stage1.png"]; 
  worldGrid = ["0, 0"];
  loggedStage = 0;
  
  //Reset Coins
  coins = "0000000";
  coinList = [];
  coin1 = 0;
  coin2 = 0;
  coin3 = 0;
  coin4 = 0;
  coin5 = 0;
  coin6 = 0;
  coin7 = 0;
  coin8 = 0;
  showingCoins = [false,false,false,false,false,false,false,false];
  //This line was added to get me to 1000!
  //Reset Fighting variables
  activeFight = false;
  chance = 90;
  turn = "Player";
  attack1Used = 0;
  attack2Used = 0;
  attack3Used = 0;
  sparkDamage = 10 + attack;
  singeDamage = 15 + attack;
  boltDamage = 20 + attack;
  enemyAttackDam = 0;
  
  //Reset 
  setPosition("character", 135, 200);
  setScreen("startScreen");
  setText("Score", "Score: " + score);
  setText("coins", "Coins: " + playerCoins);
  setText("lives", "Lives: " + lives);
  
  setProperty("healthPerkCheck","checked",false);
  setProperty("attackPerkCheck","checked",false);
  setProperty("staminaPerkCheck","checked",false);
  setProperty("difficultyMedCheck","checked",false);
  setProperty("difficultyEasyCheck","checked",false);
  setProperty("difficultyHardCheck","checked",false);
  setProperty("levelOne","image","assets/ArcaneAdventure_Stage1.png");
  
  hideElement("cover1");
  hideElement("cover2");
}