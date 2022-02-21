'use strict'

/**
 * スプライトに関してのクラス
 */
class MessageWindow {

  constructor(txt, x, y) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    
    this.preCanvas = document.createElement('canvas');
    this.preCanvas.width = canvas.width;
    this.preCanvas.height = canvas.height / 3;
    
    const preCtx = this.preCanvas.getContext('2d');
    
    /*
    //塗りつぶす色は白';
    preCtx.fillStyle = 'rgba(255,255,255,0.99)'; 
    preCtx.fillRect(this.margin, this.margin + this.nameHeight, this.windowWidth, this.windowHeight);

    //枠は青っぽい
    preCtx.strokeStyle = 'rgba(125,125,255,0.99)';
    preCtx.strokeRect(this.margin, this.margin + this.nameHeight, this.windowWidth, this.windowHeight);
*/
    preCtx.fillStyle = "black";
    preCtx.font = "30px 'ＭＳ ゴシック'";
    preCtx.textAlign = "left";
    preCtx.textBaseline = "top";
    preCtx.fillText(this.txt, 20, 75, 200);
    console.log(123456);
    
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(this.preCanvas, 
      0, 0, this.preCanvas.width, this.preCanvas.height);

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
    const ctx = canvas.getContext('2d');
    
  // ctx.drawImage(this.preCanvas, 0, 0, this.preCanvas.width, this.preCanvas.height, 0, 0);


    
  } //render() 終了
  
  clicked(){
    prioritySprite = null;
  }

}


function showMessageWindow(txt, spriteSaying){
  let x = spriteSaying.x;
  let y = spriteSaying.y;
  let w = spriteSaying.width;

  prioritySprite = new MessageWindow(txt , x+w, y);
}
