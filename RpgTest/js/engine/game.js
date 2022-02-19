'use strict'

/**
 * ゲームづくりの基本となるクラス
 */
class Game {

  /**
   * 引数
   * width : ゲームの横幅
   * height : ゲームの縦幅
   */
  constructor(width, height) {
    //canvas要素を作成
    this.canvas = document.createElement('canvas');
    //作成したcanvas要素をbodyタグに追加
    document.body.appendChild(this.canvas);
    //canvasの横幅（ゲームの横幅）を設定。もし横幅が指定されていなければ320を代入
    this.canvas.width = width || 320;
    //canvasの縦幅（ゲームの縦幅）を設定。もし縦幅が指定されていなければ320を代入
    this.canvas.height = height || 320;
    
    this.backGround = null;

    //ゲームに登場する全てのもの（オブジェクト）を入れるための配列
    this.objs = [];
  } //constructor() 終了
  
  setBackGround(img){
    if( img != null) {
      this.backGround = new Image();
      this.backGround.src = img;
    } else {
      this.backGround = null;
    }
  }

  /**
   * startメソッドを呼び出すことで、メインループが開始される
   */
  start() {
    //メインループを呼び出す
    this._mainLoop();
    
    this.canvas.addEventListener("click", function(e){
    	  let clickX = e.pageX;
    	  let clickY = e.pageY;
    	  
        for (let i = 0; i < this.objs.length; i++) {
          let spriteX = this.objs[i].x;
          if(clickX < spriteX) continue;
          
          let spriteW = this.objs[i].width;
          if(clickX > spriteX + spriteW) continue;
          
          let spriteY = this.objs[i].y;
          if(clickY < spriteY) continue;
          
          let spriteH = this.objs[i].height;
          if(clickY > spriteY + spriteH) continue;
          
          this.objs[i].clicked();
          break;
        }
    
    });
  }
    
  


  /**
   * メインループ
   */
  _mainLoop() {
    //画家さん（コンテキスト）を呼ぶ
    const ctx = this.canvas.getContext('2d');
    
    if(this.backGround == null) {
      //塗りつぶしの色に、黒を指定する
      ctx.fillStyle = '#000000';
      //左上から、画面のサイズまでを、塗りつぶす
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      ctx.drawImage(this.backGround,0,0,
        this.canvas.width, this.canvas.height);
    }
    //ゲームに登場する全てのもの（オブジェクト）の数だけ繰り返す
    for (let i = 0; i < this.objs.length; i++) {
      //スプライトやテキストなど、すべてのオブジェクトのupdateメソッドを呼び出す
      this.objs[i].update(this.canvas);
    }

    //自分自身（_mainLoop）を呼び出して、ループさせる
    requestAnimationFrame(this._mainLoop.bind(this));
  } //_mainLoop() 終了

  /**
   * オブジェクトをゲームに追加できるようになる、addメソッドを作成
   *
   * 引数
   * obj : 追加したいオブジェクト
   */
  add(obj) {
    //this.objs配列の末尾に、objの値を追加
    this.objs.push(obj);
  } //add() 終了

}


