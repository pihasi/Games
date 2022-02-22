'use strict'

const images = {
  hero:"pic/hero.png",
  house:"pic/house.png",
  baby_smile_male:"pic/baby-smile-male.png",
  slime:"pic/monster/slime.png",
  mummy:"pic/monster/mummy.png",
  arrowRight:"pic/info/rightArrow.png",
  
  caveEntrance:"pic/place/caveEntrance.png",
  oldMan:"pic/oldMan.png",
  woman_exercise:"pic/woman-exercise.png",
  arrowReturn:"pic/info/returnArrow.png"
}

function preLoad(){
  
}


function testMap(){
  isNeedUpdate = false;
  resetScene();

  setBackGround("pic/place/roadOnGrass.png");


  const protagonist = new Sprite(images.hero);
  protagonist.setx(64*2);
  protagonist.sety(64*4);
  addSprite(protagonist);
  
  addSimpleCharacter(images.house,
    64*2, 0,
    "僕は家だよ！！！");

  addSimpleCharacter(images.baby_smile_male,
    64*2, 64*2,
    "我輩は赤ちゃんである。\n名前はまだない");

  addSimpleCharacter(images.slime,
    0, 64,
    "ぷよーん\nぷよよよ〜ん\nぼよよーーん！");

  addSimpleCharacter(images.mummy,
    64*3, 64*4,
    "干からびそうなう");
    
  const arrowRight
    = new Sprite(images.arrowRight);
  arrowRight.setx(64*4);
  arrowRight.sety(64);
arrowRight.addAction(caveEntrance);
  addSprite(arrowRight);

  startCanvasUpdate();
}



function caveEntrance(){
  isNeedUpdate = false;
  resetScene();


  setBackGround(images.caveEntrance);


  const protagonist = new Sprite(images.hero);
  protagonist.setx(0);
  protagonist.sety(64*3);
  addSprite(protagonist);
  
  addSimpleCharacter(images.oldMan,
    64*3, 64*4,
    "入らない方がいいぞよ");

  addSimpleCharacter(images.woman_exercise,
    64*1, 64*4,
    "わぁ！超楽しそうな洞窟！！");

  const arrowReturn
    = new Sprite(images.arrowReturn);
  arrowReturn.setx(0);
  arrowReturn.sety(64);
  arrowReturn.addAction(testMap);
  addSprite(arrowReturn);

  startCanvasUpdate();

}

