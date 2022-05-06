import Phaser from "phaser";
import skyImg from "./assets/sky.png";
import platformImg from "./assets/platform.png";
import starImg from "./assets/star.png";
import bombImg from "./assets/bomb.png";
import dudeImg from "./assets/dude.png";
import background from "./assets/bgwhitetilewall.png";
import ground from "./assets/groundwood.png";
import nail from "./assets/nail2pix.png";
import chiwawabomb01 from "./assets/chiwawabomb01pix.png";
import chiwawabomb02 from "./assets/chiwawabomb02pix.png";
import chiwawabomb03 from "./assets/chiwawabomb03pix.png";
import chiwawabomb04 from "./assets/chiwawabomb03pix.png";
import sidewall from "./assets/sidewall.png";
import plusone from "./assets/+1.png";
import money from "./assets/csdpix3.png";
import bombatlaspng from "./assets/bombatlas.png";
import bombatlasjs from "./assets/bombatlas.json";


var platforms;
var platform;
var timer;
var player;
var player2;
var cursors;
var nails= new Array();
var score = 0;
var scoreText;
var bombs = new Array();
var moneys = new Array();

const userId=Math.floor(Math.random() * 50);



class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("background", background);
    this.load.image("ground", ground);
    this.load.image("nail", nail);
    this.load.image("bomb", bombImg);
    this.load.image("bomb01",chiwawabomb01);
    this.load.image("bomb02",chiwawabomb02);
    this.load.image("bomb03",chiwawabomb03);
    this.load.image("bomb04",chiwawabomb04);
    this.load.image("sidewall",sidewall);
    this.load.image("plusone",plusone);
    this.load.image("money",money);
    this.load.spritesheet("dude", dudeImg, { frameWidth: 32, frameHeight: 48 });
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

    if(timer % 200 ==0){
      if(bombs.length<20){
        // bombCreate
        this.bombCreate();
        
        
      }
      this.moneyCreate();
      
    }

  }
  
  animationCreate(){
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
      });
  
      var test2 = this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });

      var test = this.anims.create({
        key: 'bomb-idle',
        frams: this.anims.generateFrameNames("chiwawabomb",{ start:1, end:2, prefix:"chiwawabomb0",suffix:"pix.png"}),
        frameRate: 8,
        repeat: -1,
  
      });
      console.log(test2);
      

      
      
  }
  
  create() {
    timer = 0;
    this.animationCreate();
    //Objects
    this.add.image(400, 400, "background").setScale(0.8);
    this.matter.add.image(-50,300,"sidewall").setScale(0.8).setStatic(true);
    this.matter.add.image(850,300,"sidewall").setScale(0.8).setStatic(true);
    
    platform = this.matter.add.image(400, 750, "ground").setScale(0.8);
    platform.setStatic(true);

   
    player = this.matter.add.image(100, 450, "dude");
    player.setBounce(0.2);
    

    
    player2 = this.matter.add.sprite(200, 450, "dude");
    player2.setBounce(0.2);
    

    
    this.nailCreate();
    cursors = this.input.keyboard.createCursorKeys();
    this.bombCreate();

   

    
    

    

    scoreText = this.add.text(16, 16, `score : 0`, {
      fontSize: "32px",
      fill: "#000",
    });

    
    
    
  }


  nailCreate(){
    
    for(let i=0;i<5;i++){
      if(i%2 == 0){
        for(let j=0;j<8;j++){
          var temp = this.matter.add.image(50+100*j,50+100*(i),'nail').setScale(0.1);
          
          temp.setCircle(10);
          temp.setStatic(true);
          temp.setCollisionGroup(1);
          //temp.setCircle(0.1);
        }

      }
      else{
        for(let j=0;j<7;j++){
          var temp = this.matter.add.image(100+100*j,50+100*(i),'nail').setScale(0.1);
          temp.setCircle(10);
          temp.setStatic(true);
          temp.setCollisionGroup(1);
          
        }

      }

    }

    
    
  }

  bombCreate(){
    
    // animation 

    var bomb = this.matter.add.sprite(800*Math.random(), 0, 'chiwawabomb',"chiwawabomb03pix.png");

    
    bomb.setScale(0.2);
    bomb.setCircle(20);
    
    bomb.setBounce(0.8);
    bomb.setVelocityX(1);
    bomb.setAngularVelocity(0.1);
    bomb.setOrigin(0.5,0.7);
    bomb.setFriction(0.005);
    bomb.anims.play("bomb-idle");
    


    bombs.push(bomb);
    
    
  }

  moneyCreate(){

    var money = this.matter.add.image(800*Math.random(), 0, 'money').setScale(0.1).setIgnoreGravity(true);
    //money.setVelocityX(1);
    
    
    money.setCollisionGroup(0);
    money.body.collisionFilter.mask = 0;
    money.setVelocityY(2);
    money.setFrictionAir(0);
    


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
            showBody: true,
            showStaticBody: true
        }
    }
  }
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


