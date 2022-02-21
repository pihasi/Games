'use strict'


function testMap(){
  isNeedUpdate = false;
  resetScene();

  setBackGround("pic/place/roadOnGrass.png");


  const protagonist = new Sprite('pic/hero.png');
  protagonist.setx(64*2);
  protagonist.sety(64*4);
  addSprite(protagonist);
  
  addSimpleCharacter("pic/house.png",
    64*2, 0,
    "僕は家だよ！！！");

  addSimpleCharacter("pic/baby-smile-male.png",
    64*2, 64*2,
    "我輩は赤ちゃんである。\n名前はまだない");

  addSimpleCharacter("pic/monster/slime.png",
    0, 64,
    "ぷよーん\nぷよよよ〜ん\nぼよよーーん！");

  addSimpleCharacter("pic/monster/mummy.png",
    64*3, 64*4,
    "干からびそうなう");
    
  const arrowRight
    = new Sprite("pic/info/rightArrow.png");
  arrowRight.setx(64*4);
  arrowRight.sety(64);
arrowRight.addAction(caveEntrance);
  addSprite(arrowRight);

  startCanvasUpdate();
}



function caveEntrance(){
  isNeedUpdate = false;
  resetScene();


  setBackGround("pic/place/caveEntrance.png");


  const protagonist = new Sprite('pic/hero.png');
  protagonist.setx(0);
  protagonist.sety(64*3);
  addSprite(protagonist);
  
  addSimpleCharacter("pic/oldMan.png",
    64*3, 64*4,
    "入らない方がいいぞよ");

  addSimpleCharacter("pic/woman-exercise.png",
    64*1, 64*4,
    "わぁ！超楽しそうな洞窟！！");

  const arrowReturn
    = new Sprite("pic/info/returnArrow.png");
  arrowReturn.setx(0);
  arrowReturn.sety(64);
  arrowReturn.addAction(testMap);
  addSprite(arrowReturn);

  startCanvasUpdate();

}

