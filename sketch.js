function preload(){
  castleImg = loadImage("./assets/bg.png");
}




var molly, gaurd,ground,bg,gamestate="start";
var puzzle, submitbtn;
var check=0;


function setup(){
createCanvas(windowWidth,windowHeight);

//creating the PC  and NPC characters//
bg= createSprite(width/2,height/2,width,height);
bg.shapeColor="pink";

ground = createSprite(width/2,height-40,width,60);
molly = createSprite(width/2+200,height-100,20,90);

gaurd = createSprite(width/2-100,height-100,20,100);
ghost = createSprite(width/2-150,height-100,20,100);
ghost.visible = false;
puzzleG=new Group();


    input1 = createInput("");
    input1.position(width/2+100,height/8+90);

    input2 = createInput("");
    input2.position(width/2+100,height/8+90);
    input2.hide();
     
    submitbtn= createButton("Submit");
    submitbtn.position(width/2+280,height/8+90);



}

function draw(){
  background("white");

 //The instructions that will be displayed for the game// 
text("Hello molly you are trapped in a castle ,to escape from the castle you have solve puzzles and  you must hurry before the ghost catches you",width/2-200,height/2-300)
 
// code for when the gamestate is start//
if(gamestate=="start"){
  if(keyDown("space")){
   check=1;
   
    gaurd.visible=false;
    ghost.visible = true;
    }
    if(bg.x<width/3){
      bg.x=width/2;
    }
    portal();
    enableStart();
    console.log(check);
    
    //code for when the gamestate is puzzle1//
    if(molly.isTouching(puzzleG) && check===1){
     gamestate="puzzle1";
    }
    if(molly.isTouching(puzzleG) && check===2){
      gamestate="puzzle2";
    }
 }
 drawSprites();
 
//disable the puzzle group//
  if(gamestate==="puzzle1"){
    disableStart();
    bg.shapeColor="purple";
    input1.show();
    submitbtn.show();
    text("unscramble the given words below",width/2,height/8);
    text("RDOIASUANS",width/2,height/8+100);
   
    var ans= "DINOSAUR";
    submitbtn.mousePressed(()=>{
     var Userans=input1.value();
     Userans=Userans.toUpperCase();
     if(ans===Userans){
       gamestate="start";
       check=2;
     }
   });

    
     


  }


  if(gamestate=="puzzle2"){
    disableStart();
    bg.shapeColor="magenta";
    input2.show();
    submitbtn.show();
    text("solve the riddles given  below",width/2,height/8);
    text("The more there is the less you see.What is it?",width/2,height/8+100); 
    var ans= "DARKNESS";
    submitbtn.mousePressed(()=>{
     var Userans=input2.value();
     Userans=Userans.toUpperCase();
     if(ans===Userans){
       gamestate="end";
       check=3;
     }
   });

    
     


  }
if(gamestate=="end"){
bg.shapeColor="orange";
disableStart();
input1.hide();
submitbtn.hide();
text("Congrajulations!!! You won the game",width/3,height/2);
input2.hide();
}



}
// code for spawning puzzles//
function portal(){
  if(frameCount%80===0){
     puzzle = createSprite(width+100,height-100,10,10);
    puzzle.velocityX=-3;
    puzzle.shapeColor= rgb(random(0,225),random(0,225),random(0,225));
    puzzleG.add(puzzle);
  }
}
function enableStart(){
  input1.hide();
  bg.velocityX=-2;
 submitbtn.hide();
}
function disableStart(){
  bg.velocityX=0;
  gaurd.visible=false;
  puzzleG.destroyEach();
  
}