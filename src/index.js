import Phaser from "phaser";
import skyImg from "./assets/sky.png";
import platformImg from "./assets/platform.png";
import starImg from "./assets/star.png";
import bombImg from "./assets/bomb.png";
import dudeImg from "./assets/dude.png";
import background from "./assets/windbg.png";
import bgCloud from "./assets/bgCloud.png";
import catdogbg  from "./assets/catdogbg.png";

import ground from "./assets/groundwood.png";
import nail from "./assets/nail2pix.png";
import nail2 from "./assets/nail202pix.png";
import chiwawabomb01 from "./assets/chiwawabomb01pix.png";
import chiwawabomb02 from "./assets/chiwawabomb02pix.png";
import chiwawabomb03 from "./assets/chiwawabomb03pix.png";
import chiwawabomb04 from "./assets/chiwawabomb03pix.png";
import sidewall from "./assets/sidewall.png";
import plusone from "./assets/+1.png";
import boal from "./assets/boal.png";
import money from "./assets/csdpix3.png";
import bombatlaspng from "./assets/bombatlas.png";
import bombatlasjs from "./assets/bombatlas.json";
import bombsheetImg from "./assets/bombgridsheet.png";
import bombsheetjs from "./assets/bombgridsheet.json";
import explodesheetImg from "./assets/explodesheet.png";
import angercatsheetImg from "./assets/catangersheet.png";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";



var Cloud;
var Clouds = new Array();
var platform;
var timer;
var player1;
var player2;
var cursors;
var nails= new Array();
var score = 0;
var scoreText;
var bombs = new Array();
var moneys = new Array();
var ColliderCats = {
  Noncollide : null,
  staticCat : null,
  playerCat : null,
  bombCat : null,
  moneyCat : null,
};



const userId=Math.floor(Math.random() * 50);



class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("background", background);
    this.load.image("bgCloud",bgCloud);
    this.load.image("catdogbg",catdogbg);
    this.load.image("ground", ground);
    this.load.image("nail", nail);
    this.load.image("nail2", nail2);
    this.load.image("bomb", bombImg);
    this.load.image("bomb01",chiwawabomb01);
    this.load.image("bomb02",chiwawabomb02);
    this.load.image("bomb03",chiwawabomb03);
    this.load.image("bomb04",chiwawabomb04);
    this.load.image("sidewall",sidewall);
    this.load.image("plusone",plusone);
    this.load.image("money",money);
    this.load.image("boal",boal);
    this.load.spritesheet("dude", dudeImg, { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet("bombsheet", bombsheetImg, { frameWidth: 320, frameHeight: 320 });
    this.load.spritesheet("explodesheet", explodesheetImg, { frameWidth: 158, frameHeight: 184 });
    this.load.spritesheet("angercatsheet",angercatsheetImg,{frameWidth: 320, frameHeight: 320})
    this.load.atlas("chiwawabomb",bombatlaspng,bombatlasjs);
  }
  update() {
    
    /*
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
      sendMyLoc("LEFT");
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
      sendMyLoc("RIGHT");
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
      sendJumpInfo();
    }
    */

    //getItsLoc();
    //player 2 gelen dataya göre haraket ettir
    timer ++ ;
    

    // Cloud

    Clouds.forEach(element => {
      if(element.x > 1200){
        element.setPosition(-400, 300);
        
        element.setVelocity(2,0);
      };
    });

    

    if(timer % 200 ==0){
      if(bombs.length<20){
        // bombCreate
        this.bombCreate();
        
        
      }
      this.moneyCreate();
      
    }


    this.BombManaging();



  }


  colliderCreate(){

    ColliderCats.staticCat = this.matter.world.nextCategory();
    ColliderCats.playerCat = this.matter.world.nextCategory();
    ColliderCats.bombCat = this.matter.world.nextCategory();
    ColliderCats.moneyCat = this.matter.world.nextCategory();

  }
  animationCreate(){

    


    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("angercatsheet", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
      });
  
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "bomb-idle",
        frames: this.anims.generateFrameNumbers("bombsheet",{ start: 2, end: 3 }),
        frameRate: 8,
        repeat: -1,
  
      });

      this.anims.create({
        key: "bomb-OoO",
        frames: this.anims.generateFrameNumbers("bombsheet",{ start: 0, end: 1 }),
        frameRate: 8,
        repeat: -1,
  
      });

      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("explodesheet",{ start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0,



      })
      
      

      
      
  }
  
  create() {
    timer = 0;
    this.animationCreate();
    this.colliderCreate();
    this.boundaryCreate();
    this.playersCreate();
    this.nailCreate();
    cursors = this.input.keyboard.createCursorKeys();
    this.bombCreate();

    // COLLIDION
    



    
    
    scoreText = this.add.text(16, 16, `score : 0`, {
      fontSize: "32px",
      fill: "#000",
    });

    
    
    
  }
  boundaryCreate(){
    this.add.image(400, 400, "background").setScale(0.8);

    for(let i =0;i<2;i++){
      let temp;
      temp = this.matter.add.image(-400-800*i, 300, "bgCloud").setScale(0.8).setVelocityX(3).setCollisionCategory(ColliderCats.Noncollide);
      temp.setIgnoreGravity(true).setFrictionAir(0);
      Clouds.push(temp);

    }
    this.add.image(400, 400, "catdogbg").setScale(0.8);


    


    this.matter.add.image(-50,300,"sidewall").setScale(0.8).setStatic(true).setCollisionCategory(ColliderCats.staticCat);
    this.matter.add.image(850,300,"sidewall").setScale(0.8).setStatic(true).setCollisionCategory(ColliderCats.staticCat);
    platform = this.matter.add.image(400, 750, "ground").setScale(0.8);
    platform.setStatic(true);
    platform.setCollisionCategory(ColliderCats.staticCat);

  }
  playersCreate(){
    player1 = this.matter.add.sprite(400,500,"angercatsheet").setScale(0.2);
    player1.setCollisionCategory(ColliderCats.playerCat);
    player1.setCollidesWith([ ColliderCats.bombCat, ColliderCats.staticCat, ColliderCats.moneyCat]);
    player1.anims.play("left");
    player2 = this.matter.add.sprite(450,500,"angercatsheet").setScale(0.2);
    player2.anims.play("left");
    player2.setCollisionCategory(ColliderCats.playerCat);
    player2.setCollidesWith([ ColliderCats.bombCat, ColliderCats.staticCat, ColliderCats.moneyCat]);
    var boal = this.matter.add.sprite(425,450,"boal").setScale(0.2);
    boal.setCollisionCategory(ColliderCats.playerCat);
    boal.setCollidesWith([ ColliderCats.bombCat, ColliderCats.staticCat, ColliderCats.moneyCat]);

  }

  
  nailCreate(){
    
    for(let i=0;i<5;i++){
      if(i%2 == 0){
        for(let j=0;j<8;j++){
          var temp = this.matter.add.image(50+100*j,50+100*(i),'nail2').setScale(0.1);
          
          temp.setCircle(10);
          temp.setStatic(true);
          temp.setCollisionCategory(ColliderCats.staticCat);
          temp.setCollidesWith([ ColliderCats.bombCat]);


          this.matterCollision.addOnCollideStart({
            objectA: temp,
            //objectB: platform,
            callback: function(eventData) {
              var tempnail = this.matter.add.image(50+100*j,50+100*(i),'nail').setScale(0.15);
              tempnail.setCircle(10);
              tempnail.setStatic(true);
              tempnail.setCollisionCategory(ColliderCats.Noncollide);
              const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
              setTimeout(function(){
                tempnail.destroy();
              
              },500);
              
            },
            context: this 
          });


        }

      }
      else{
        for(let j=0;j<7;j++){
          var temp = this.matter.add.image(100+100*j,50+100*(i),'nail2').setScale(0.1);
          temp.setCircle(10);
          temp.setStatic(true);
          temp.setCollisionCategory(ColliderCats.staticCat);
          temp.setCollidesWith([ ColliderCats.bombCat]);

          this.matterCollision.addOnCollideStart({
            objectA: temp,
            //objectB: platform,
            callback: function(eventData) {
              var tempnail = this.matter.add.image(100+100*j,50+100*(i),'nail').setScale(0.15);
              tempnail.setCircle(10);
              tempnail.setStatic(true);
              tempnail.setCollisionCategory(ColliderCats.Noncollide);
              const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
              setTimeout(function(){
                tempnail.destroy();
              
              },500);
              
            },
            context: this 
          });
          
        }

      }

    }

    
    
  }

  bombCreate(){
    
    // animation 

    var bomb = this.matter.add.sprite(800*Math.random(), 0, 'bombsheet');

    
    bomb.setScale(0.2);
    bomb.setCircle(20);
    
    bomb.setBounce(0.8);
    bomb.setVelocityX(1);
    bomb.setAngularVelocity(0.1);
    bomb.setOrigin(0.5,0.7);
    bomb.setFriction(0.005);
    bomb.anims.play("bomb-idle");
    bomb.deadCtr = 0;
    
    bomb.setCollisionCategory(ColliderCats.bombCat);
    bomb.setCollidesWith([ ColliderCats.bombCat,ColliderCats.playerCat,ColliderCats.staticCat]);



    // add collision
    this.matterCollision.addOnCollideStart({
      objectA: bomb,
      //objectB: platform,
      callback: function(eventData) {
        // This function will be invoked any time the player and trap door collide.
        const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
        bomb.play("bomb-OoO");
        //bomb.body.gameObject.setTint(" 0xffaf7f");
       
        // bodyA & bodyB are the Matter bodies of the player and door respectively.
        // gameObjectA & gameObjectB are the player and door respectively.
        // pair is the raw Matter pair data.
      },
      context: this // Optional context to apply to the callback function.
    });
    this.matterCollision.addOnCollideEnd({
      objectA: bomb,
     
      callback: function(eventData) {

        const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
        setTimeout(function(){
          bomb.play("bomb-idle");
        //bomb.body.gameObject.setTint(" 0xffffff");
        },500);
        
      },
      context: this 
    });
  



   
    bombs.push(bomb);
    
    
  }






  moneyCreate(){

    var money = this.matter.add.image(800*Math.random(), 0, 'money').setScale(0.15).setIgnoreGravity(true);
    //money.setVelocityX(1);
    
    
    money.setCollisionCategory(ColliderCats.moneyCat);
    money.setCollidesWith([ ColliderCats.playerCat ]);
    money.setVelocityY(2);
    money.setFrictionAir(0);
    


  }

  BombManaging(){
    bombs.forEach(element => {
      element.deadCtr ++;

      //console.log(element.deadCtr);

      if(200 < element.deadCtr &&  element.deadCtr < 300){
        
        if(element.deadCtr % 20 <= 10){
          element.body.gameObject.setTint(" 0xffaf7f");
          
        }
        else{
          element.body.gameObject.setTint(" 0xffffff");
          
        }

      }
      else if( 300 <= element.deadCtr &&  element.deadCtr < 450){
        
        if(element.deadCtr % 15 <= 8){
          
          element.body.gameObject.setTint(" 0xef5350");
        }
        else{


          element.body.gameObject.setTint(" 0xffffff");
          
        }

      }
      else if( 450 <= element.deadCtr &&  element.deadCtr < 600){
        
        element.anims.play("bomb-OoO");
        if(element.deadCtr % 10 <= 5){
          element.body.gameObject.setTint(" 0xff0000");
        }
        else{
          element.body.gameObject.setTint(" 0xffffff");
          
        }

      }
      else if( 600 <= element.deadCtr){
        
        
        
        this.ExplosionCreate(element.body.position.x,element.body.position.y);
        element.destroy();
        bombs.shift();
        
      }


      
    });



  }

  ExplosionCreate(TargetX,TargetY){
    var explode = this.matter.add.sprite(TargetX, TargetY, 'explodesheet').setIgnoreGravity(true); 
    explode.setCollisionGroup(0);
    explode.body.collisionFilter.mask = 0;
    //console.log(explode.anims);
    explode.anims.play("explode");



    setTimeout(function(){
      explode.destroy();
    //bomb.body.gameObject.setTint(" 0xffffff");
    },500);

  }



  dead(){
    /*
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(player2, bombs, hitBomb, null, this);
    function hitBomb(player, bomb) {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play("turn");

      this.gameOver = true;

      sendDeadData();
    }*/
  }

}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 800,
  scene: MyGame,
  physics: {
    default: 'matter',
    matter: {
        enableSleeping: true,
        gravity: {
            y: 0.8
        },
        debug: {
            showBody: false,
            showStaticBody: false,
        }
    }
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision

        // Note! If you are including the library via the CDN script tag, the plugin 
        // line should be:
        // plugin: PhaserMatterCollisionPlugin.default
      }
    ]
  },
};

const game = new Phaser.Game(config);



const socket = io('ws://localhost:8080');



socket.on('message', socketItsLoc => {
  if(socketItsLoc.event==="DEAD"){
    window.location.reload(1);
  }

    if(socketItsLoc.id!==userId){
        if(socketItsLoc.event==="JUMP"){
            player2.setVelocityY(-330);
            player2.anims.play("turn");
        }else{
            if(socketItsLoc.anim==="LEFT"){
              player2.anims.play("left", true);
            }
            else if(socketItsLoc.anim==="RIGHT"){
              player2.anims.play("right", true);
            }
            player2.x=socketItsLoc.xLoc;
            player2.y=socketItsLoc.yLoc;
        }
    }
});

function sendMyLoc(direction){
    socket.emit('message', {id:userId,xLoc:player.x,yLoc:player.y,anim:direction})
}
function sendJumpInfo() {
    socket.emit('message', {id:userId,event:"JUMP"})
}

function sendDeadData() {
  socket.emit('message', {id:userId,event:"DEAD"})
}


