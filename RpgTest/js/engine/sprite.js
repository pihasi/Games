'use strict'

class Sprite {

  constructor(img,
    x=0, y=0, width=64, height=64,
    action=[]) {
      this.img = new Image();
      this.img.src = img;
      this.x = x;
      this.y = y;
      this.width = width || 64; 
      this.height = height || 64;
      
      this.actions = action;
  }
  
  setx(x){
    this.x = x;
  }

  sety(y){
    this.y = y;
  }
  
  addAction(action){
    this.actions.push(action);
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
  
  clicked(){
    for(let i=0; i<this.actions.length; i++){
      this.actions[i].call(this);
    }
  }
}