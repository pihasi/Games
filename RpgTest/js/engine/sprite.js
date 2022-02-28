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
      this.width = width || 64; 
      this.height = height || 64;

      this.clickedAction = clickedAction;
      
      this.setMotions(motions);

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
    return this.xInit + (this.xOffset || 0);
  }
  
  get y(){
    return this.yInit + (this.yOffset || 0);
  }
  
  setMotions(motions){
    this.motions = motions;
    if( this.motions.length > 0){
      
      // motionsが配列の配列で渡されなかった時の対策
      if(! Array.isArray(this.motions[0])){
        this.motions = [this.motions];
      }
        
      this.startMoving();
    }
  }
  
  setClickedAction(clickedAction){
    this.clickedAction = clickedAction;
  }

  update(canvas) {
    this.moving();
    this.render(canvas);
  }
  
  startMoving(idx=0){
    if(!(idx < this.motions.length)){
      idx = 0;
    }
    this.idxMotion = idx;
    
    this.setxy(this.x, this.y);
    this.xOffset = 0;
    this.yOffset = 0;

    
    this.startMovingTime = Date.now();
  }
  
  moving(){
    if(this.motions.length > 0){
      let motion = this.motions[this.idxMotion];
      
      let period = motion[0];
      let destX = motion[1];
      let destY = motion[2];
      
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
        this.xOffset = destX;
        this.yOffset = destY;
        
        if(motion.length < 5){
          this.startMoving(this.idxMotion + 1);
        } else {
          console.log(motion);
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