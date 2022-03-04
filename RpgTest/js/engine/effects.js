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





class explosionFire extends actionManager{
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
    this.addChildSprite( new effectSprite(
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


