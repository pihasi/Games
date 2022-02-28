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
  
  grass:"./pic/place/grass.png",
  buildingp:"./pic/building.png",
  building_broken:"./pic/building-broken.png",
  canon:"./pic/canon.png",
  missile:"./pic/monster/misile.png"
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
      [
        [1500, -100, 0],
        [1500, 100, 0],
      ]
    ));
  
    addSprite( new Sprite(
      images.baby_smile_male, 64*2, 64*2,
      function(){
        showMessage(this,
          "我輩は赤ちゃんである。\n名前はまだ無い。");
      }
    ));
  
    addSprite(new Sprite(
      images.slime, 0, 64*2.5,
      function(){
        showMessage(this,
          "ぷよーん\nぷよーん\n"
          +"ぷよよ〜ん\nぼよーーん！", 2, 
          ["殴る", "蹴る", "何もしない"],
          function(selected){
            switch (selected) {
            	case 0:
                showMessage(this, "ぴえーん！\n"
            	  + "殴るなんてひどいいいいぃ！", 2);
            		break;
            	case 1:
            	  this.clickedAction = ()=>{};
            	  this.setMotions([
            	    500,
            	    canvas.width/2, -canvas.height, 0,
            	    function(){
            	      killSprite(this);
            	    }
            	  ]);
            	  showMessage(this,
            	    "蹴るんじゃねええええ！\n"
            	    + "ぐあああああああ！！！！", 2);
            		break;
            	default:
            }
          },
        );
      },
      [
        [600, 16, 0, 24],
        [600, 16, 0, 24],
        [600, 32, 0, 40],
        [600, -64, 0, 64]
      ]
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
    
    
    addSprite( new Sprite(
      images.arrowLeft, 0, 64,
      function(){
        let scene = new grassField();
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



class grassField extends createScene{
  constructor(){
    super(images.grass);
    
    
    addSprite( new Sprite(
      images.arrowRight,
      64*4, 64,
      function(){
        let scene = new testMap();
        scene.start();
      }
    ));


    let building = new Sprite(
      images.buildingp, 0, 64 * 3,
      ()=>{},[],{},
      128, 128
    );
    addSprite( building );
    
    
    addSprite( new Sprite(
      images.canon, 64*3.75, 64*2.5,
      function(){
        //ミサイルをうつ処理
        this.deleteClickedAction();
        this.setMotions([
          [50, -6, 0, 0],
          [100, 12, 0, 0],
          [100, -12, 0, 0],
          [100, 12, 0, 0],
          [100, -12, 0, 0],
          [100, 12, 0, 0],
          [100, -12, 0, 0],
          [100, 12, 0, 0],
          [50, -6, 0, 0, function(){
            this.deleteMotions();
            addSprite( new Sprite(
              images.missile, this.x, this.y, ()=>{},
              [
                1000,
                building.x - this.x + building.width * 0.25,
                building.y - this.y + building.height * 0.25,
                128, function(){
                  killSprite(this);
                  building.img.src = images.building_broken;
                }
              ]
            ));
          }]
        ]);
      }
    ));
  }
}
    
    