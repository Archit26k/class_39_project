class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    hero1 = createSprite(100,200);
    hero1.addImage(hero1Img)
    hero1.scale = 0.1
    
  
    hero2 = createSprite(700,200);
    hero2.addImage(hero2Img)
    hero2.scale = 0.15
    heroes = [hero1, hero2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#000")
      image(trackImg , 0 , -displayHeight*4 , displayWidth , displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the heroes
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the heroes a little away from each other in x direction
        x = x + 400;
        //use data form the database to display the heroes in y direction
        y = displayHeight - allPlayers[plr].distance;
        heroes[index-1].x = x;
        heroes[index-1].y = y;
          
        if (index === player.index){
          heroes[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = heroes[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
   if(player.distance > 3630){
       gameState = 2;
       text = text("you have finshed the race" , 300 , 80)
   }
    drawSprites();
  }

  end(){
    console.log("gameEnded")
  }

}

