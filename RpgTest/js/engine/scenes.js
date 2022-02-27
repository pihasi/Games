'use strict'

function firstSceneStart(){
  let firstScene = new testMap();
  
  firstScene.start();
}


const images = {
  arrowUp:"./pic/info/upArrow.png",
  arrowLeft:"./pic/info/leftArrow.png",
  arrowRight:"./pic/info/rightArrow.png",
  arrowReturn:"./pic/info/returnArrow.png",
  
  hero:"./pic/hero.png",

  roadOnGrass:"./pic/place/roadOnGrass.png",
  house:"./pic/house.png",
  baby_smile_male:"./pic/baby-smile-male.png",
  slime:"./pic/monster/slime.png",
  mummy:"./pic/monster/mummy.png",
  
  caveEntrance:"./pic/place/caveEntrance.png",
  oldMan:"./pic/oldMan.png",
  woman_exercise:"./pic/woman-exercise.png",
  
  ghost:"./pic/monster/ghost.png",
  man_walk:"./pic/man-walk.png",
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
    
    addSprite( new Sprite(
      images.house, 64*3, 64*0.5
      ,function(){
        showMessage(this, 
          ["僕は世にも珍しい\n動ける家だよ。",
           "凄いでしょ。"]
        );
      },
      {
        motions:[
          {x:-100, y:0},
          {x:100, y:0}
        ],
        period:1500,
        idxMotion:0,

        get periodStartTime(){
          if(! this.hasOwnProperty("_periodStartTime")){
          this._periodStartTime = Date.now();
          }
    
          return this._periodStartTime;
        },
        
        get elapsedTime(){
          return Date.now() - this.periodStartTime;
        },
        
        set periodStartTime(val){
          this._periodStartTime = val;
        }
      },
      function(){
        let param = this.data;
        let motion = param.motions[param.idxMotion]
        
        let elapsedTime = param.elapsedTime;
        if(elapsedTime < param.period){
          this.xOffset
            = motion.x *(elapsedTime/param.period);
          this.yOffset
            = motion.y *(elapsedTime/param.period);
        } else {
          this.xInit += motion.x;
          this.yInit += motion.y;

          this.xOffset = 0;
          this.yOffset = 0;
          
          param.idxMotion++
          if(!(param.idxMotion < param.motions.length))
            { param.idxMotion = 0 }
          
          param.periodStartTime = Date.now();
        }
      }
    ));
  
    addSprite( new Sprite(
      images.baby_smile_male, 64*2, 64*2,
      function(){
        showMessage(this,
          "我輩は赤ちゃんである。\n名前はまだ無い。");
      }
    ));
  
    addSprite(new Sprite(
      images.slime, 0, 64,
      function(){
        showMessage(this,
          "ぷよーん\nぷよーん\nぷよよよ〜ん\nぼよよーーん！",
          0, ["殴る", "蹴る", "何もしない"],
          function(selected){
            switch (selected) {
            	case 0:
            	  showMessage(this, "ぴえーん！\n"
            	  + "殴るなんてひどいいいいぃ！");
            		break;
            	case 1:
            	  showMessage(this,
            	    "蹴るんじゃねええええ！\n"
            	    + "ぐあああああああ！！！！");
            		break;
            	default:
            }
          }
        );
      }
    ));
  
    addSprite( new Sprite(
      images.mummy, 64*3, 64*4, function(){
        if(playData.checkDurGame(
        "gaveWaterToMummy", true)){
          showMessage(this,
            "水飲んでも干からびそうなう");
        } else if(playData.checkDurGame(
        "gaveWaterToMummy", false)){
          showMessage(this, "へんじがない。\n" +
            "ただの　しかばね　のようだ。");
        } else {
          if(! playData.checkDurGame("gotWater") ){
            showMessage(this,
              "洞窟に水忘れちゃったなー\n"
              + "誰か取ってきてくれないかなー\n"
              + "干からびそうなんだよなー");
          } else {
            showMessage(this,
              "洞窟に水忘れちゃったなー\n"
              + "誰か取ってk...\n"
              + "それ俺の水じゃん！", 0,
              ["渡す", "イッキ飲み"],
              function(selected){
                switch(selected){
                  case 0:
                    showMessage(this,
                      "ありがと〜\nこれで潤う！");
                    playData.durGame.gaveWaterToMummy
                      = true;
                    break;
                  default:
                    showMessage(this,
                      "なんでいきなり飲むんだよ！\n"
                      +"俺の水だぞ！！！\n"
                      +"うぎゃー！ひ、干からb...");
                    playData.durGame.gaveWaterToMummy
                      = false;
                }
              }
            );
          }
        }
      }
    ));
    
      
    addSprite( new Sprite(
      images.arrowRight, 64*4, 64,
      function(){
        let scene = new caveEntrance();
        scene.start();
      }
    ));
  }
}



class caveEntrance extends createScene{
  constructor(){
    super(images.caveEntrance);
    
    const protagonist = new Sprite(images.hero);
    protagonist.setx(0);
    protagonist.sety(64*3);
    addSprite(protagonist);
    
    
    addSprite( new Sprite(
      images.oldMan, 64*3, 64*4,
      function(){
        showMessage(this, "入らない方がいいぞよ");
      }
    ));
  
  
    addSprite( new Sprite(
      images.woman_exercise, 64*1, 64*4,
      function(){
        showMessage(this,"わぁ！超楽しそうな洞窟！！");
      }
    ));
  
    addSprite( new Sprite(
      images.arrowLeft, 0, 64,
      function(){
        let scene = new testMap();
        scene.start();
      }
    ));
    
    addSprite( new Sprite(
      images.arrowUp, 64*2, 64*2.5,
      function(){
        let scene = new insideCave();
        scene.start();
      }
    ));
  }
}



class insideCave extends createScene{
  constructor(){
    super(null);
    
    addSprite( new Sprite(
      images.arrowReturn,
      64*2, 64*4,
      function(){
        let scene = new caveEntrance();
        scene.start();
      }
    ));
      
    addSprite( new Sprite(
      images.man_walk, 64*3, 64*2,
      function(){
        let txt;
        if(! playData.checkDurGame("gotWater") ){
          txt = "あそこのミイラが怖いよー";
        } else{
          txt ="なんだミイラって結構弱いんだな\n" +
            "俺でも倒せそう";
        }
        showMessage(this, txt, 2);
      }
    ));
    
    addSprite(new Sprite(
      images.mummy, 64*1, 64*0,
      function(){
        if (! playData.checkDurGame("gotWater") ){
          showMessage(this,
            "ねんがんの　水をてにいれたぞ！", 0, 
　　        ["そう　かんけいないね",
             "殺してでも　うばいとる",
             "ゆずってくれ　たのむ！！"],
            function(selected){
              switch(selected){
                case 0:
                  break;
                case 1:
                  showMessage(this,
                    "な　なにをする　きさまー！");
                  playData.durGame.gotWater = true;
                  break;
                default:
                  showMessage(this,
                    "だめだ！！　いくらつまれても\n"+
                    "ゆずれん");
              }
            }
          );
        } else {
          showMessage(this, "へんじがない。\n" +
            "ただの　しかばね　のようだ。");
        }
      }
    ));
    
    addSprite( new Sprite(
      images.ghost, 64*4, 0,
      function(){
        showMessage(this, "ひっひっひっひ");
        killSprite(this);
      }
    ));
    
    addSprite( new Sprite(
      images.ghost, 64*0.5, 64*3.5,
      function() {
        showMessage(this, "ふっふっふっふ");
        killSprite(this);
      }
    ));
  }
}

