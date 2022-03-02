'use strict'

class Sprite {

  constructor(
    img, xInit=0, yInit=0,
    clickedAction=()=>{},
    actionArray=[], data={},
    width=64, height=64) {
      this.img = new Image();
      this.img.src = img;
      
      this.xInit = xInit;
      this.yInit = yInit;

      this.width = width;
      this.height = height;

      this.clickedAction = clickedAction;
      
      this.actions = [];
      this.addAction(actionArray);

      this.data = data;
  }
  
  
  
  setxy(x, y){
    this.x = x;
    this.y = y;
  }
  
  set x(x){
    this.xInit = x - this.xOffset;
  }

  set y(y){
    this.yInit = y - this.yOffset;
  }
  
  get x(){
    return this.xInit + this.xOffset;
  }
  
  get y(){
    return this.yInit + this.yOffset;
  }
  
  

  setCenterXY(cx, cy){
    this.centerX = cx;
    this.centerY = cy;
  }
  
  set centerX(cx){
    this.x = cx - this.width / 2;
  }
  
  set centerY(cy){
    this.y = cy - this.height / 2;
  }

  get centerX(){
    return this.x + this.width / 2;
  }
  
  get centerY(){
    return this.y + this.height / 2;
  }
  
  
  
  get xOffset(){
    let xOffset = 0;
    
    for( let action of this.actions){
      xOffset += action.xOffset;
    }
    return xOffset;
  }
  
  get yOffset(){
    let yOffset = 0;
    
    for( let action of this.actions){
      yOffset += action.yOffset;
    }
    
    return yOffset;
  }


/*
actions [
  (action) {
    xOffset
    yOffset

    idxDoing
    startDoingTime
    elapsedTime
    
    doings [
      (doing) {
        period
        destX
        destY
        destJump
        
        processFunc
        afterFunc
      }
    ]
  }
]
*/
  

  addAction(actionArray){
    if( actionArray.length > 0 ){
      
      if( ! Array.isArray(actionArray[0]) ){
        actionArray = [ actionArray ];
      }


      let action = {};
      action.xOffset = 0;
      action.yOffset = 0;

      action.doings = [];
      for(let i=0; i< actionArray.length; i++){
        let doingArray = actionArray[i];
        
        let doing = {};
        
        doing.period = doingArray[0];
        doing.destX = doingArray[1];
        doing.destY = doingArray[2];

        if( doingArray.length > 3 ){
          if( typeof doingArray[3] == "function" ){
            doing.processFunc = doingArray[3];
          } else {
            doing.destJump = doingArray[3];
            doing.processFunc = this.defaultMoving;
          }
        } else {
          doing.destJump = 0;
          doing.processFunc = this.defaultMoving;
        }
        
        if( doingArray.length > 4 ){
          doing.afterFunc = doingArray[4];
        } else {
          doing.afterFunc
            = function( action, idxDoing ){
                this.startDoing( action, idxDoing +1);
            };
        }
        
        
        action.doings.push(doing);
      }

      this.startDoing(action, 0);


      this.actions.push(action);
    }


    return this;
  }

  startDoing(action, idxDoing=0){
    if( ! (idxDoing < action.doings.length) ){
      idxDoing = 0;
    }

    action.idxDoing = idxDoing;
    action.startDoingTime = Date.now();
  }
  
  defaultMoving( doing, phase ){
    let destX = doing.destX;
    let destY = doing.destY;
    let destJump = doing.destJump;
    
    let currentJump
      = (-1) * destJump * Math.sin(Math.PI * phase);

    
    let xOffset = destX * phase;
    let yOffset = destY * phase + currentJump;
    
    return [xOffset, yOffset];
  }
  
  deleteActions(){
    this.actions = [];

    this.xInit += this.xOffset;
    this.yInit += this.xOffset;
  }


  
  setClickedAction(clickedAction){
    this.clickedAction = clickedAction;
  }
  
  deleteClickedAction(){
    this.clickedAction = ()=>{};
  }
  
  

  update(canvas) {
    this.processingActions();
    this.render(canvas);
  }
  
  processingActions(){
    for(let idxAction=0; idxAction< this.actions.length; idxAction++){
      let action = this.actions[idxAction];
      
      action.elapsedTime
        = Date.now() - action.startDoingTime;
        
      let idxDoing = action.idxDoing;
      let doing = action.doings[ idxDoing ];


      if(action.elapsedTime < doing.period){
        let phase = action.elapsedTime / doing.period;

        let returnXY =
        doing.processFunc.call(this, doing, phase);

        action.xOffset = returnXY[0] || 0;
        action.yOffset = returnXY[1] || 0;

      } else {
        this.xInit += doing.destX;
        this.yInit += doing.destY;
        
        action.xOffset = 0;
        action.yOffset = 0;
        
        doing.afterFunc.call(this, action, idxDoing);
      }
    }
  }
  
  render(canvas) {
    let x = this.x;
    let y = this.y;

    if (x < -1 * this.width || x > canvas.width) return;
    if (y < -1 * this.height || y > canvas.height) return;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      this.img,
      x, y, this.width, this.height
    );
  }
  
  
  
  clicked(clickX, clickY){
    this.clickedAction.call(this, clickX, clickY);
  }
}

