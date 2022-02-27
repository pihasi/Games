'use strict'

class Sprite {

  constructor(img,
    xInit=0, yInit=0, clickedAction=()=>{},
    data={}, action=()=>{},
    width=64, height=64) {
      this.img = new Image();
      this.img.src = img;
      this.xInit = xInit;
      this.yInit = yInit;
      this.xOffset = 0;
      this.yOffset = 0;
      this.width = width || 64; 
      this.height = height || 64;
      
      this.clickedAction = clickedAction;
      this.data = data;
      this.action = action;
  }
  
  setxy(x, y){
    this.setx(x);
    this.sety(y);
  }
  
  setx(x){
    this.xInit = x;
  }

  sety(y){
    this.yInit = y;
  }
  
  get x(){
    return this.xInit + this.xOffset;
  }
  
  get y(){
    return this.yInit + this.yOffset;
  }
  
  setClickedAction(clickedAction){
    this.clickedAction = clickedAction;
  }

  setAction(action){
    this.action = action;
  }


  update(canvas) {
    this.doing();
    this.render(canvas);
  }
  
  doing(){
    this.action.call(this);
  }

  render(canvas) {
    if (this.x < -1 * this.width || this.x > canvas.width) return;
    if (this.y < -1 * this.height || this.y > canvas.height) return;

    const _ctx = canvas.getContext('2d');
    _ctx.drawImage(
      this.img,
      this.x, this.y, this.width, this.height
    );
  }
  
  clicked(clickX, clickY){
    this.clickedAction.call(this, clickX, clickY);
  }
}