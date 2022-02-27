'use strict'

class MessageWindow {

  constructor(targetSprite, txt, posMode=0,
   choices=[], choiceAct=()=>{}, choiceActArg={}) {
    this.txt = txt;
    this.currentTxtIdx = 0;
    this.targetSprite = targetSprite;
    
    this.choices = choices;
    this.choicesCanvas = undefined;
    this.userSelected;
    this.choicesX;
    this.choicesY;
    
    this.choiceAct = choiceAct;
    this.choiceActArg = choiceActArg;
    
    this.confirmCanvas;
    this.confirmX;
    this.confirmY;

    this.posMode = posMode;
    this.mesY;
    
    this.mesCanvas = document.createElement('canvas');
    this.mesCanvas.width = canvas.width;
    this.mesCanvas.height = canvas.height / 3;
    
    
    this.drawMessage();
  }
  
  drawMessage(){
    let txt;
    if( Array.isArray(this.txt) ){
      txt = this.txt[this.currentTxtIdx];
      this.currentTxtIdx++;
    } else{
      txt = this.txt;
    }
    
    this.drawTxt(this.mesCanvas, txt);
      if(this.posMode == 0){
        let targetY = this.targetSprite.y;
        if(targetY > this.mesCanvas.height + 16){
          this.posMode = 1;
        } else {
          this.posMode = 2;
        }
      }
    
    let dy;
    if(this.posMode == 1){
      dy = 0;
    } else {
      dy = canvas.height - this.mesCanvas.height;
    }

    this.mesY = dy;
  }
  
  drawChoices(){
    let choicesTxt = this.choices[0];
    let width = this.getTxtWidth(choicesTxt);
    
    for(let i=1; i<this.choices.length; i++){
      let currentLine = this.choices[i];
      
      choicesTxt += "\n" + currentLine;
      
      let widthCurrentLine
        = this.getTxtWidth(currentLine);
      if(widthCurrentLine > width){
        width = widthCurrentLine;
      }
    }
    
    width += windowMarginX * 2;
    
    let height = windowFontSize * this.choices.length
      + choicesTxtsGap * (this.choices.length - 1)
      + windowMarginY * 2;
      
    
    this.choicesCanvas
      = document.createElement('canvas');
    this.choicesCanvas.width = width;
    this.choicesCanvas.height = height;
    
    this.drawTxt(
      this.choicesCanvas, choicesTxt, choicesTxtsGap);
      
    
    let dx;
    const thresholdX
     = canvas.width - this.choicesCanvas.width - 64;
    let targetX = this.targetSprite.x;
    if(targetX < thresholdX){
      dx = canvas.width - this.choicesCanvas.width;
    } else {
      dx = 0;
    }
      
    let dy;
    if(this.posMode == 1){
      dy = this.mesCanvas.height;
    } else {
      dy = canvas.height - this.mesCanvas.height
        - this.choicesCanvas.height;
    }
      
    this.choicesX = dx;
    this.choicesY = dy;
    
    
    this.confirmCanvas
      = document.createElement('canvas');
    this.confirmCanvas.width
      = windowFontSize * 2.5 + windowMarginX * 2;
    this.confirmCanvas.height
      = windowFontSize + windowMarginY * 2;
    
    let confirmTxt;
    if(this.choicesX < this.confirmCanvas.width){
      this.confirmX
        = this.choicesX + this.choicesCanvas.width;
    
      confirmTxt = "<決定";
    } else {
      this.confirmX
        = canvas.width - this.choicesCanvas.width
          - this.confirmCanvas.width;
      
      confirmTxt = "決定>";
    }
    this.confirmY = this.choicesY;
    this.userSelected = 0;

    this.drawTxt(this.confirmCanvas, confirmTxt);
  }
  
  getTxtWidth(txt){
    var context =
      document.createElement('canvas').getContext('2d');
    
    context.font = windowFont;
    var metrics = context.measureText(txt);
    
    return metrics.width;
  }
  
  drawTxt(txtCanvas, txt, txtsGapY=0){
    const preCtx = txtCanvas.getContext('2d');

    preCtx.fillStyle = 'black'; 
    preCtx.fillRect(0, 0, txtCanvas.width, txtCanvas.height);

    preCtx.strokeStyle = 'white';
    preCtx.lineWidth = 4;
    preCtx.strokeRect(0, 0, txtCanvas.width, txtCanvas.height);

    preCtx.fillStyle = "white";
    preCtx.font = windowFont;
    preCtx.textAlign = "left";
    preCtx.textBaseline = "top";
    
    for (let lines = txt.split("\n"), i = 0; i<lines.length; i++) {
      let addY = (windowFontSize + txtsGapY) * i;
      preCtx.fillText(lines[i],
        windowMarginX, windowMarginY + addY,
        txtCanvas.width - windowMarginX);
    }
  }
  

  update(canvas) {
    this.render(canvas);
  }
  
  render(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.mesCanvas, 
      0, this.mesY,
      this.mesCanvas.width, this.mesCanvas.height
    );
    
    if(this.choicesCanvas != undefined){
      ctx.drawImage(this.choicesCanvas, 
        this.choicesX, this.choicesY,
        this.choicesCanvas.width,
        this.choicesCanvas.height
      );
      
      ctx.drawImage(this.confirmCanvas,
        this.confirmX, this.confirmY,
        this.confirmCanvas.width,
        this.confirmCanvas.height
      );
    }
  }
  
  clicked(clickX, clickY){
    // drawChoicesの実行途中に呼ばれるとヤバイ？
    if(this.choicesCanvas == undefined){
      if( Array.isArray(this.txt)
      && (this.currentTxtIdx < this.txt.length) ){
        this.drawMessage();
      } else {
        if(this.choices.length > 0){
          this.drawChoices();
        } else {
          prioritySprite = null;
        }
      }
    } else {
      let conx = this.confirmX;
      let cony = this.confirmY;
      let conw = this.confirmCanvas.width;
      let conh = this.confirmCanvas.height;
      if ((clickX > conx) && (clickX < conx + conw)
      && (clickY > cony) && (clickY < cony + conh)) {
        prioritySprite = null;
        
//        console.log(this.choices[this.userSelected]);
        
        this.choiceAct.call(
          this.targetSprite,
          this.userSelected, this.choiceActArg
        );
      } else {
        let x = this.choicesX;
        let w = this.choicesCanvas.width;
        let h = windowFontSize + choicesTxtsGap;

        for(let i=0; i<this.choices.length; i++){
          let y = this.choicesY
            + i * (windowFontSize + choicesTxtsGap);
          
          if ((clickX > x) && (clickX < x + w)
          && (clickY > y) && (clickY < y + h)){
            this.userSelected = i;
            this.confirmY = y;
            break;
          }
        }
      }
    }
  }
}


function showMessage
  (spriteSaying, txt, posMode=0,
    choices=[], choiceAct=()=>{}, choiceActArg={}){
    let mes = new MessageWindow(spriteSaying, txt, posMode, choices, choiceAct, choiceActArg);
    
    prioritySprite = mes;
}
