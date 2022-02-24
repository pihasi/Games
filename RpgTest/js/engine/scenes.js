'use strict'

const images = {
  arrowUp:"./pic/info/upArrow.png",
  
  roadOnGrass:"./pic/place/roadOnGrass.png",
  hero:"./pic/hero.png",
  house:"./pic/house.png",
  baby_smile_male:"./pic/baby-smile-male.png",
  slime:"./pic/monster/slime.png",
  mummy:"./pic/monster/mummy.png",
  man_walk:"./pic/man-walk.png",
  arrowRight:"./pic/info/rightArrow.png",
  
  caveEntrance:"./pic/place/caveEntrance.png",
  oldMan:"./pic/oldMan.png",
  woman_exercise:"./pic/woman-exercise.png",
  arrowReturn:"./pic/info/returnArrow.png",
  
  ghost:"./pic/monster/ghost.png"
}



function createPromisesForPreLoad(){
  let promises =[];
  
  Object.values(images).forEach( path => {
    let promise = new Promise((resolve, reject) =>{
      let img = new Image();
    
      img.addEventListener("load",() =>{resolve();},
        { passive:true, once:true });
      img.addEventListener("error",() =>{
        reject("load error: " + path);},
        { passive:true, once:true });

      img.src = path;
    });
      
    promises.push(promise);
  });
    
    
  return promises;
}





class createScene {
  constructor(backGround){
    destructCurrentScene();
    
    setBackGround(backGround);
  }

  start(){
    playData.oneScene = {};
    startCanvasUpdate();
  }
}

class testMap extends createScene{
  constructor(){
    super(images.roadOnGrass);
    
    const protagonist = new Sprite(images.hero);
    protagonist.setx(64*2);
    protagonist.sety(64*4);
    addSprite(protagonist);
    
    addSimpleCharacter(images.house,
      64*2, 0,
      ["僕は家だよ！！！",
      "入らないでね。\n絶対だよ？"]);
  
    addSimpleCharacter(images.baby_smile_male,
      64*2, 64*2,
      "我輩は赤ちゃんである。\n名前はまだない");
  
    addSimpleCharacter(images.slime,
      0, 64,
      "ぷよーん\nぷよよよ〜ん\nぼよよーーん！");
  
    addSprite( new Sprite(
      images.mummy, 64*3, 64*4, function(){
        let txt;
        if(! playData.checkDurGame("gaveWaterToMummy")){
          if(! playData.checkDurGame("gotWater") ){
            	txt =
                "洞窟に水忘れちゃったなー\n" +
                "誰か取ってきてくれないかなー\n" +
                "干からびそうなんだよなー";
            } else {
              txt =
                "洞窟に水忘れちゃったなー\n" +
                "誰か取ってk...\n" +
                "それ俺の水じゃん！ありがと！";
              
              playData.durGame.gaveWaterToMummy = true;
            }
        } else {
          txt =  "水飲んでも干からびそうなう";
        }
        
        showMessageWindow(txt, this);
    }));
    
      
    const arrowRight
      = new Sprite(images.arrowRight);
    arrowRight.setx(64*4);
    arrowRight.sety(64);
    arrowRight.addAction(() => {
      let scene = new caveEntrance();
      scene.start();
    });
    addSprite(arrowRight);
  }
}



class caveEntrance extends createScene{
  constructor(){
    super(images.caveEntrance);
    
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
    arrowReturn.addAction( () => {
      let scene = new testMap();
      scene.start();
    });
    addSprite(arrowReturn);
    
    
    addSprite(new Sprite(
      images.arrowUp, 64*2, 64*2.5, () => {
        let scene = new insideCave();
        scene.start();
    }));
  }
}



class insideCave extends createScene{
  constructor(){
    super(null);
    
    addSprite(new Sprite(
      images.arrowReturn,
      64*2, 64*4, function(){
        let scene = new caveEntrance();
        scene.start();
    }));
      
    addSprite(new Sprite(
      images.man_walk,
      64*3, 64*2, function(){
        let txt;
        if(! playData.checkDurGame("gotWater") ){
          txt = "あそこのミイラが怖いよー";
        } else{
          txt ="なんだミイラって結構弱いんだな\n" +
            "俺でも倒せそう";
        }
        showMessageWindow(txt, this, ()=>{}, 2);
    }));
    
    addSprite(new Sprite(
      images.mummy,
      64*1, 64*0, function(){
        let txt;
        if (! playData.checkDurGame("gotWater") ){
          txt = "何をする！俺が見つけた水だぞ！\n" +
            "うぎゃー！ ひ、干からb...";
          
          playData.durGame.gotWater = true;
        } else {
          txt = "返事がない。\n" +
            "ただの屍のようだ。";
        }
        showMessageWindow(txt, this);
    }));
    
    addSprite( new Sprite(
      images.ghost,
      64*4, 0, function(){
        showMessageWindow("ひっひっひっひ", this);
        killSprite(this);
      }));
    
    addSprite(new Sprite(
      images.ghost,
      64*0.5, 64*3.5,
      function() {
        showMessageWindow("ふっふっふっふ", this);
        killSprite(this);
      }));
  }
}