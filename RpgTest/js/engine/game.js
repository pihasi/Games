'use strict'

const widthCanvas = 320;
const heightCanvas = 320;

var sprits = [];
var backGround = null;

var isNeedUpdate = false;

var prioritySprite = null;

var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = widthCanvas;
    canvas.height = heightCanvas;
    startCanvasAcceptClicked();

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
    //sprits配列の末尾に、objの値を追加
    sprits.push(sprite);
  } //add() 終了
  
function killAllSprits(){
  sprits =[];
}


  
function searchForClickedSprite(e){
  if(prioritySprite == null){
    	  let clickX = e.pageX;
    	  let clickY = e.pageY;
    	  
        for (let i = 0; i < sprits.length; i++) {
          let spriteX = sprits[i].x;
          if(clickX < spriteX) continue;
          
          let spriteW = sprits[i].width;
          if(clickX > spriteX + spriteW) continue;
          
          let spriteY = sprits[i].y;
          if(clickY < spriteY) continue;
          
          let spriteH = sprits[i].height;
          if(clickY > spriteY + spriteH) continue;
          
          sprits[i].clicked();
          break;
        }
  } else {
    prioritySprite.clicked();
  }
}
    

function startCanvasUpdate() {
  isNeedUpdate = true;
  loopCanvasUpdate();
}
    
  


function loopCanvasUpdate() {
  if(isNeedUpdate){
    const ctx = canvas.getContext('2d');
    if(backGround == null) {
      //塗りつぶしの色に、黒を指定する
      ctx.fillStyle = '#000000';
      //左上から、画面のサイズまでを、塗りつぶす
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(backGround,0,0,
        canvas.width, canvas.height);
    }
    //ゲームに登場する全てのもの（オブジェクト）の数だけ繰り返す
    for (let i = 0; i < sprits.length; i++) {
      //スプライトやテキストなど、すべてのオブジェクトのupdateメソッドを呼び出す
      sprits[i].update(canvas);
    }
    
    if(prioritySprite != null){
      prioritySprite.update(canvas);
    }

    //自分自身（_mainLoop）を呼び出して、ループさせる
    requestAnimationFrame(loopCanvasUpdate);
  }
}



