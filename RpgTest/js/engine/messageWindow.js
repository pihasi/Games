'use strict'

class MessageWindow {

  constructor(txt, targetSprite, action=()=>{}) {
    this.txt = txt;
    this.currentTxtIdx = 0;
    this.targetSprite = targetSprite;
    this.action = action;
    
    this.preCanvas = document.createElement('canvas');
    this.preCanvas.width = canvas.width;
    this.preCanvas.height = canvas.height / 3;
    
    this.drawWindow();
  }
  
  drawWindow(){
    let txt;
    if( Array.isArray(this.txt) ){
      txt = this.txt[this.currentTxtIdx];
      this.currentTxtIdx++;
    } else{
      txt = this.txt;
    }
    
    const preCtx = this.preCanvas.getContext('2d');

    preCtx.fillStyle = 'black'; 
    preCtx.fillRect(0, 0, this.preCanvas.width, this.preCanvas.height);

    preCtx.strokeStyle = 'white';
    preCtx.lineWidth = 4;
    preCtx.strokeRect(0, 0, this.preCanvas.width, this.preCanvas.height);

    preCtx.fillStyle = "white";
    preCtx.font = fontSize + "px 'ＭＳ ゴシック'";
    preCtx.textAlign = "left";
    preCtx.textBaseline = "top";
    
    for (let lines = txt.split("\n"), i = 0; i<lines.length; i++) {
      let addY = fontSize * i;
      preCtx.fillText(lines[i], 5, 5 + addY);
    }
  }
  
  setWindowPosMode(posMode){
    this.posMode = posMode;
    
    // 1:常に上側
    // 2:常に下側
    // 上記以外:呼び出し元スプライトの位置に応じて変える
  }
  

  update(canvas) {
    this.render(canvas);
  }
  
  render(canvas) {
    if((! this.hasOwnProperty("posMode"))
      || ((this.posMode != 1) && (this.posMode != 2))){
        let targetY = this.targetSprite.y;
        if(targetY > this.preCanvas.height + 16){
          this.posMode = 1;
        } else {
          this.posMode = 2;
        }
      }
    
    let dy;
    if(this.posMode == 1){
      dy = 0;
    } else {
      dy = canvas.height - this.preCanvas.height;
    }

    const ctx = canvas.getContext('2d');

    ctx.drawImage(this.preCanvas, 
      0, dy,
      this.preCanvas.width, this.preCanvas.height
    );
  }
  
  clicked(){
    if( Array.isArray(this.txt)
      && (this.currentTxtIdx < this.txt.length) ){
        this.drawWindow();
    } else {
        prioritySprite = null;
        
        this.action.call();
    }
  }
}


function showMessageWindow
  (txt, spriteSaying, action=()=>{}, posMode=0){
    let mes = new MessageWindow(txt, spriteSaying, action);
    mes.setWindowPosMode(posMode);
    
    prioritySprite = mes;
}
