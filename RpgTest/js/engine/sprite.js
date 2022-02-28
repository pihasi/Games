'use strict'

class Sprite {

  constructor(
    img, xInit=0, yInit=0,
    clickedAction=()=>{},
    motions=[], data={},
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

      this.motions = motions;
      if( this.motions.length > 0){
        this.startMoving(0);
      }
      
      this.data = data;
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
    this.moving();
    this.render(canvas);
  }
  
  startMoving(idx){
    if(!(idx < this.motions.length)){
      idx = 0;
    }
    this.idxMotion = idx;
    
    this.startMovingTime = Date.now();
  }
  
  moving(){
    if(this.motions.length > 0){
      let motion = this.motions[this.idxMotion];
      
      let period = motion[0];
      let destX = motion[1];
      let destY = motion[2];
      
      //jump = motion[3];
      let destJump;
      if(motion.length > 3){
        destJump = motion[3];
      } else {
        destJump = 0;
      }
      
      
      let elapsedTime
        = Date.now() - this.startMovingTime;
      if(elapsedTime < period){
        let phase = elapsedTime / period;
        
        let currentJump
          = destJump * Math.sin(Math.PI * phase) * (-1);
        
        this.xOffset
          = destX *(phase);
        this.yOffset
          = destY *(phase) + currentJump;
      } else {
        this.xInit += destX;
        this.yInit += destY;

        this.xOffset = 0;
        this.yOffset = 0;
        
        if(motion.length < 5){
          this.startMoving(this.idxMotion + 1);
        } else {
          let proc = motion[4];
            
          proc.call(this);
        }
      }
    }
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