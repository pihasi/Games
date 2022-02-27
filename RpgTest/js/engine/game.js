'use strict'

const widthCanvas = 320;
const heightCanvas = 320;

const windowFontSize = 20;
const windowFont = windowFontSize +"px 'ＭＳ ゴシック'";

const windowMarginX = 5;
const windowMarginY = 5;

const choicesTxtsGap = 10;



const playData = {
  oneScene:{},
  
  durGame:{},
  
  checkOneScene(nameProperty, val=null){
    return playData.check(playData.oneScene, nameProperty, val);
  },
  
  checkDurGame(nameProperty, val=null){
    return playData.check(playData.durGame, nameProperty, val);
  },

  check(obj, nameProperty, val){
    if( (obj.hasOwnProperty(nameProperty))
      && ( (val==null) || (obj[nameProperty] == val) )){
        return true;
	  }
	  
    return false;
  }
};
	    
	    
	    
var sprits = [];
var prioritySprite = null;
var backGround = null;

var canvas;
var isNeedUpdate = false;



function startGame(){
  let promisese = createPromisesForPreLoad();
  
  Promise.all( promisese ).then( result => {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = widthCanvas;
    canvas.height = heightCanvas;
    startCanvasAcceptClicked();
      
    let firstScene = new testMap();
    firstScene.start();
      
  }).catch( reject => {
    console.error(reject);
  });
}

function startCanvasAcceptClicked(){
      canvas.addEventListener("click", searchForClickedSprite);
}

function setBackGround(img){
    if( img != null) {
      backGround = new Image();
      backGround.src = img;
    } else {
      backGround = null;
    }
  }
  
function addSprite(sprite) {
    sprits.push(sprite);
  }


function killSprite(target){
  sprits.some( function(sprite, idx){
	  if (sprite === target) sprits.splice(idx,1);
  });
}


function destructCurrentScene(){
  isNeedUpdate = false;
  killAllSprits();
  setBackGround(null);
  
  canvas.getContext("2d").clearRect(0,0, canvas.width,canvas.height);
}
function killAllSprits(){
  sprits =[];
}


  
function searchForClickedSprite(e){
  let clickX = e.pageX;
  let clickY = e.pageY;
//console.log("click X:" + e.pageX + " Y:" + e.pageY);

  if(prioritySprite == null){
        for (let i = 0; i < sprits.length; i++) {
          let spriteX = sprits[i].x;
          if(clickX < spriteX) continue;
          
          let spriteW = sprits[i].width;
          if(clickX > spriteX + spriteW) continue;
          
          let spriteY = sprits[i].y;
          if(clickY < spriteY) continue;
          
          let spriteH = sprits[i].height;
          if(clickY > spriteY + spriteH) continue;
          
          sprits[i].clicked(clickX, clickY);
          break;
        }
  } else {
    prioritySprite.clicked(clickX, clickY);
  }
}
    

function startCanvasUpdate() {
  isNeedUpdate = true;
  loopCanvasUpdate();
}
    
  


function loopCanvasUpdate() {
  if(isNeedUpdate){
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    if(backGround == null) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(backGround,0,0,
        canvas.width, canvas.height);
    }
    for (let i = 0; i < sprits.length; i++) {
      sprits[i].update(canvas);
    }
    
    if(prioritySprite != null){
      prioritySprite.update(canvas);
    }

    requestAnimationFrame(loopCanvasUpdate);
  }
}



