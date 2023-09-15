

function setupFrisbeeMinigame() { 
    //toggles off visibility of park store money status and action menu
    document.getElementById("dogimg").removeChild(dogImgElem);
    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
    statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
    frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
    frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
    //creates structs for frisbee and dog. Still need to implement yspeed.
    let frisbee = {x:0, y:500,oldx:0,oldy:0,dirx:0,diry:0,width:100,height:100,yspeed:2,isThrown:false};
    let dog = {x:757, y:600,dirx:0,width:100,height:100,yspeed:1};
    //random number gen to determine where dog will be
    dog.x = Math.floor(Math.random() * 1416);
    //frisbeeEquipped = "professionalfrisbee";
    //changes speed of ascent by 1 if elitefrisbee is equipped
    if(frisbeeEquipped == "elitefrisbee")
    {
        frisbee.y = 400;
    }
    //changes speed of ascent by 1 if professionalfrisbee is equipped. Also sets its initial y to 350 to make game easier.
    if(frisbeeEquipped == "professionalfrisbee")
    {
        
        frisbee.y = 350;
       // window.alert("PRO");
    }
    //creates image to store the frisbee
    var fImg = document.createElement('img');

    if(frisbeeEquipped == "")
    {
        fImg.src = "frisbee.png";

    }
    else
    {
        if(frisbeeEquipped == "elitefrisbee")
        {
            fImg.src = "EliteFrisbee.png"
        }
        if(frisbeeEquipped == "professionalfrisbee")
        {
            fImg.src = "ProfessionalFrisbee.png"
        }
        if(frisbeeEquipped == "bluefrisbee")
        {
            fImg.src = "BlueFrisbee.png"
        }
        if(frisbeeEquipped == "pinkfrisbee")
        {
            fImg.src = "PinkFrisbee.png"
        }

    }

    
    fImgElemStyle = "width: 100px; height: 100px; padding: 10;"
    fImg.style = fImgElemStyle;
    fImg.draggable = "true";
    fImg.id = "fImg"
    //creates image to store the park image
    var pImg = document.createElement('img');
    pImg.src = "park.png";
    pImg.style = "width: 100px; height: 100px; padding: 10;"
    pImg.draggable = "true";
    pImg.id = "pImg"
    //creates image to store the dog image
    var dImg = document.createElement('img');
    dImg.src = "B1Happy.png";
    dImg.style = "width: 100px; height: 100px; padding: 10;"
    dImg.id = "dImg"
    //creates canvas to draw frisbee on
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    //Determines speed for widthXheight shrinking on Frisbee
    var count = 0;
    //sets var to track what ending you get and if it ended at all
    var gameover = 0;
    //Determines the speed of the dog
    var dogCounter = 0;
    //this function makes the frisbee move up and changes isThrown to true
    function mouseTriggers() {
                frisbee.isThrown = true;
                frisbee.diry = -1;
        };
        //When thrown is clicked, calls mouseTriggers.
        frisbeebtn.ondblclick = function () {
            mouseTriggers();
           }
    //when the frisbee is loaded in, on a specific interval we call mouseTriggers to see if anything is pressed/if pos is updated, refresh the screen full of white, and then draw the current pos of the frisbee
    fImg.onload = function() {
        //starts interval loop
        var refreshId = setInterval(function() {
            //Functionality for hub button. 
            frisbeehubbtn.ondblclick = function () {
                if(frisbee.diry == 0 && frisbee.width == 100)
                {
                        //Explained more in depth below, basically it exits the game. 
                        clearInterval(refreshId);
                        frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
                        frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
                        context.clearRect(0,0, canvas.width, canvas.height);
                        parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
                        storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
                        moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
                        statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
                        actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
                        inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
                        document.getElementById("dogimg").appendChild(dogImgElem);
                        fImgElemStyle = togglevisibility(fImgElemStyle, document.getElementById('fImg'));
                }
                }
                //If frisbee is thrown, y movement is added. If not, there is only x movement
                if(frisbee.isThrown == true)
                 {

                    
                   //Events when you lose
                   if(gameover == 2)
                   {
                    

                        //sets interval to end looping
                        clearInterval(refreshId);
                        //Hides throw and hub buttons
                        frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
                        frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
                        window.alert("You lost. Better luck next time!");
                        //clear the canvas
                        context.clearRect(0,0, canvas.width, canvas.height);
                        //Makes park menu visible
                        parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
                        //Makes store visible
                        storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
                        //Makes money visible
                        moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
                        //Makes status visible
                        statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
                        //Makes action menu visible
                        actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
                        //Makes the inventory button visible
                        inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
                        //Redraws the dog for main menu
                        document.getElementById("dogimg").appendChild(dogImgElem);
                        //Below clears the entire minigame.
                        fImgElemStyle = togglevisibility(fImgElemStyle, document.getElementById('fImg'));

                        


                   }
                   //Events when you win
                   if(gameover == 1)
                    {
                        //sets interval to end looping
                        clearInterval(refreshId);
                        //Hides throw and hub buttons
                        frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
                        frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
                        //Increases happiness by 10
                        addhappystat(10);
                        //Message to alert you won
                        window.alert("You win!");
                        //Add a skill point to the dog
                        skillpoints++;
                        //clear the canvas
                        context.clearRect(0,0, canvas.width, canvas.height);
                        //Makes park menu visible
                        parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
                        //Makes store visible
                        storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
                        //Makes money visible
                        moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
                        //Makes status visible
                        statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
                        //Makes action menu visible
                        actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
                        //Makes the inventory button visible
                        inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
                        //Redraws the dog for main menu
                        document.getElementById("dogimg").appendChild(dogImgElem);
                        //Below clears the entire minigame.
                        fImgElemStyle = togglevisibility(fImgElemStyle, document.getElementById('fImg'));
                    }
                     //Sets canvas to be filled with white
                     context.fillStyle = '#fff';
                     context.fillRect(0,0, canvas.width, canvas.height);
                     //Draws Park
                     context.drawImage(pImg, 0, 0,1515,700);
                     //Draws Frisbee
                     context.drawImage(fImg, frisbee.x, frisbee.y,frisbee.width,frisbee.height);
                     //Draws Dogs
                     context.drawImage(dogImgElem, dog.x, dog.y,dog.width,dog.height);
                    //sets frisbee to go up until frisbee width 
                    if(frisbee.width > 50)
                    {
                        frisbee.diry = -1;
                    } 
                    //If frisbee is at the top of the screen and not 50X50
                    if(frisbee.y <= 0 && frisbee.width != 50.0 && frisbee.height != 50.0) {
                            //If count is less than 3 increment count. This lets me control speed of shrinking
                            if(count <3)
                            {
                                count++;
                            }
                            //If counter is 3 then reduce dimensions of frisbee
                            if(count == 3)
                            {
                                count = 0;
                                frisbee.height -= 1;
                                 frisbee.width -= 1;
                            }
                        //stop the frisbee y movement
                        frisbee.diry = 0;
                    }
                    //When width and height are 50 the frisbee stops moving in the x direction and falls down in the y direction
                    if(frisbee.height == 50 && frisbee.width == 50)
                    {
                        frisbee.diry = 1;
                        frisbee.dirx = 0;
                    }
                    //If frisbee is on the ground stop moving
                    if(frisbee.y >= 650)
                    {
                        frisbee.diry = 0;
                    }
                    //If frisbee hits left bound stop
                    if(frisbee.x == 0){
                        frisbee.dirx = 0;
                    } 
                    //If frisbee hits right bound stop
                    if(frisbee.x >= 1416)
                    {
                        frisbee.dirx = 0;
                    } 
                    //If frisbee touches dog you win and the frisbee stops
                    if(((frisbee.x + frisbee.width >= dog.x) && frisbee.x <= dog.x + dog.width) && (frisbee.y == dog.y) )
                    {
                        frisbee.diry = 0;
                        gameover += 1;
                    }
                    else
                    {
                        //If frisbee hits ground, game over and stop moving
                        if((frisbee.y >= 650))
                        {
                            frisbee.diry = 0;
                            gameover += 2;
                        }
                    }
                    //Updates x and y positions according to dir
                    frisbee.x += frisbee.dirx;
                    //If frisbee is ascending
                    if(frisbee.diry == -1)
                    {
                        //change in y is the current direction times the yspeed of the current frisbee
                        frisbee.y += frisbee.diry*frisbee.yspeed;
                    }
                    else
                    {
                        frisbee.y += frisbee.diry*2;
                    }
                    //If frisbee is falling
                    if(frisbee.diry == 1)
                    {
                        //If dog is to the right of frisbee move left
                        if(dog.x > frisbee.x)
                        {
                            dog.dirx = -1;
                        }
                        //If dog is at the same x as frisbee stay still
                        if(dog.x == frisbee.x)
                        {
                            dog.dirx = 0;
                        }
                        //If dog is to the left of frisbee move right
                        if(dog.x < frisbee.x)
                        {
                            dog.dirx = 1;
                        }
                        //If dogCounter is 1, update x and reset dogCounter to 0. This lets me tweak the speed of the dog. 
                        if(dogCounter == 1)
                        {
                            dog.x += dog.dirx;
                            dogCounter = 0;
                        }
                        else
                        {
                            //increment dogCounter
                            dogCounter++;
                        }
                    }
                 }
                 else
                 {
                    //Sets canvas to be filled with white
                    context.fillStyle = '#fff';
                    context.fillRect(0,0, canvas.width, canvas.height);
                    //Draws Park
                    context.drawImage(pImg, 0, 0,1515,700);
                    //Draws Frisbee
                    context.drawImage(fImg, frisbee.x, frisbee.y,frisbee.width,frisbee.height);
                    //Draws Dogs
                    context.drawImage(dogImgElem, dog.x, dog.y,dog.width,dog.height);
                    //Checks bounds. If frisbee x == 0 the frisbee moves right and if it is 1416 the frisbee moves left. This lets the frisbee bounce back and forth.
                    if(frisbee.x == 0){

                        frisbee.dirx = 1;
                    } 
                    if(frisbee.x == 1416)
                    {
                        
                        frisbee.dirx = -1;
                        
                    } 
                       //Changes the x position of the frisbee by dirx*12
                        frisbee.x += frisbee.dirx*12;
                 }
              }, 5);
            }
        //exit function
        return;
    }

    

function setupFetchMinigame() { 
    //toggles off visibility of park store money status and action menu
    fetchbtn.innerHTML = "Lives Left: 3";
    document.getElementById("dogimg").removeChild(dogImgElem);
    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
    statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
    frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
    frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
    fetchbtnstyle = togglevisibility(fetchbtnstyle, document.getElementById('fetBTN'));
    //creates structs for ball and dog. Still need to implement yspeed.
    let ball = {x:0, y:0,oldx:0,oldy:0,dirx:0,diry:0,width:100,height:100,yspeed:2,isThrown:false};
    let dog = {x:1415, y:300,dirx:0,width:100,height:100,yspeed:1};
    //sets different width and height for bouncyball if equipped. I made it small to compensate for its amazing bounce prowess
    if(fetchballEquipped == "bouncyball")
    {
        ball.width = 75;
        ball.height = 75;
    }
    //random number gen to determine where dog will be
    dog.y = Math.floor(Math.random() * 601);
    //creates image to store the ball
    var bImg = document.createElement('img');

    if(fetchballEquipped == "")
    {
        bImg.src = "ball.png";

    }
    else
    {
        if(fetchballEquipped == "bouncyball")
        {
            bImg.src = "BouncyBall.png"
        }
        if(fetchballEquipped == "tennisball")
        {
            bImg.src = "TennisBall.png"
        }
        if(fetchballEquipped == "baseball")
        {
            bImg.src = "BaseBall.png"
        }
        if(fetchballEquipped == "pinkfrisbee")
        {
            bImg.src = "PinkFrisbee.png"
        }

    }

    //bImg.src = "frisbee.png";
    bImgElemStyle = "width: 100px; height: 100px; padding: 10;"
    bImg.style = bImgElemStyle;
    bImg.draggable = "true";
    bImg.id = "bImg"
    //creates image to store the park image
    var pImg = document.createElement('img');
    pImg.src = "park.png";
    pImg.style = "width: 100px; height: 100px; padding: 10;"
    pImg.draggable = "true";
    pImg.id = "pImg"
    //creates image to store the dog image
    var dImg = document.createElement('img');
    dImg.src = "B1Happy.png";
    dImg.style = "width: 100px; height: 100px; padding: 10;"
    dImg.id = "dImg"
    //creates canvas to draw ball on
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    //sets var to track what ending you get and if it ended at all
    var gameover = 0;
    //Amount of fails so far
    var lives = 0;
    //this function makes the ball move up and changes isThrown to true
    function mouseTriggers() {
                ball.isThrown = true;
                
        };
        //When thrown is clicked, calls mouseTriggers.
        frisbeebtn.ondblclick = function () {
            mouseTriggers();
           }
    //when the frisbee is loaded in, on a specific interval we call mouseTriggers to see if anything is pressed/if pos is updated, refresh the screen full of white, and then draw the current pos of the frisbee
    bImg.onload = function() {
        //starts interval loop
        var refreshId = setInterval(function() {
            //Functionality for hub button. 
            frisbeehubbtn.ondblclick = function () {
                //if the ball is not moving to the right you may leave to hub.
                if(ball.dirx == 0)
                {
                        //Explained more in depth below, basically it exits the game. 
                        clearInterval(refreshId);
                        frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
                        frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
                        fetchbtnstyle = togglevisibility(fetchbtnstyle, document.getElementById('fetBTN'));
                        context.clearRect(0,0, canvas.width, canvas.height);
                        parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
                        storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
                        moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
                        statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
                        actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
                        inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
                        document.getElementById("dogimg").appendChild(dogImgElem);
                        bImgElemStyle = togglevisibility(bImgElemStyle, document.getElementById('bImg'));
                }
                }
                //If ball is thrown, y movement is added. If not, there is only x movement
                if(ball.isThrown == true)
                 {
                     //Sets ball to move in the x direction to the right
                     ball.dirx = 1;
                     //Sets canvas to be filled with white
                     context.fillStyle = '#fff';
                     context.fillRect(0,0, canvas.width, canvas.height);
                     //Draws Park
                     context.drawImage(pImg, 0, 0,1515,700);
                     //Draws Ball
                     context.drawImage(bImg, ball.x, ball.y,ball.width,ball.height);
                     //Draws Dogs
                     context.drawImage(dogImgElem, dog.x, dog.y,dog.width,dog.height);
                    //If ball hits right bound restart with life loss
                    if(ball.x >= 1485)
                    {
                        //Resets game back to starting conditions with one less life. User has 3 chances to win.
                        ball.dirx = 0;
                        ball.diry = 0;
                        ball.isThrown = false;
                        ball.x = 0;
                        ball.y = 0;
                        gameover = 2;
                        lives++;
                        //updates the user with lives left visually
                        if(lives == 1)
                        {
                            fetchbtn.innerHTML = "Lives Left: 2";
                        }
                        if(lives == 2)
                        {
                            fetchbtn.innerHTML = "Lives Left: 1";
                        }
                    } 
                    //If ball touches dog you win and the ball stops
                    if((ball.x >= dog.x && ball.x <= dog.x + dog.width)&& (ball.y >= dog.y && ball.y <= dog.y + dog.height))
                    {
                        //stops ball movement
                        ball.dirx = 0;
                        ball.diry = 0;
                       //sets interval to end looping
                       clearInterval(refreshId);
                       //Hides throw and hub buttons
                       frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
                       frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
                       fetchbtnstyle = togglevisibility(fetchbtnstyle, document.getElementById('fetBTN'));
                       //Increases happiness by 10
                       addhappystat(10);
                       //Message to alert you won
                       window.alert("You win!");
                       //Add a skill point to the dog
                       skillpoints++;
                       //clear the canvas
                       context.clearRect(0,0, canvas.width, canvas.height);
                       //Makes park menu visible
                       parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
                       //Makes store visible
                       storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
                       //Makes money visible
                       moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
                       //Makes status visible
                       statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
                       //Makes action menu visible
                       actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
                       //Makes the inventory button visible
                       inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
                       //Redraws the dog for main menu
                       document.getElementById("dogimg").appendChild(dogImgElem);
                       //Below clears the entire minigame.
                       bImgElemStyle = togglevisibility(bImgElemStyle, document.getElementById('bImg'));
                    }
                    //Bounds for y. changes directions so it can bounce around
                    if(ball.y <= 0){
                        ball.diry = 1;
                    } 
                    if(ball.y >= 600)
                    {
                        ball.diry = -1;
                    } 
                    //Changes how the ball behaves depending on what is equipped.
                    if(fetchballEquipped == "tennisball")
                    {
                        ball.x += ball.dirx;
                        ball.y += ball.diry*8;
                    }
                    if(fetchballEquipped == "baseball")
                    {
                        ball.x += ball.dirx*8;
                        ball.y += ball.diry*2;
                    }
                    if(fetchballEquipped == "bouncyball")
                    {
                        ball.x += ball.dirx*3;
                        ball.y += ball.diry*15;
                    }
                    if(fetchballEquipped == "")
                    {
                        ball.x += ball.dirx*5;
                        ball.y += ball.diry*5;
                    }
                 }
                 else
                 {
                    //Events when you lose
                   if(gameover == 2 && lives == 3)
                   {
                        //sets interval to end looping
                        clearInterval(refreshId);
                        //Hides throw and hub buttons
                        frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
                        frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
                        fetchbtnstyle = togglevisibility(fetchbtnstyle, document.getElementById('fetBTN'));
                        window.alert("You lost. Better luck next time!");
                        //clear the canvas
                        context.clearRect(0,0, canvas.width, canvas.height);
                        //Makes park menu visible
                        parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
                        //Makes store visible
                        storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
                        //Makes money visible
                        moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
                        //Makes status visible
                        statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
                        //Makes action menu visible
                        actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
                        //Makes the inventory button visible
                        inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
                        //Redraws the dog for main menu
                        document.getElementById("dogimg").appendChild(dogImgElem);
                        //Below clears the entire minigame.
                        bImgElemStyle = togglevisibility(bImgElemStyle, document.getElementById('bImg'));
                   }
                    //Sets canvas to be filled with white
                    context.fillStyle = '#fff';
                    context.fillRect(0,0, canvas.width, canvas.height);
                    //Draws Park
                    context.drawImage(pImg, 0, 0,1515,700);
                    //Draws Ball
                    context.drawImage(bImg, ball.x, ball.y,ball.width,ball.height);
                    //Draws Dogs
                    context.drawImage(dogImgElem, dog.x, dog.y,dog.width,dog.height);
                    //Checks bounds. If ball y == 0 the ball moves down and if it is 650 the ball moves up. This lets the ball bounce back and forth.
                    if(ball.y <= 0){

                        ball.diry = 1;
                    } 
                    if(ball.y >= 650)
                    {
                        ball.diry = -1;  
                    } 
                       //Changes the x position of the ball by diry*5
                        ball.y += ball.diry*5;
                 }
              }, 5);
            }
        //exit function
        return;
    }