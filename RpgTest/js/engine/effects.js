'use strict'


const effectImages = 
{
  explosionFire1:"./pic/effect/explosion/fire1.png",
  explosionFire2:"./pic/effect/explosion/fire2.png",
  explosionSmoke1:"./pic/effect/explosion/smoke1.png",
  explosionSmoke2:"./pic/effect/explosion/smoke2.png",
}




class effectSprite extends Sprite{
  constructor(img, xInit=0, yInit=0,
    width=64, height=64,
    actionArray=[], data={} ){
      
      super(img, xInit, yInit, ()=>{},
        actionArray, true, data,
        width, height);
  }
  
  //clickedが万が一呼ばれた時用
  clicked(){}
  
  destruct(){
    super.destruct();

    this.parent.generatedSprits.some(
      function(sprite, idx){
	      if (sprite === this){
	        this.parent.generatedSprits.splice(idx,1);
	      }
      }
    );
    
  }
  
}




class effectManager{
  constructor( actionArray=[] ){
    this.isIgnoreClick = true;
    
    this.generatedSprits = [];
    
    this.actions = [];
    
    this.addAction( actionArray );
  }
  
  //clickedが万が一呼ばれた時用
  clicked(){}
  
  
  addEffectSprite(sprite){
    this.generatedSprits.push(sprite);
    
    sprite.parent = this;
    
    addSprite(sprite);
  }
  
/*
actions [
  (action) {
    idxDoing
    startDoingTime
    elapsedTime
    
    doings [
      (doing) {
        period
        processFunc
      }
    ]
  }
]
*/
  addAction( actionArray=[] ){
    if( actionArray.length > 0 ){
      
      if( ! Array.isArray(actionArray[0]) ){
        actionArray = [ actionArray ];
      }


      let action = {};

      action.doings = [];
      for(let i=0; i< actionArray.length; i++){
        let doingArray = actionArray[i];

        let doing = {};
        
        doing.period = doingArray[0];
        doing.afterFunc = doingArray[1];
        
        if( doingArray.length > 2 ){
          doing.phaseFunc = doingArray[2];
        } else {
          doing.phaseFunc = ()=>{};
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
  
  update(){
    this.processingActions();
  }
  
  processingActions(){
    for(let idxAction=0; idxAction< this.actions.length; idxAction++){
      let action = this.actions[idxAction];
      
      let elapsedTime
        = Date.now() - action.startDoingTime;
        
      let idxDoing = action.idxDoing;
      let doing = action.doings[ idxDoing ];


      if(elapsedTime < doing.period){
        let phase = elapsedTime / doing.period;

        doing.phaseFunc.call(this, phase);
      } else {
        doing.afterFunc.call(this);

        idxDoing += 1;
        if( idxDoing < action.doings.length ){
          this.startDoing( action, idxDoing);
        } else {
          this.deleteOneAction(action);
        }
      }
    }
  }
  
  
  
  deleteOneAction(target){
    let actions = this.actions;
    
    actions.some( function(action, idx){
	    if (action === target) actions.splice(idx,1);
    });
    
    
    if( actions.length == 0 ){
      this.destruct();
    }
  }
  
  
  
  destruct(){
    if( prioritySprite === this ){
      prioritySprite = null;
    }
    
    this.deleteAllActions(); //killするのでたぶん不要だが念の為
    
    killSprite(this);
  }
  
  destructAllChildren(){
    for( let sprite of this.generatedSprits){
      sprite.destruct();
    }
  }
  
  deleteAllActions(){
    this.actions = [];
  }
}



class explosionFire extends effectManager{
  constructor(centerX=0, centerY=0, period=400){
    super();
    
    this.centerX = centerX;
    this.centerY = centerY;
    
    this.period = period;
    
    
    this.addAction([
      [-1, function(){ this.addFire1(-10,-10) } ],
      [100, function() { this.addFire1(10, 10) } ],
      [100, function() { this.addFire1(20, 30) } ],
      [100, function() { this.addFire1(-39, -30) } ],
      [100, function() { this.addFire1(-20, -50) } ]
    ]);
  }
  
  addFire1(xDelta, yDelta){
    this.addEffectSprite( new effectSprite(
      effectImages.explosionFire1,
      this.centerX + xDelta, this.centerY + yDelta,
      1, 1 ,
        [200, 0, 0, 
        function(doing, phase){
          this.width = 64 * phase;
          this.height = 64 * phase;
        },
        function(){
          this.destruct();
        }]
    ));
  }
}


