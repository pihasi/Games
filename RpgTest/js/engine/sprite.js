'use strict'

class Sprite {

  constructor(
    img, xInit=0, yInit=0,
    clickedAction=()=>{},
    actions=[], data={},
    width=64, height=64) {
      this.img = new Image();
      this.img.src = img;
      
      this.xInit = xInit;
      this.yInit = yInit;
      this.width = width || 64; 
      this.height = height || 64;

      this.clickedAction = clickedAction;
      
      this.setActions(actions);

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

  get centerX(){
    return this.x + this.width / 2;
  }
  
  get centerY(){
    return this.y + this.height / 2;
  }
  
  setActions(actions){
    this.actions = actions;
    if( this.actions.length > 0){
      
      // actionsが配列の配列で渡されなかった時の対策
      if(! Array.isArray(this.actions[0])){
        this.actions = [this.actions];
      }
        
      this.startDoing();
    }
  }
  
  deleteActions(){
    this.actions = [];
  }
  
  setClickedAction(clickedAction){
    this.clickedAction = clickedAction;
  }
  
  deleteClickedAction(){
    this.clickedAction = ()=>{};
  }

  update(canvas) {
    this.doing();
    this.render(canvas);
  }
  
  startDoing(idx=0){
    if(!(idx < this.actions.length)){
      idx = 0;
    }
    this.idxAction = idx;

    let action = this.actions[this.idxAction];
    let currentAction = {};
    currentAction.period = action[0];
    currentAction.destX = action[1];
    currentAction.destY = action[2];
    
    
    if( action.length > 3 ){
      currentAction.actionFunc = action[3];
    } else {
      currentAction.actionFunc
        = function(){ defaultMoving(); };
    }
    
    if( action.length > 4 ){
      currentAction.afterFunc = action[4];
    } else {
      currentAction.afterFunc
        = function(){ this.startDoing( this.idxAction + 1) };
    }
    
    this.currentAction = currentAction;
    
    this.setxy(this.x, this.y);
    this.xOffset = 0;
    this.yOffset = 0;

    this.startDoingTime = Date.now();
  }
  
  doing(){
    if(this.actions.length > 0){
      let elapsedTime
        = Date.now() - this.startDoingTime;
        
      if(elapsedTime < this.currentAction.period){
        console.log(this.img.src);
        this.currentAction.actionFunc.call(this);
      } else {
        this.xOffset = this.currentAction.destX;
        this.yOffset = this.currentAction.destY;
        
        this.currentAction.afterFunc.call(this);
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

function dafaultMoving( destJump=0 ){
    let period = this.currentAction.period;
    let destX = this.currentAction.destX;
    let destY = this.currentAction.destY;
    
    let elapsedTime
      = Date.now() - this.startMovingTime;
    let phase = elapsedTime / period;
    
    let currentJump
      = destJump * Math.sin(Math.PI * phase) * (-1);
    
    this.xOffset = destX * phase;
    this.yOffset = destY * phase + currentJump;
  }
