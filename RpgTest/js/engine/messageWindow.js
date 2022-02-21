'use strict'

/**
 * スプライトに関してのクラス
 */
class MessageWindow {

  constructor(txt, targetSprite, fontSize = 20) {
  //this.txt = txt;
    this.targetSprite = targetSprite;
    
    this.preCanvas = document.createElement('canvas');
    this.preCanvas.width = canvas.width;
    this.preCanvas.height = canvas.height / 3;
    
    const preCtx = this.preCanvas.getContext('2d');

    //塗りつぶす色は白';
    preCtx.fillStyle = 'black'; 
    preCtx.fillRect(0, 0, this.preCanvas.width, this.preCanvas.height);

    //枠は青っぽい
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
    
    
  // preCtx.fillText(this.txt, 5, 5, this.preCanvas.width);
    
  } //constructor() 終了
  
  setx(x){
    this.x = x;
  }

  sety(y){
    this.y = y;
  }
  
  preRenderingBoard() {
  }


  /**Gameクラスのメインループからずっと呼び出され続ける
   *
   * 引数
   * canvas : 紙（キャンバス）
   */
  update(canvas) {
    //画像などを画面に表示するためのメソッドを呼び出す
    this.render(canvas);
  } //update() 終了
  
  /**
   * 画像などを画面に表示するためのメソッド
   *
   * 引数
   * canvas : 紙（キャンバス）
   */
  render(canvas) {
    /*
      let x = spriteSaying.x;
      let y = spriteSaying.y;
      let w = spriteSaying.width;
*/

    let dy;
    let targetY = this.targetSprite.y;
    if(targetY < this.preCanvas.height + 16){
      dy = canvas.height - this.preCanvas.height;
    } else {
      dy = 0;
    }
    
      

    
    
    const ctx = canvas.getContext('2d');

    ctx.drawImage(this.preCanvas, 
      0, dy, this.preCanvas.width, this.preCanvas.height);
  } //render() 終了
  
  clicked(){
    prioritySprite = null;
  }

}


function showMessageWindow(txt, spriteSaying){
  prioritySprite = new MessageWindow(txt ,spriteSaying);
}
