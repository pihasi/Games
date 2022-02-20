'use strict'

/**
 * スプライトに関してのクラス
 */
class MessageWindow {

  constructor(txt, x, y) {
    this.txt = txt;
    this.x = x;
    this.y = y;
  } //constructor() 終了
  
  setTxt(txt){
    this.txt = txt;
  }
  
  setx(x){
    this.x = x;
  }

  sety(y){
    this.y = y;
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
    const _ctx = canvas.getContext('2d');

  _ctx.fillStyle = "blue";
    _ctx.font = "30px 'ＭＳ ゴシック'";
    _ctx.textAlign = "left";
    _ctx.textBaseline = "top";
    
    _ctx.fillText(this.txt, 20, 75, 200);
      
    
    
  } //render() 終了
  
  clicked(){
    prioritySprite = null;
  }

}