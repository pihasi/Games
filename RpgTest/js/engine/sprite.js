'use strict'

/**
 * スプライトに関してのクラス
 */
class Sprite {

  /**
   * 引数
   * img : 画像ファイルまでのパス
   * width : 画像の表示する範囲（横幅）
   * height : 画像の表示する範囲（縦幅）
   */
  constructor(img, width, height) {
    //this.imgに、あなたは画像ですよ、と教える
    this.img = new Image();
    //this.img.srcに画像ファイルまでのパスを代入
    this.img.src = img;
    //画像の初期位置
    this.x = this.y = 0;
    //引数widthが指定されていない場合、64を代入
    this.width = width || 64;
    this.height = height || 64;
    
    this.actions =[];
  } //constructor() 終了
  
  setx(x){
    this.x = x;
  }

  sety(y){
    this.y = y;
  }
  
  addAction(action){
    this.actions.push(action);
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
    //キャンバスの外にスプライトがあるとき、ここでこのメソッドを終了する
    if (this.x < -1 * this.width || this.x > canvas.width) return;
    if (this.y < -1 * this.height || this.y > canvas.height) return;

    //画家さん（コンテキスト）を呼ぶ
    const _ctx = canvas.getContext('2d');
    //画家さんに、絵を描いてとお願いする
    _ctx.drawImage(
      this.img,
      this.x, this.y, this.width, this.height /*,
      this.x,
      this.y,
      this.width,
      this.height */
    );
  } //render() 終了
  
  clicked(){
    for(let i=0; i<this.actions.length; i++){
      this.actions[i].call(this);
    }
    // prioritySprite = new MessageWindow("test da yo", this.x+this.width, this.y);
  }

}