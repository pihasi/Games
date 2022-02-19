'use strict'

//ブラウザがページを完全に読みこむまで待つ
addEventListener('load', () => {

  //変数gameに、あなたはゲームですよ、と教える
  const game = new Game();

  const protagonist = new Sprite('pic/hero.png');
  protagonist.setx(64*2);
  protagonist.sety(64*4);
  game.add(protagonist);
  
  const house = new Sprite('pic/house.png');
  house.setx(64*2);
  house.sety(0);
  game.add(house);

  const baby = new Sprite('pic/baby-smile-male.png');
  baby.setx(64*2);
  baby.sety(64*2);
  game.add(baby);

  
  
  
  
  game.setBackGround("pic/roadOnGrass.png");

  //gameに、ゲームをスタートして、とお願いする
  game.start();

});
