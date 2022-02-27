'use strict'

class Sprite {

  constructor(img,
    x=0, y=0, action=()=>{}, width=64, height=64) {
      this.img = new Image();
      this.img.src = img;
      this.x = x;
      this.y = y;
      this.width = width || 64; 
      this.height = height || 64;
      
      this.action = action;
  }
  
  setxy(x, y){
    this.setx(x);
    this.sety(y);
  }
  
  setx(x){
    this.x = x;
  }

  sety(y){
    this.y = y;
  }
  
  addAction(action){
    this.action = action;
  }


  update(canvas) {
    this.render(canvas);
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
    this.action.call(this);
  }
}