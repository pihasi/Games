'use strict'

class MessageWindow {

  constructor(txt, targetSprite, fontSize = 20) {
    this.targetSprite = targetSprite;
    
    this.preCanvas = document.createElement('canvas');
    this.preCanvas.width = canvas.width;
    this.preCanvas.height = canvas.height / 3;
    
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
  

  update(canvas) {
    this.render(canvas);
  }
  
  render(canvas) {
    let dy;
    let targetY = this.targetSprite.y;
    if(targetY < this.preCanvas.height + 16){
      dy = canvas.height - this.preCanvas.height;
    } else {
      dy = 0;
    }

    const ctx = canvas.getContext('2d');

    ctx.drawImage(this.preCanvas, 
      0, dy,
      this.preCanvas.width, this.preCanvas.height
    );
  }
  
  clicked(){
    prioritySprite = null;
  }

}


function showMessageWindow(txt, spriteSaying){
  prioritySprite = new MessageWindow(txt ,spriteSaying);
}
