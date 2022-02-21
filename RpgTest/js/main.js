'use strict'

//ブラウザがページを完全に読みこむまで待つ
addEventListener('load', () => {
  const protagonist = new Sprite('pic/hero.png');
  protagonist.setx(64*2);
  protagonist.sety(64*4);
  addSprite(protagonist);
  
  const house = new Sprite('pic/house.png');
  house.setx(64*2);
  house.sety(0);
  house.addAction( function(){
    showMessageWindow("僕は家だよ！！！", this)
  });
  addSprite(house);

  const baby = new Sprite('pic/baby-smile-male.png');
  baby.setx(64*2);
  baby.sety(64*2);
  baby.addAction( function(){
    showMessageWindow("我輩は赤ちゃんである。\n名前はまだない", this)
  });
  addSprite(baby);

  
  
  
  
  setBackGround("pic/roadOnGrass.png");

  startCanvasUpdate();

});
