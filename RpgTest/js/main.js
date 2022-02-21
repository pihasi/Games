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

  const slime = new Sprite('pic/slime.png');
  slime.setx(0);
  slime.sety(64);
  slime.addAction( function(){
    showMessageWindow("ぷよーん\nぷよよよ〜ん\nぼよよーーん！", this)
  });
  addSprite(slime);

  const mummy = new Sprite('pic/mummy.png');
  mummy.setx(64*3);
  mummy.sety(64*4);
  mummy.addAction( function(){
    showMessageWindow("干からびそうなう", this)
  });
  addSprite(mummy);

  
  
  setBackGround("pic/roadOnGrass.png");

  startCanvasUpdate();

});
