

// //helper variables to connect to global "competitionTicket" variables and money variables
// //VARIABLE FOR COMPETITION SCORES
// //VARIABLE FOR ADDING MONEY IF WON, MAP TO SCORES

// //competition activity:
// function competition(){
//     if (competitionTickets < 1){
//         //display popup saying the dog must be fed before going on walk
//     }
//     else{
//         startCompetition();
//     }
// }
// function startCompetition()){
//     //html -> go to park page, have dog walk across screen, go back to homepage
//     competitionTickets = competitionTickets - 1;

// }
// //txt file saving activity:
// const fsLibrary  = require('fs');
// })



//V2

//hides main menu items
document.getElementById("dogimg").removeChild(dogImgElem);
parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
//workbtnstyle = togglevisibility(workbtnstyle, document.getElementById('workBTN'));
//workhubbtn = togglevisibility(workhubbtn, document.getElementById('workhBTN'));
workhubbtnstyle = togglevisibility(workhubbtnstyle, document.getElementById('workhBTN'));

//create background image variable
var workImg = document.createElement('img');
workImg.src = "work.png";
workImg.style = "width: 100px; height: 100px; padding: 10;"
workImg.draggable = "true";
workImg.id = "workImg"
//draws background
context.fillStyle = '#fff';
context.drawImge(workImg, 0, 0, 1515, 700);

//end v2


function setupCompetition() {
    //#region competition store
    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    // turns off main menu

    if (inventorybtn.innerHTML == "Inventory") {
        inventorybtn.innerHTML = "Hub";
    }
}

//#region competition store
var competitionmenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 20%; text-align:center; position: absolute; left: 35%; top: 20%; visibility: hidden";
document.getElementById('competitionstore').style = competitionmenubackgroundstyle;

var competitionstoretitle = document.createElement("competitionstoretitle");
competitionstoretitle.innerText = "competition Store";
var competitionstoretitlestyle = "left: 50%; width: 100%; font-size: 50px;";
competitionstoretitle.style = competitionstoretitlestyle;

var competitionstoremenupinkcolbutton = document.createElement("button");
var competitionstoremenupinkcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 329px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenupinkcolbutton.style = competitionstoremenupinkcolbuttonstyle;
competitionstoremenupinkcolbutton.innerHTML = "BUY";
competitionstoremenupinkcolbutton.ondblclick = function () {
   if (money >= 25.0 && haspinkcollar == null) {
       haspinkcollar = new inventoryitem("pinkcollar", 1);
       competitionstoremenupinkcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 329px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenupinkcolbutton.style = competitionstoremenupinkcolbuttonstyle;
       competitionstoremenupinkcolbutton.innerHTML = "OWNED";
       competitionstoremenupinkcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 329px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenupinkcoldiv.style = competitionstoremenupinkcoldivstyle;
       updatemoney(-25.0);
       //TODO: append pinkcollar element to inventory menu.

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var competitionstoremenupinkcoldiv = document.createElement("div");
var competitionstoremenupinkcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 329px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenupinkcoldiv.style = competitionstoremenupinkcoldivstyle;
competitionstoremenupinkcoldiv.innerHTML = "Pink Collar $25";

var competitionstoremenugoldcolbutton = document.createElement("button");
var competitionstoremenugoldcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 285px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenugoldcolbutton.style = competitionstoremenugoldcolbuttonstyle;
competitionstoremenugoldcolbutton.innerHTML = "BUY";
competitionstoremenugoldcolbutton.ondblclick = function () {
   if (money >= 50.0 && hasgoldcollar == null) {
       hasgoldcollar = new inventoryitem("goldcollar", 1);
       competitionstoremenugoldcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 285px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenugoldcolbutton.style = competitionstoremenugoldcolbuttonstyle;
       competitionstoremenugoldcolbutton.innerHTML = "OWNED";
       competitionstoremenugoldcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 285px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenugoldcoldiv.style = competitionstoremenugoldcoldivstyle;
       updatemoney(-50.0);
       //TODO: append goldcollar element to inventory menu.

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var competitionstoremenugoldcoldiv = document.createElement("div");
var competitionstoremenugoldcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 285px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenugoldcoldiv.style = competitionstoremenugoldcoldivstyle;
competitionstoremenugoldcoldiv.innerHTML = "Gold Collar $50";

var competitionstoremenublackcolbutton = document.createElement("button");
var competitionstoremenublackcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 241px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenublackcolbutton.style = competitionstoremenublackcolbuttonstyle;
competitionstoremenublackcolbutton.innerHTML = "BUY";
competitionstoremenublackcolbutton.ondblclick = function () {
   if (money >= 25.0 && hasblackcollar == null) {
       hasblackcollar = new inventoryitem("blackcollar", 1);
       competitionstoremenublackcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 241px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenublackcolbutton.style = competitionstoremenublackcolbuttonstyle;
       competitionstoremenublackcolbutton.innerHTML = "OWNED";
       competitionstoremenublackcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 241px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenublackcoldiv.style = competitionstoremenublackcoldivstyle;
       updatemoney(-25.0);
       //TODO: append blackcollar element to inventory menu.

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var competitionstoremenublackcoldiv = document.createElement("div");
var competitionstoremenublackcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 241px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenublackcoldiv.style = competitionstoremenublackcoldivstyle;
competitionstoremenublackcoldiv.innerHTML = "Black Collar $25";

var competitionstoremenurainbowcolbutton = document.createElement("button");
var competitionstoremenurainbowcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 197px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenurainbowcolbutton.style = competitionstoremenurainbowcolbuttonstyle;
competitionstoremenurainbowcolbutton.innerHTML = "BUY";
competitionstoremenurainbowcolbutton.ondblclick = function () {
   if (money >= 50.0 && hasrainbowcollar == null) {
       hasrainbowcollar = new inventoryitem("rainbowcollar", 1);
       competitionstoremenurainbowcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 197px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenurainbowcolbutton.style = competitionstoremenurainbowcolbuttonstyle;
       competitionstoremenurainbowcolbutton.innerHTML = "OWNED";
       competitionstoremenurainbowcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 197px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenurainbowcoldiv.style = competitionstoremenurainbowcoldivstyle;
       updatemoney(-50.0);
       //TODO: append rainbowcollar element to inventory menu.

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var competitionstoremenurainbowcoldiv = document.createElement("div");
var competitionstoremenurainbowcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 197px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenurainbowcoldiv.style = competitionstoremenurainbowcoldivstyle;
competitionstoremenurainbowcoldiv.innerHTML = "Rainbow Collar $50";

var competitionstoremenubluecolbutton = document.createElement("button");
var competitionstoremenubluecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 153px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenubluecolbutton.style = competitionstoremenubluecolbuttonstyle;
competitionstoremenubluecolbutton.innerHTML = "BUY";
competitionstoremenubluecolbutton.ondblclick = function () {
   if (money >= 25.0 && hasbluecollar == null) {
       hasbluecollar = new inventoryitem("bluecollar", 1);
       competitionstoremenubluecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 153px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenubluecolbutton.style = competitionstoremenubluecolbuttonstyle;
       competitionstoremenubluecolbutton.innerHTML = "OWNED";
       competitionstoremenubluecoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 153px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenubluecoldiv.style = competitionstoremenubluecoldivstyle;
       updatemoney(-25.0);
       //TODO: append bluecollar element to inventory menu.

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var competitionstoremenubluecoldiv = document.createElement("div");
var competitionstoremenubluecoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 153px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenubluecoldiv.style = competitionstoremenubluecoldivstyle;
competitionstoremenubluecoldiv.innerHTML = "Blue Collar $25";

var competitionstoremenuwhitecolbutton = document.createElement("button");
var competitionstoremenuwhitecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 109px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenuwhitecolbutton.style = competitionstoremenuwhitecolbuttonstyle;
competitionstoremenuwhitecolbutton.innerHTML = "BUY";
competitionstoremenuwhitecolbutton.ondblclick = function () {
   if (money >= 25.0 && haswhitecollar == null) {
       haswhitecollar = new inventoryitem("whitecollar", 1);
       competitionstoremenuwhitecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 109px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenuwhitecolbutton.style = competitionstoremenuwhitecolbuttonstyle;
       competitionstoremenuwhitecolbutton.innerHTML = "OWNED";
       competitionstoremenuwhitecoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 109px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       competitionstoremenuwhitecoldiv.style = competitionstoremenuwhitecoldivstyle;
       updatemoney(-25.0);
       //TODO: append whitecollar element to inventory menu.

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var competitionstoremenuwhitecoldiv = document.createElement("div");
var competitionstoremenuwhitecoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 109px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
competitionstoremenuwhitecoldiv.style = competitionstoremenuwhitecoldivstyle;
competitionstoremenuwhitecoldiv.innerHTML = "White Collar $25";


var competitionstoremenuhubbtnbutton = document.createElement("button");
var competitionstoremenuhubbtnbuttonstyle = "right: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 5%; height: 75px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden;";
competitionstoremenuhubbtnbutton.style = competitionstoremenuhubbtnbuttonstyle;
competitionstoremenuhubbtnbutton.innerHTML = "Hub";
competitionstoremenuhubbtnbutton.ondblclick = function () {
   setupcompetitionStore();
}

document.getElementById('hubbtn').appendChild(competitionstoremenuhubbtnbutton);

document.getElementById('competitionstore').appendChild(competitionstoremenupinkcolbutton);
document.getElementById('competitionstore').appendChild(competitionstoremenupinkcoldiv);
document.getElementById('competitionstore').appendChild(competitionstoretitle);
document.getElementById('competitionstore').appendChild(competitionstoremenugoldcolbutton);
document.getElementById('competitionstore').appendChild(competitionstoremenugoldcoldiv);
document.getElementById('competitionstore').appendChild(competitionstoremenublackcolbutton);
document.getElementById('competitionstore').appendChild(competitionstoremenublackcoldiv);
document.getElementById('competitionstore').appendChild(competitionstoremenurainbowcolbutton);
document.getElementById('competitionstore').appendChild(competitionstoremenurainbowcoldiv);
document.getElementById('competitionstore').appendChild(competitionstoremenubluecolbutton);
document.getElementById('competitionstore').appendChild(competitionstoremenubluecoldiv);
document.getElementById('competitionstore').appendChild(competitionstoremenuwhitecolbutton);
document.getElementById('competitionstore').appendChild(competitionstoremenuwhitecoldiv);

//#endregion

//#region parkmenu initiators
var parkmenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 35%; text-align:center; position: absolute; left: 5%; top: 35%; visibility: visible";
//#region parkmenu title initiator
   var parkmenutitle = document.createElement("parkmenutitle");
   parkmenutitle.innerText = "Park";
   var parkmenutitlestyle = "left: 50%; width: 100%; font-size: 50px;";
   parkmenutitle.style = parkmenutitlestyle;
//#endregion

//#region storemenu initiators
var storemenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 35%; text-align:center; position: absolute; left: 35%; top: 35%; visibility: visible";
//#region storemenu title initiator
var storemenutitle = document.createElement("storemenutitle");
storemenutitle.innerText = "Store";
var storemenutitlestyle = "left: 50%; width: 100%; font-size: 50px;";
storemenutitle.style = storemenutitlestyle;
//#endregion







//#region homepage setup
document.getElementById('parkmenu').style = parkmenubackgroundstyle;
document.getElementById('parkmenu').appendChild(parkmenutitle);
document.getElementById('parkmenu').appendChild(parkmenucompetition);
document.getElementById('parkmenu').appendChild(parkmenufetch);
document.getElementById('parkmenu').appendChild(parkmenusocialize);
document.getElementById('parkmenu').appendChild(parkmenufrisbee);

document.getElementById('storemenu').style = storemenubackgroundstyle;
document.getElementById('storemenu').appendChild(storemenutitle);
document.getElementById('storemenu').appendChild(storemenufood);
document.getElementById('storemenu').appendChild(storemenuveterinary);
document.getElementById('storemenu').appendChild(storemenusport);
document.getElementById('storemenu').appendChild(storemenucompetition);

document.getElementById('actionmenu').style = actionmenubackgroundstyle;
document.getElementById('actionmenu').appendChild(actionmenutitle);
document.getElementById('actionmenu').appendChild(actionmenueat);
document.getElementById('actionmenu').appendChild(actionmenudrink);
document.getElementById('actionmenu').appendChild(actionmenuwalk);
document.getElementById('actionmenu').appendChild(actionmenuWork);
//#endregion


function setupCompetitionCaelan() { 
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
    bImg.src = "frisbee.png";
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

