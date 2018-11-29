var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var x=0;
var y=0;
var food=new Image();
food.src="food.png";//load food img
var direction=1;
var xY=1;
var eatsound= new Audio("eat.mp3");
var crash= new Audio("crash.mp3");//for sound
var random1=Math.round(Math.random()*19)*32;
var random2=Math.round(Math.random()*19)*32;//for food position
var lose=false;//for test
var showText=0;
var score=0;//for text
var speed=0;// star. for adding speed
var snake=[];//star.for xy of snake


document.addEventListener("keydown",key);

/*--------------preparation-------------*/
function drawFood() {
	ctx.drawImage(food,random1,random2);

}

function drawSnake(){
    ctx.fillStyle="lime";
	ctx.fillRect(x,y,32,32);
    if (x>608||x<0||y>608||y<0) {
        showText="Game Over";
        crash.play();//play lose sound
        lose=true; 
    }//for against wall
    snake.unshift(new position(x,y));
    function position(x,y){   
        this.x=x;
        this.y=y;
    };//star.for getting position
    for (var i = 0; i <score; i++) {
        function drawLongth(){
            var xi=snake[i+1].x;
            var yi=snake[i+1].y;//for get longth's position
            ctx.fillRect(xi,yi,32,32);//star-for draw snake longth
            if (x==xi&&y==yi) {
                crash.play();
                snake.splice(i,score-i);
                score=i++;
                showText=score;
            }//if crash itself
        };
        drawLongth();
    }//star.add following
    
}

function moveSnake(){
	if (xY==1) {
		x+=32*direction;
	}else if (xY==2) {
        y+=32*direction;
	}
	if (random1==x&&random2==y) {
        random1=Math.round(Math.random()*19)*32;
        random2=Math.round(Math.random()*19)*32;
        score++;
        showText=score; 
        eatsound.play();//play eat sound
        if (score%3==0) {
            speed=100*score/3;
        }else if(score==1){
            speed=0;
        }//star. add speed(if it crash itself, the speed will be back)
	}//if win a score!
}



/*-------------update----------------*/
function update(){
	ctx.clearRect(0,0,640,640);
	if (lose==false){
		drawFood();
        moveSnake();
        drawSnake();
	}
    ctx.fillStyle="lime";
    ctx.font="80px Arial";
    ctx.textAlign="center";
    ctx.fillText(showText,320,320);//score+text in the centre
    
    if (lose==true) {
    	ctx.font="40px Arial";
        ctx.textAlign="center";
        ctx.fillText("The score was "+score,320,400);
    }//show another line text if lose
    setTimeout(update,500-speed);//call function,  half a second
}
update();



/*-------------presskey----------------*/

function key(e){
    if(e.key==="ArrowLeft"||e.key==="ArrowRight"){
        xY=1;
    }else if (e.key==="ArrowUp"||e.key==="ArrowDown") {
    	xY=2;
    }

    if (e.key==="ArrowRight"||e.key==="ArrowDown") {
        direction=1;
    }else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){
        direction=-1;
    }
}







