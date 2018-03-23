var count1=100000;
var count2=100000;
var speed1=3.00;
var speed2=3.00;
var remainder1=0;
var remainder2=0;
var defWidth=100;
var defHeight=100;
var needFoSpeed1 = 20;
var needFoSpeed2=20;
var remove=1;
var steve=new Image();
steve.src="BUFF.png";

class Rectangle
{
	constructor(x,y,w,h)
	{
		this.x=x;
		this.y=y;
		this.width=w;
		this.height=h;

		this.image=steve;
		this.left=false;
		this.right=false;
		this.up=false;
		this.down=false;
		
	}
	//update function
	update()
    {
        var prevx=this.x;
        var prevy=this.y;

        //if either left or right key is pressed
        //move the player the certain speed.
        if(this.left==true)
        {
            this.x-=speed1;
            if(this.x < -20){
                this.x = -20;
            }
        }

        if(this.right==true)
        {
            this.x+=speed1;
            if(this.x > window.innerWidth-100){
                this.x = window.innerWidth-100;
            }
        }


        //if either up or down key is pressed
        //move the player the certain speed
        if(this.up==true)
        {
            this.y-=speed1;
            if(this.y < -20){
                this.y = -20;
            }
        }
        if(this.down==true)
        {
            this.y+=speed1;
            if(this.y > window.innerHeight-100){
                this.y = window.innerHeight-100;
            }
        }

        //checks collsion between the player and block
        for (var i=0; i < coinArray.length; i++)
        {
            if(coinArray[i] != this && checkCollision(this,coinArray[i]))
            {
                //remove the block and increase the count
				coinArray.splice(i,1);
                count1+=1;
                remainder1=needFoSpeed1-count1;
				remove+=1;
            }
        }
		for(var i=0;i<rect2Array.length;i++)
		{
			if(rect2Array!=this && checkCollision(this,rect2Array[i]))
			{
				if(speed1>speed2)
				{
					rect2Array.splice(i,1);
					speed1-=speed2;
					setTimeout(respawnTwo,2000);
				}	
			}
		}
    }

		render()
		{
		
		ctx.drawImage(steve,this.x,this.y,this.width,this.height);
		}
	
}
class Rect2
{
	constructor(x,y,w,h)
	{
		this.x=x;
		this.y=y;
		this.width=w;
		this.height=h;

		this.image=steve;
		this.left=false;
		this.right=false;
		this.up=false;
		this.down=false;
		
	}
	//update function
	update()
    {
        var prevx=this.x;
        var prevy=this.y;

        //if either left or right key is pressed
        //move the player the certain speed.
        if(this.left==true)
        {
            this.x-=speed2;
            if(this.x < -20){
                this.x = -20;
            }
        }

        if(this.right==true)
        {
            this.x+=speed2;
            if(this.x > window.innerWidth-100){
                this.x = window.innerWidth-100;
            }
        }


        //if either up or down key is pressed
        //move the player the certain speed
        if(this.up==true)
        {
            this.y-=speed2;
            if(this.y < -20){
                this.y = -20;
            }
        }
        if(this.down==true)
        {
            this.y+=speed2;
            if(this.y > window.innerHeight-100){
                this.y = window.innerHeight-100;
            }
        }

        //checks collsion between the player and block
        for (var i=0; i < coinArray.length; i++)
        {
            if(coinArray[i] != this && checkCollision(this,coinArray[i]))
            {
                //remove the block and increase the count
                coinArray.splice(i,1);
                count2+=1;
                remainder2=needFoSpeed2-count2;
			    remove+=1;
				
            }
        }
		//check collission between player1 and player2
		for(var i=0;i<rectArray.length;i++)
		{
			if(rectArray!=this && checkCollision(this,rectArray[i]))
			{
				if(speed2>speed1)
				{
					rectArray.splice(i,1);
					speed2-=speed1;
					setTimeout(respawnOne,2000);
				}
			}
		}
    }

		render()
		{
		
		ctx.drawImage(steve,this.x,this.y,this.width,this.height);
		}
}
//creates the block image
var loot = new Image();
loot.src = "bitcoin.png";

class Coin extends Rectangle
{
	constructor(x,y,w,h)
	{
		super(x,y,w,h);
		this.image=loot;
	}
	render()
	{
		//draws the bitcoin
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}

//adding things
var player=new Rectangle(100,100,defWidth,defHeight);
var player2=new Rect2(window.innerWidth-100,window.innerHeight-100,defWidth,defHeight);
var rectArray=[];
var coinArray=[];
var rect2Array=[];
rect2Array.push(player2);
rectArray.push(player);
//place the blocks on the screen
for(var x=0;x<5;x++)
{
	coinArray.push(new Coin(Math.floor(Math.random()*window.innerWidth),Math.floor(Math.random()*window.innerHeight),50,50));
}

window.onload = function()
{
	
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;

	ctx.imageSmoothingEnabled=false;
	
	
	document.addEventListener("keydown",keydown);
	document.addEventListener("keyup",keyup);


	
	setInterval(main, 1/60 * 1000);
	window.alert("Upgrades:\nIncrease speed(SpaceBar)=20 coins\nIncrease Bar width and height(2)= 50 coins");
	window.alert("In order to bring up the instructions again, press I");
	
}
function main()
{
	//creates dirt background
	var back=new Image();
	back.src="background.png";
    var pat = ctx.createPattern(back,"repeat");
    ctx.fillStyle = pat;
	ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
	
	//update and render
	for(var i=0;i<rectArray.length;i++)
	{
		rectArray[i].update();
		rectArray[i].render();
	}
	for(var i=0;i<rect2Array.length;i++)
	{
		rect2Array[i].update();
		rect2Array[i].render();
	}
	for(var i=0;i<coinArray.length;i++)
	{
		coinArray[i].update();
		coinArray[i].render();
	}
	
	//removes and displays new blocks once 5 have been collected
	if(remove%5==0)
	{
		coinArray.splice(0,5);
		
		for(var x=0;x<5;x++)
		{
			
			coinArray.push(new Coin(Math.floor(Math.random()*window.innerWidth),Math.floor(Math.random()*window.innerHeight),50,50));
		}
		
	}
	
	//displays player1's count
	ctx.fillStyle="#FFFF";
	ctx.font="20px Comic Sans MS";
	ctx.fillText(count1,100,150);
	
	//displays player2's count
	ctx.fillStyle="#FFFF";
	ctx.font="20px Comic Sans MS";
	ctx.fillText(count2,window.innerWidth-100,150);
	
	//display the current player1 speed
	ctx.fillStyle="#FFFF";
	ctx.font="20px Comic Sans MS";
	ctx.fillText("Player 1's speed:  "+speed1,200,50);
	
	//display player2 speed
	ctx.fillStyle="#FFFF";
	ctx.font="20px Comic Sans MS";
	ctx.fillText("Player 2's speed:  "+speed2,window.innerWidth-200,50);
	
}
function respawnOne()
{
	rectArray.push(player);
	speed1=3;
}
function respawnTwo()
{
	rect2Array.push(player2);
	speed2=3;
}
function keydown(e)
{
	//moves the player if a certain key is held down
	switch(e.keyCode)
	{
		
		case 32://SpaceBar=Increase speed for p2
			if(count2 >= needFoSpeed2)
			{
				speed2+=1;
				count2-=needFoSpeed2;
				needFoSpeed2 += 10;
			}
			else if(speed2==20.00)
				window.alert("You have reached the MAX speed");
			else 
				window.alert("You need " + remainder2 + " more coins");
			break;
		case 37://37-40=Movement
			player.left=true;
			steve.src="BUFF.png";
			break;
		case 38:
			player.up=true;
			if(player.right==true)
				steve.src="BUFFRIGHT.png";
			else
			steve.src="BUFF.png";
			break;
		case 39:
			player.right=true;
			steve.src="BUFFRIGHT.png";
			break;
		case 40:
			player.down=true;
			steve.src="BUFFDOWN.png";
			break;

		case 50://#2=Increase bar width and height
			if(count>=50 && defWidth<100 && defHeight<500)
			{
				defWidth+=10;
				defHeight+=50;
				count-=50;
				
			}
			else if(defWidth==100 || defHeight==500)
			{
				window.alert("You have reached the maximum size");
			}
			else
				window.alert("You need "+(remainder+30)+" more coins");
			break;
		case 73://I= Instructions
			window.alert("Upgrades:\nIncrease speed(SpaceBar)=20 coins\nIncrease Bar width and height by (2)= 50 coins");
			break;
			//Player 2 movement
		case 65:
			player2.left=true;
			steve.src="BUFF.png";
			break;
		case 87:
			player2.up=true;
			if(player2.right==true)
				steve.src="BUFFRIGHT.png";
			else
			steve.src="BUFF.png";
			break;
		case 68:
			player2.right=true;
			steve.src="BUFFRIGHT.png";
			break;
		case 83:
			player2.down=true;
			steve.src="BUFFDOWN.png";
			break;
		case 96://increase p1's speed
			if(count1 >= needFoSpeed1)
			{
				speed1+=1;
				count1-=needFoSpeed1;
				needFoSpeed1 += 10;
			}
			else if(speed1==20.00)
				window.alert("You have reached the MAX speed");
			else 
				window.alert("You need " + remainder1 + " more coins");
			break;
			
	}
}
function keyup(e)
{
	//stops the player once the key is released
	switch(e.keyCode)
	{
		case 37:
			player.left=false;
			break;
		case 38:
			player.up=false
			break;
		case 39:
			player.right=false;
			break;
		case 40:
			player.down=false;
			break;
		//player 2 movement
		case 65:
			player2.left=false;
			break;
		case 87:
			player2.up=false;
			break;
		case 68:
			player2.right=false;
			break;
		case 83:
			player2.down=false;
			break;
	}
	
}

function checkCollision(player,coin)
{
	//checks if there is collision
	return (player.x<coin.x+coin.width && 
			player.x+player.width>coin.x &&
			player.y<coin.y+coin.height &&
			player.height+player.y>coin.y);
}






