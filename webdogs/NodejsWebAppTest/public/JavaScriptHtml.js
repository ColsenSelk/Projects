//import React from 'react';
//import ReactDOM from 'react-dom';

//#region skillpoints
var skillpoints = localStorage.getItem('skillpoints') || 0; //hidden number that determines the chance of winning the competition. updates when certain minigames are played
// ^ STORED IN DATABASE
/**
* @param {number} numb
*/
function updateskill(numb) {
   skillpoints = skillpoints + numb;
   localStorage.setItem('skillpoints', skillpoints);
}
//#endregion


//#region money
//#region money initiator
   var money = parseFloat(localStorage.getItem('money') || 50.00); //STORED IN DATABASE!
   var moneyElem = document.createElement("p");
   var moneyElemStyle = "right: 5%; top: 0%; width: 100px; height: 60px; text-align: center; line-height: 60px; font-size: 50px; color: #C9C9C9; position: absolute; visibility: visible;";
   moneyElem.style = moneyElemStyle;
   moneyElem.innerText = money.toFixed(2);
   document.getElementById('all').appendChild(moneyElem);
   var moneyElem2 = document.createElement("span");
   moneyElem2.innerHTML = "$";
   moneyElem2.style = "color: green;";
   moneyElem.appendChild(moneyElem2);
//#endregion

//#region update money function
/**
* adds numb to the amount of money and updates the money element
* @param {number} numb 
*/
function updatemoney(numb) {
   money = money + numb;
   localStorage.setItem('money', money);
   moneyElem.innerText = money.toFixed(2);
   moneyElem.appendChild(moneyElem2);
}
//#endregion
//#endregion


//#region equip variables THESE GO IN DATABASE
var frisbeeEquipped = localStorage.getItem('frisbee') || ""; //"bluefrisbee" or "elitefrisbee" or "pinkfrisbee" or "professionalfrisbee"
var fetchballEquipped = localStorage.getItem('ball') || ""; //"tennisball" or "baseball" or "bouncyball"
var collarEquipped = localStorage.getItem('collar') || ""; //"pinkcollar" or "goldcollar" or "blackcollar" or "rainbowcollar" or "bluecollar" or "whitecollar"
//#endregion

//#region dog image functions, variables, etc.
var dogtype = localStorage.getItem('dogType') || "B2"; //"B1" or "B2" or "L1" or "L2" or "P1" or "P2" or "S1" or "S2"
var dogmood = localStorage.getItem('dogMood') || "Joy"; // "Happy" or "Joy" or "Neutral" or "Sad"

var dogImgElem = document.createElement("img");
var dogImgElemStyle = "left: 5%; top: 3%; width: 18.5%; height: 14%; visibility: visible;";
var dogImgElemSrc = "B1Happy.png";
dogImgElem.src = dogImgElemSrc;
dogImgElem.style = dogImgElemStyle;
document.getElementById("dogimg").appendChild(dogImgElem);

/**
* @param {String} dogt
*/
function setDogType(dogt) {
   dogtype = dogt
   localStorage.setItem('dogType', dogtype);
   dogImgElemSrc = dogtype + dogmood + ".png";
   dogImgElem.src = dogImgElemSrc;
}

var repeaterdogmood;
function setDogMood() {
   //var overallstat = foodstat * 0.2 + waterstat * 0.2 + socialstat * 0.2 + happystat * 1.0; //max of 20 + 20 + 20 + 100 = 160
   if (healthstat <= 50) {
       dogmood = "Sad";
   }
   else if (happystat >= 85) {
       dogmood = "Joy"
   }
   else if (happystat >= 70) {
       dogmood = "Happy"
   }
   else if (happystat >= 40) {
       dogmood = "Neutral";
   }
   else {
       dogmood = "Sad";
   }
   
   localStorage.setItem('dogMood', dogmood);
   
   dogImgElemSrc = dogtype + dogmood + ".png";
   dogImgElem.src = dogImgElemSrc;
   repeaterdogmood = setTimeout(setDogMood, 5000);
}
setDogMood();
//#endregion



//#region equip functions
/**
* 
* @param {inventoryitem} item 
*/
function equipItem(item) {
   if (item.getitemname.includes("frisbee")) {
       frisbeeEquipped = item.getitemname;
       localStorage().setItem('frisbee', frisbeeEquipped);
   }
   else if (item.getitemname.includes("ball")) {
       fetchballEquipped = item.getitemname;
       localStorage().setItem('ball', fetchballEquipped);
   }
   else if (item.getitemname.includes("collar")) {
       collarEquipped = item.getitemname;
       localStorage().setItem('collar', collarEquipped);
   }
   else if (item == null) {
       // something went wrong, user probably doesn't have the item.
   }


}
//#endregion

class inventoryitem {
   /**
   * @param {string} itemname
   * @param {number} itemamount
   */
   constructor(itemname, itemamount) {
       this.itemname = itemname;
       this.itemamount = itemamount;
   }

   get getitemamount() {
       return this.itemamount;
   }
   
   get getitemname() {
       return this.itemname;
   }


}

//#region item variables THESE GO IN DATABASE
    var iterator = 0;

    var hasbluefrisbee = null; // new inventoryitem("bluefrisbee", 1);
    localStorage.setItem('hasbluefrisbee', hasbluefrisbee);
    var bluefrisbeeloc = -1;
    var haselitefrisbee = null;
    localStorage.setItem('haselitefrisbee', haselitefrisbee);
    var elitefrisbeeloc = -1;
    var haspinkfrisbee = null;
    localStorage.setItem('haspinkfrisbee', haspinkfrisbee);
    var pinkfrisbeeloc = -1;
    var hasprofessionalfrisbee = null;
    localStorage.setItem('hasprofessionalfrisbee', hasprofessionalfrisbee);
    var professionalfrisbeeloc = -1;
    var hastennisball = null;
    localStorage.setItem('hastennisball', hastennisball);
    var tennisballloc = -1;
    var hasbaseball = null;
    localStorage.setItem('hasbaseball', hasbaseball);
    var baseballloc = -1;
    var hasbouncyball = null;
    localStorage.setItem('hasbouncyball', hasbouncyball);
    var bouncyballloc = -1;
    var hascompetitionticket = null;
    localStorage.setItem('hascompetitionticket', hascompetitionticket);
    var competitionticketloc = -1;
    var haspinkcollar = null;
    localStorage.setItem('haspinkcollar', haspinkcollar);
    var pinkcollarloc = -1;
    var hasgoldcollar = null;
    localStorage.setItem('hasgoldcollar', hasgoldcollar);
    var goldcollarloc = -1;
    var hasblackcollar = null;
    localStorage.setItem('hasblackcollar', hasblackcollar);
    var blackcollarloc = -1;
    var hasrainbowcollar = null;
    localStorage.setItem('hasrainbowcollar', hasrainbowcollar);
    var rainbowcollarloc = -1;
    var hasbluecollar = null;
    localStorage.setItem('hasbluecollar', hasbluecollar);
    var bluecollarloc = -1;
    var haswhitecollar = null;
    localStorage.setItem('haswhitecollar', haswhitecollar);
    var whitecollarloc = -1;
    var hasfitnesswater = new inventoryitem("fitnesswater", 0);
    // localStorage.setItem('fitnesswater', fitnesswater);
    var fitnesswaterloc = -1;
    var hasbottledwater = new inventoryitem("bottledwater", 0);
    // localStorage.setItem('bottledwater', bottledwater);
    var bottledwaterloc = -1;
    var hasstandardfood = new inventoryitem("standardfood", 0);
    // localStorage.setItem('standardfood', standardfood);
    var standardfoodloc = -1;
    var hasgourmetfood = new inventoryitem("gourmetfood", 0);
    // localStorage.setItem('gourmetfood', gourmetfood);
    var gourmetfoodloc = -1;

//#endregion

//#region inventory
    /**
     * 
     * @param {String} tempvar 
     */
    function unequipfrisbeeinvmenu(tempvar) {
        if (frisbeeEquipped == "") {
            // do nothing
        }
        else if (frisbeeEquipped == "elitefrisbee" &&  tempvar != "elitefrisbee") {
            unequipelitefrisbeeinv();
        }
        else if (frisbeeEquipped == "pinkfrisbee" && tempvar != "pinkfrisbee") {
            unequippinkfrisbeeinv();
        }
        else if (frisbeeEquipped == "professionalfrisbee" && tempvar != "professionalfrisbee") {
            unequipprofessionalfrisbeeinv();
        }
        else if (frisbeeEquipped == "bluefrisbee" && tempvar != "bluefrisbee") {
            unequipbluefrisbeeinv();
        }
    }

    /**
     * 
     * @param {String} tempvar 
     */
     function unequipballinvmenu(tempvar) {
        if (fetchballEquipped == "") {
            // do nothing
        }
        else if (fetchballEquipped == "baseball" &&  tempvar != "baseball") {
            unequipbaseballinv();
        }
        else if (fetchballEquipped == "bouncyball" && tempvar != "bouncyball") {
            unequipbouncyballinv();
        }
        else if (fetchballEquipped == "tennisball" && tempvar != "tennisball") {
            unequiptennisballinv();
        }
    }

    /**
     * 
     * @param {String} tempvar 
     */
     function unequipcollarinvmenu(tempvar) {
        if (collarEquipped == "") {
            // do nothing
        }
        else if (collarEquipped == "blackcollar" &&  tempvar != "blackcollar") {
            unequipblackcollarinv();
        }
        else if (collarEquipped == "bluecollar" && tempvar != "bluecollar") {
            unequipbluecollarinv();
        }
        else if (collarEquipped == "goldcollar" && tempvar != "goldcollar") {
            unequipgoldcollarinv();
        }
        else if (collarEquipped == "pinkcollar" && tempvar != "pinkcollar") {
            unequippinkcollarinv();
        }
        else if (collarEquipped == "rainbowcollar" && tempvar != "rainbowcollar") {
            unequiprainbowcollarinv();
        }
        else if (collarEquipped == "whitecollar" && tempvar != "whitecollar") {
            unequipwhitecollarinv();
        }
    }

    
    

    //#region inventory button (for hubpage)
        var inventorybtn = document.createElement("button");
        var inventorybtnstyle = "right: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 5%; height: 75px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: visible;";
        inventorybtn.style = inventorybtnstyle;
        inventorybtn.innerHTML = "Inventory";
        inventorybtn.ondblclick = function () {
            setupInventory();
        }
        
        document.getElementById('hubbtn').appendChild(inventorybtn);
    //#endregion
    var inventorymenumenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 15%; text-align:center; position: absolute; left: 35%; top: 2%; visibility: hidden";
document.getElementById('inventorymenu').style = inventorymenumenubackgroundstyle;

var inventorymenutitle = document.createElement("inventorymenutitle");
inventorymenutitle.innerText = "Inventory";
var inventorymenutitlestyle = "left: 50%; width: 100%; font-size: 50px;";
inventorymenutitle.style = inventorymenutitlestyle;

var inventorymenumenuhubbtnbutton = document.createElement("button");
var inventorymenumenuhubbtnbuttonstyle = "right: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 5%; height: 75px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden;";
inventorymenumenuhubbtnbutton.style = inventorymenumenuhubbtnbuttonstyle;
inventorymenumenuhubbtnbutton.innerHTML = "Hub";
inventorymenumenuhubbtnbutton.ondblclick = function () {
    setupinventorymenu();
}

var inventorymenumenubluefrisbeebutton = document.createElement("button");
var inventorymenumenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubluefrisbeebutton.style = inventorymenumenubluefrisbeebuttonstyle;
inventorymenumenubluefrisbeebutton.innerHTML = "EQUIP";
inventorymenumenubluefrisbeebutton.ondblclick = function () {
    if (hasbluefrisbee != null) {
        unequipfrisbeeinvmenu("bluefrisbee");

        inventorymenumenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluefrisbeebutton.style = inventorymenumenubluefrisbeebuttonstyle;
        inventorymenumenubluefrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluefrisbeediv.style = inventorymenumenubluefrisbeedivstyle;

        frisbeeEquipped = "bluefrisbee";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipbluefrisbeeinv() {
    inventorymenumenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluefrisbeebutton.style = inventorymenumenubluefrisbeebuttonstyle;
    inventorymenumenubluefrisbeebutton.innerHTML = "EQUIP";
    inventorymenumenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluefrisbeediv.style = inventorymenumenubluefrisbeedivstyle;

    
}
function placebluefrisbeeLoc() {
    iterator = iterator + 1;
    bluefrisbeeloc = iterator;
    inventorymenumenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluefrisbeebutton.style = inventorymenumenubluefrisbeebuttonstyle;
    inventorymenumenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluefrisbeediv.style = inventorymenumenubluefrisbeedivstyle;

    if (frisbeeEquipped == "bluefrisbee") {
        inventorymenumenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluefrisbeebutton.style = inventorymenumenubluefrisbeebuttonstyle;
        inventorymenumenubluefrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluefrisbeediv.style = inventorymenumenubluefrisbeedivstyle;
    }
}
function movedownbluefrisbeeLoc() {
    bluefrisbeeloc = bluefrisbeeloc - 1;
    inventorymenumenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluefrisbeebutton.style = inventorymenumenubluefrisbeebuttonstyle;
    inventorymenumenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluefrisbeediv.style = inventorymenumenubluefrisbeedivstyle;

    if (frisbeeEquipped == "bluefrisbee") {
        inventorymenumenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluefrisbeebutton.style = inventorymenumenubluefrisbeebuttonstyle;
        inventorymenumenubluefrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bluefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluefrisbeediv.style = inventorymenumenubluefrisbeedivstyle;
    }
}

var inventorymenumenubluefrisbeediv = document.createElement("div");
var inventorymenumenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubluefrisbeediv.style = inventorymenumenubluefrisbeedivstyle;
inventorymenumenubluefrisbeediv.innerHTML = "Blue Frisbee";



var inventorymenumenucompetitionticketbutton = document.createElement("button");
var inventorymenumenucompetitionticketbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenucompetitionticketbutton.style = inventorymenumenucompetitionticketbuttonstyle;
inventorymenumenucompetitionticketbutton.innerHTML = "1/1";
inventorymenumenucompetitionticketbutton.ondblclick = function () {
    //does nothing
}

function updatecompetitionticketquantity() {
    if (hascompetitionticket != null) {
        inventorymenumenucompetitionticketbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - competitionticketloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenucompetitionticketbutton.style = inventorymenumenucompetitionticketbuttonstyle;
        inventorymenumenucompetitionticketbutton.innerHTML = hascompetitionticket.getitemamount.toString() + "/1";
        inventorymenumenucompetitionticketdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 30px; bottom: " + (550 - competitionticketloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenucompetitionticketdiv.style = inventorymenumenucompetitionticketdivstyle;
        
    } else {
        unplacecompetitionticketLoc();
    }
}

function placecompetitionticketLoc() {
    iterator = iterator + 1;
    competitionticketloc = iterator;
    inventorymenumenucompetitionticketbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - competitionticketloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenucompetitionticketbutton.style = inventorymenumenucompetitionticketbuttonstyle;
    inventorymenumenucompetitionticketdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - competitionticketloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenucompetitionticketdiv.style = inventorymenumenucompetitionticketdivstyle;
}
function movedowncompetitionticketLoc() {
    competitionticketloc = competitionticketloc - 1;
    inventorymenumenucompetitionticketbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - competitionticketloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenucompetitionticketbutton.style = inventorymenumenucompetitionticketbuttonstyle;
    inventorymenumenucompetitionticketdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - competitionticketloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenucompetitionticketdiv.style = inventorymenumenucompetitionticketdivstyle;
}
function unplacecompetitionticketLoc() {
    if(competitionticketloc < baseballloc) {
        movedownbaseballLoc();
    }
    if(competitionticketloc < blackcollarloc) {
        movedownblackcollarLoc();
    }
    if(competitionticketloc < bluecollarloc) {
        movedownbluecollarLoc();
    }
    if(competitionticketloc < bottledwaterloc) {
        movedownbottledwaterLoc();
    }
    if(competitionticketloc < bouncyballloc) {
        movedownbouncyballLoc();
    }
    if(competitionticketloc < elitefrisbeeloc) {
        movedownelitefrisbeeLoc();
    }
    if(competitionticketloc < fitnesswaterloc) {
        movedownfitnesswaterLoc();
    }
    if(competitionticketloc < goldcollarloc) {
        movedowngoldcollarLoc();
    }
    if(competitionticketloc < gourmetfoodloc) {
        movedowngourmetfoodLoc();
    }
    if(competitionticketloc < pinkcollarloc) {
        movedownpinkcollarLoc();
    }
    if(competitionticketloc < pinkfrisbeeloc) {
        movedownpinkfrisbeeLoc();
    }
    if(competitionticketloc < professionalfrisbeeloc) {
        movedownprofessionalfrisbeeLoc();
    }
    if(competitionticketloc < rainbowcollarloc) {
        movedownrainbowcollarLoc();
    }
    if(competitionticketloc < standardfoodloc) {
        movedownstandardfoodLoc();
    }
    if(competitionticketloc < tennisballloc) {
        movedowntennisballLoc();
    }
    if(competitionticketloc < whitecollarloc) {
        movedownwhitecollarLoc();
    }
    if(competitionticketloc < bluefrisbeeloc) {
        movedownbluefrisbeeLoc();
    }

    competitionticketloc = -1;
    inventorymenumenucompetitionticketbuttonstyle = "visibility: hidden";
    inventorymenumenucompetitionticketbutton.style = inventorymenumenucompetitionticketbuttonstyle;
    inventorymenumenucompetitionticketdivstyle = "visibility: hidden";
    inventorymenumenucompetitionticketdiv.style = inventorymenumenucompetitionticketdivstyle;



    iterator = iterator - 1;

}

var inventorymenumenucompetitionticketdiv = document.createElement("div");
var inventorymenumenucompetitionticketdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenucompetitionticketdiv.style = inventorymenumenucompetitionticketdivstyle;
inventorymenumenucompetitionticketdiv.innerHTML = "Competition Ticket";

var inventorymenumenugourmetfoodbutton = document.createElement("button");
var inventorymenumenugourmetfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenugourmetfoodbutton.style = inventorymenumenugourmetfoodbuttonstyle;
inventorymenumenugourmetfoodbutton.innerHTML = "1/5";
inventorymenumenugourmetfoodbutton.ondblclick = function gourmetfoodbutton () {
    if (hasgourmetfood != null) {
        hasgourmetfood.itemamount = hasgourmetfood.itemamount - 1;

        updategourmetfoodquantity();

        addfoodstat(25);
        addhappystat(5);
        
    } else {
        //shouldn't execute.
    }
}

function updategourmetfoodquantity() {
    inventorymenumenugourmetfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - gourmetfoodloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugourmetfoodbutton.style = inventorymenumenugourmetfoodbuttonstyle;
    inventorymenumenugourmetfoodbutton.innerHTML = hasgourmetfood.getitemamount.toString() + "/5";
    inventorymenumenugourmetfooddivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - gourmetfoodloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugourmetfooddiv.style = inventorymenumenugourmetfooddivstyle;

    if (hasgourmetfood.getitemamount == 0) {
        unplacegourmetfoodLoc();
    }

    foodstoremenugourmetfoodcount.innerHTML = hasgourmetfood.getitemamount.toString() + "/5";
}

function placegourmetfoodLoc() {
    iterator = iterator + 1;
    gourmetfoodloc = iterator;
    inventorymenumenugourmetfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - gourmetfoodloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugourmetfoodbutton.style = inventorymenumenugourmetfoodbuttonstyle;
    inventorymenumenugourmetfooddivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - gourmetfoodloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugourmetfooddiv.style = inventorymenumenugourmetfooddivstyle;
}
function movedowngourmetfoodLoc() {
    gourmetfoodloc = gourmetfoodloc - 1;
    inventorymenumenugourmetfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - gourmetfoodloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugourmetfoodbutton.style = inventorymenumenugourmetfoodbuttonstyle;
    inventorymenumenugourmetfooddivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - gourmetfoodloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugourmetfooddiv.style = inventorymenumenugourmetfooddivstyle;
}
function unplacegourmetfoodLoc() {
    if(gourmetfoodloc < baseballloc) {
        movedownbaseballLoc();
    }
    if(gourmetfoodloc < blackcollarloc) {
        movedownblackcollarLoc();
    }
    if(gourmetfoodloc < bluecollarloc) {
        movedownbluecollarLoc();
    }
    if(gourmetfoodloc < bottledwaterloc) {
        movedownbottledwaterLoc();
    }
    if(gourmetfoodloc < bouncyballloc) {
        movedownbouncyballLoc();
    }
    if(gourmetfoodloc < elitefrisbeeloc) {
        movedownelitefrisbeeLoc();
    }
    if(gourmetfoodloc < fitnesswaterloc) {
        movedownfitnesswaterLoc();
    }
    if(gourmetfoodloc < goldcollarloc) {
        movedowngoldcollarLoc();
    }
    if(gourmetfoodloc < competitionticketloc) {
        movedowncompetitionticketLoc();
    }
    if(gourmetfoodloc < pinkcollarloc) {
        movedownpinkcollarLoc();
    }
    if(gourmetfoodloc < pinkfrisbeeloc) {
        movedownpinkfrisbeeLoc();
    }
    if(gourmetfoodloc < professionalfrisbeeloc) {
        movedownprofessionalfrisbeeLoc();
    }
    if(gourmetfoodloc < rainbowcollarloc) {
        movedownrainbowcollarLoc();
    }
    if(gourmetfoodloc < standardfoodloc) {
        movedownstandardfoodLoc();
    }
    if(gourmetfoodloc < tennisballloc) {
        movedowntennisballLoc();
    }
    if(gourmetfoodloc < whitecollarloc) {
        movedownwhitecollarLoc();
    }
    if(gourmetfoodloc < bluefrisbeeloc) {
        movedownbluefrisbeeLoc();
    }

    
    

    gourmetfoodloc = -1;
    inventorymenumenugourmetfoodbuttonstyle = "visibility: hidden";
    inventorymenumenugourmetfoodbutton.style = inventorymenumenugourmetfoodbuttonstyle;
    inventorymenumenugourmetfooddivstyle = "visibility: hidden";
    inventorymenumenugourmetfooddiv.style = inventorymenumenugourmetfooddivstyle;



    iterator = iterator - 1;
}

var inventorymenumenugourmetfooddiv = document.createElement("div");
var inventorymenumenugourmetfooddivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenugourmetfooddiv.style = inventorymenumenugourmetfooddivstyle;
inventorymenumenugourmetfooddiv.innerHTML = "Gourmet Dog Food";

var inventorymenumenustandardfoodbutton = document.createElement("button");
var inventorymenumenustandardfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenustandardfoodbutton.style = inventorymenumenustandardfoodbuttonstyle;
inventorymenumenustandardfoodbutton.innerHTML = "1/5";
inventorymenumenustandardfoodbutton.ondblclick = function () {
    if (hasstandardfood != null) {
        hasstandardfood.itemamount = hasstandardfood.itemamount - 1;

        updatestandardfoodquantity();

        addfoodstat(15);
        addhappystat(-5);
        
    } else {
        //shouldn't execute.
    }
}

function updatestandardfoodquantity() {
    inventorymenumenustandardfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - standardfoodloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenustandardfoodbutton.style = inventorymenumenustandardfoodbuttonstyle;
    inventorymenumenustandardfoodbutton.innerHTML = hasstandardfood.getitemamount.toString() + "/5";
    inventorymenumenustandardfooddivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - standardfoodloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenustandardfooddiv.style = inventorymenumenustandardfooddivstyle;

    if (hasstandardfood.getitemamount == 0) {
        unplacestandardfoodLoc();
    }

    foodstoremenustandardfoodcount.innerHTML = hasstandardfood.getitemamount.toString() + "/5";
}

function placestandardfoodLoc() {
    iterator = iterator + 1;
    standardfoodloc = iterator;
    inventorymenumenustandardfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - standardfoodloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenustandardfoodbutton.style = inventorymenumenustandardfoodbuttonstyle;
    inventorymenumenustandardfooddivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - standardfoodloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenustandardfooddiv.style = inventorymenumenustandardfooddivstyle;
}
function movedownstandardfoodLoc() {
    standardfoodloc = standardfoodloc - 1;
    inventorymenumenustandardfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - standardfoodloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenustandardfoodbutton.style = inventorymenumenustandardfoodbuttonstyle;
    inventorymenumenustandardfooddivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - standardfoodloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenustandardfooddiv.style = inventorymenumenustandardfooddivstyle;
}
function unplacestandardfoodLoc() {
    if(standardfoodloc < baseballloc) {
        movedownbaseballLoc();
    }
    if(standardfoodloc < blackcollarloc) {
        movedownblackcollarLoc();
    }
    if(standardfoodloc < bluecollarloc) {
        movedownbluecollarLoc();
    }
    if(standardfoodloc < bottledwaterloc) {
        movedownbottledwaterLoc();
    }
    if(standardfoodloc < bouncyballloc) {
        movedownbouncyballLoc();
    }
    if(standardfoodloc < elitefrisbeeloc) {
        movedownelitefrisbeeLoc();
    }
    if(standardfoodloc < fitnesswaterloc) {
        movedownfitnesswaterLoc();
    }
    if(standardfoodloc < goldcollarloc) {
        movedowngoldcollarLoc();
    }
    if(standardfoodloc < competitionticketloc) {
        movedowncompetitionticketLoc();
    }
    if(standardfoodloc < pinkcollarloc) {
        movedownpinkcollarLoc();
    }
    if(standardfoodloc < pinkfrisbeeloc) {
        movedownpinkfrisbeeLoc();
    }
    if(standardfoodloc < professionalfrisbeeloc) {
        movedownprofessionalfrisbeeLoc();
    }
    if(standardfoodloc < rainbowcollarloc) {
        movedownrainbowcollarLoc();
    }
    if(standardfoodloc < gourmetfoodloc) {
        movedowngourmetfoodLoc();
    }
    if(standardfoodloc < tennisballloc) {
        movedowntennisballLoc();
    }
    if(standardfoodloc < whitecollarloc) {
        movedownwhitecollarLoc();
    }
    if(standardfoodloc < bluefrisbeeloc) {
        movedownbluefrisbeeLoc();
    }
    

    standardfoodloc = -1;
    inventorymenumenustandardfoodbuttonstyle = "visibility: hidden";
    inventorymenumenustandardfoodbutton.style = inventorymenumenustandardfoodbuttonstyle;
    inventorymenumenustandardfooddivstyle = "visibility: hidden";
    inventorymenumenustandardfooddiv.style = inventorymenumenustandardfooddivstyle;



    iterator = iterator - 1;
}

var inventorymenumenustandardfooddiv = document.createElement("div");
var inventorymenumenustandardfooddivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenustandardfooddiv.style = inventorymenumenustandardfooddivstyle;
inventorymenumenustandardfooddiv.innerHTML = "Standard Dog Food";

//
var inventorymenumenubottledwaterbutton = document.createElement("button");
var inventorymenumenubottledwaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubottledwaterbutton.style = inventorymenumenubottledwaterbuttonstyle;
inventorymenumenubottledwaterbutton.innerHTML = "1/5";
inventorymenumenubottledwaterbutton.ondblclick = function () {
    if (hasbottledwater != null) {
        hasbottledwater.itemamount = hasbottledwater.itemamount - 1;

        updatebottledwaterquantity();

        addwaterstat(20);
        //addhappystat(5);
        
    } else {
        //shouldn't execute.
    }
}

function updatebottledwaterquantity() {
    inventorymenumenubottledwaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bottledwaterloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubottledwaterbutton.style = inventorymenumenubottledwaterbuttonstyle;
    inventorymenumenubottledwaterbutton.innerHTML = hasbottledwater.getitemamount.toString() + "/5";
    inventorymenumenubottledwaterdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bottledwaterloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubottledwaterdiv.style = inventorymenumenubottledwaterdivstyle;

    if (hasbottledwater.getitemamount == 0) {
        unplacebottledwaterLoc();
    }

    foodstoremenubottledwatercount.innerHTML = hasbottledwater.getitemamount.toString() + "/5";
}

function placebottledwaterLoc() {
    iterator = iterator + 1;
    bottledwaterloc = iterator;
    inventorymenumenubottledwaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bottledwaterloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubottledwaterbutton.style = inventorymenumenubottledwaterbuttonstyle;
    inventorymenumenubottledwaterdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bottledwaterloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubottledwaterdiv.style = inventorymenumenubottledwaterdivstyle;
}
function movedownbottledwaterLoc() {
    bottledwaterloc = bottledwaterloc - 1;
    inventorymenumenubottledwaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bottledwaterloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubottledwaterbutton.style = inventorymenumenubottledwaterbuttonstyle;
    inventorymenumenubottledwaterdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bottledwaterloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubottledwaterdiv.style = inventorymenumenubottledwaterdivstyle;
}
function unplacebottledwaterLoc() {
    if(bottledwaterloc < baseballloc) {
        movedownbaseballLoc();
    }
    if(bottledwaterloc < blackcollarloc) {
        movedownblackcollarLoc();
    }
    if(bottledwaterloc < bluecollarloc) {
        movedownbluecollarLoc();
    }
    if(bottledwaterloc < standardfoodloc) {
        movedownstandardfoodLoc();
    }
    if(bottledwaterloc < bouncyballloc) {
        movedownbouncyballLoc();
    }
    if(bottledwaterloc < elitefrisbeeloc) {
        movedownelitefrisbeeLoc();
    }
    if(bottledwaterloc < fitnesswaterloc) {
        movedownfitnesswaterLoc();
    }
    if(bottledwaterloc < goldcollarloc) {
        movedowngoldcollarLoc();
    }
    if(bottledwaterloc < competitionticketloc) {
        movedowncompetitionticketLoc();
    }
    if(bottledwaterloc < pinkcollarloc) {
        movedownpinkcollarLoc();
    }
    if(bottledwaterloc < pinkfrisbeeloc) {
        movedownpinkfrisbeeLoc();
    }
    if(bottledwaterloc < professionalfrisbeeloc) {
        movedownprofessionalfrisbeeLoc();
    }
    if(bottledwaterloc < rainbowcollarloc) {
        movedownrainbowcollarLoc();
    }
    if(bottledwaterloc < gourmetfoodloc) {
        movedowngourmetfoodLoc();
    }
    if(bottledwaterloc < tennisballloc) {
        movedowntennisballLoc();
    }
    if(bottledwaterloc < whitecollarloc) {
        movedownwhitecollarLoc();
    }
    if(bottledwaterloc < bluefrisbeeloc) {
        movedownbluefrisbeeLoc();
    }
    

    bottledwaterloc = -1;
    inventorymenumenubottledwaterbuttonstyle = "visibility: hidden";
    inventorymenumenubottledwaterbutton.style = inventorymenumenubottledwaterbuttonstyle;
    inventorymenumenubottledwaterdivstyle = "visibility: hidden";
    inventorymenumenubottledwaterdiv.style = inventorymenumenubottledwaterdivstyle;



    iterator = iterator - 1;
}

var inventorymenumenubottledwaterdiv = document.createElement("div");
var inventorymenumenubottledwaterdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubottledwaterdiv.style = inventorymenumenubottledwaterdivstyle;
inventorymenumenubottledwaterdiv.innerHTML = "Bottled Water";

//
var inventorymenumenupinkfrisbeebutton = document.createElement("button");
var inventorymenumenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenupinkfrisbeebutton.style = inventorymenumenupinkfrisbeebuttonstyle;
inventorymenumenupinkfrisbeebutton.innerHTML = "EQUIP";
inventorymenumenupinkfrisbeebutton.ondblclick = function pinkfrisbeebutton () {
    if (haspinkfrisbee != null) {
        unequipfrisbeeinvmenu("pinkfrisbee");

        inventorymenumenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkfrisbeebutton.style = inventorymenumenupinkfrisbeebuttonstyle;
        inventorymenumenupinkfrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkfrisbeediv.style = inventorymenumenupinkfrisbeedivstyle;

        frisbeeEquipped = "pinkfrisbee";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequippinkfrisbeeinv() {
    inventorymenumenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkfrisbeebutton.style = inventorymenumenupinkfrisbeebuttonstyle;
    inventorymenumenupinkfrisbeebutton.innerHTML = "EQUIP";
    inventorymenumenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkfrisbeediv.style = inventorymenumenupinkfrisbeedivstyle;
}
function placepinkfrisbeeLoc() {
    iterator = iterator + 1;
    pinkfrisbeeloc = iterator;
    inventorymenumenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkfrisbeebutton.style = inventorymenumenupinkfrisbeebuttonstyle;
    inventorymenumenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkfrisbeediv.style = inventorymenumenupinkfrisbeedivstyle;

    if (frisbeeEquipped == "pinkfrisbee") {
        inventorymenumenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkfrisbeebutton.style = inventorymenumenupinkfrisbeebuttonstyle;
        inventorymenumenupinkfrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkfrisbeediv.style = inventorymenumenupinkfrisbeedivstyle;
    }
}
function movedownpinkfrisbeeLoc() {
    pinkfrisbeeloc = pinkfrisbeeloc - 1;
    inventorymenumenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkfrisbeebutton.style = inventorymenumenupinkfrisbeebuttonstyle;
    inventorymenumenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkfrisbeediv.style = inventorymenumenupinkfrisbeedivstyle;

    if (frisbeeEquipped == "pinkfrisbee") {
        inventorymenumenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkfrisbeebutton.style = inventorymenumenupinkfrisbeebuttonstyle;
        inventorymenumenupinkfrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - pinkfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkfrisbeediv.style = inventorymenumenupinkfrisbeedivstyle;
    }
}

var inventorymenumenupinkfrisbeediv = document.createElement("div");
var inventorymenumenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenupinkfrisbeediv.style = inventorymenumenupinkfrisbeedivstyle;
inventorymenumenupinkfrisbeediv.innerHTML = "Pink Frisbee";

//
var inventorymenumenuelitefrisbeebutton = document.createElement("button");
var inventorymenumenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenuelitefrisbeebutton.style = inventorymenumenuelitefrisbeebuttonstyle;
inventorymenumenuelitefrisbeebutton.innerHTML = "EQUIP";
inventorymenumenuelitefrisbeebutton.ondblclick = function () {
    if (haselitefrisbee != null) {
        unequipfrisbeeinvmenu("elitefrisbee");

        inventorymenumenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuelitefrisbeebutton.style = inventorymenumenuelitefrisbeebuttonstyle;
        inventorymenumenuelitefrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuelitefrisbeediv.style = inventorymenumenuelitefrisbeedivstyle;

        frisbeeEquipped = "elitefrisbee";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipelitefrisbeeinv() {
    inventorymenumenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuelitefrisbeebutton.style = inventorymenumenuelitefrisbeebuttonstyle;
    inventorymenumenuelitefrisbeebutton.innerHTML = "EQUIP";
    inventorymenumenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuelitefrisbeediv.style = inventorymenumenuelitefrisbeedivstyle;
}
function placeelitefrisbeeLoc() {
    iterator = iterator + 1;
    elitefrisbeeloc = iterator;
    inventorymenumenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuelitefrisbeebutton.style = inventorymenumenuelitefrisbeebuttonstyle;
    inventorymenumenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuelitefrisbeediv.style = inventorymenumenuelitefrisbeedivstyle;

    if (frisbeeEquipped == "elitefrisbee") {
        inventorymenumenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuelitefrisbeebutton.style = inventorymenumenuelitefrisbeebuttonstyle;
        inventorymenumenuelitefrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuelitefrisbeediv.style = inventorymenumenuelitefrisbeedivstyle;
    }
}
function movedownelitefrisbeeLoc() {
    elitefrisbeeloc = elitefrisbeeloc - 1;
    inventorymenumenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuelitefrisbeebutton.style = inventorymenumenuelitefrisbeebuttonstyle;
    inventorymenumenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuelitefrisbeediv.style = inventorymenumenuelitefrisbeedivstyle;

    if (frisbeeEquipped == "elitefrisbee") {
        inventorymenumenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuelitefrisbeebutton.style = inventorymenumenuelitefrisbeebuttonstyle;
        inventorymenumenuelitefrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - elitefrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuelitefrisbeediv.style = inventorymenumenuelitefrisbeedivstyle;
    }
}

var inventorymenumenuelitefrisbeediv = document.createElement("div");
var inventorymenumenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenuelitefrisbeediv.style = inventorymenumenuelitefrisbeedivstyle;
inventorymenumenuelitefrisbeediv.innerHTML = "Elite Frisbee";

//
var inventorymenumenuprofessionalfrisbeebutton = document.createElement("button");
var inventorymenumenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenuprofessionalfrisbeebutton.style = inventorymenumenuprofessionalfrisbeebuttonstyle;
inventorymenumenuprofessionalfrisbeebutton.innerHTML = "EQUIP";
inventorymenumenuprofessionalfrisbeebutton.ondblclick = function () {
    if (hasprofessionalfrisbee != null) {
        unequipfrisbeeinvmenu("professionalfrisbee");

        inventorymenumenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuprofessionalfrisbeebutton.style = inventorymenumenuprofessionalfrisbeebuttonstyle;
        inventorymenumenuprofessionalfrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuprofessionalfrisbeediv.style = inventorymenumenuprofessionalfrisbeedivstyle;

        frisbeeEquipped = "professionalfrisbee";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipprofessionalfrisbeeinv() {
    inventorymenumenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuprofessionalfrisbeebutton.style = inventorymenumenuprofessionalfrisbeebuttonstyle;
    inventorymenumenuprofessionalfrisbeebutton.innerHTML = "EQUIP";
    inventorymenumenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuprofessionalfrisbeediv.style = inventorymenumenuprofessionalfrisbeedivstyle;
}
function placeprofessionalfrisbeeLoc() {
    iterator = iterator + 1;
    professionalfrisbeeloc = iterator;
    inventorymenumenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuprofessionalfrisbeebutton.style = inventorymenumenuprofessionalfrisbeebuttonstyle;
    inventorymenumenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuprofessionalfrisbeediv.style = inventorymenumenuprofessionalfrisbeedivstyle;

    if (frisbeeEquipped == "professionalfrisbee") {
        inventorymenumenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuprofessionalfrisbeebutton.style = inventorymenumenuprofessionalfrisbeebuttonstyle;
        inventorymenumenuprofessionalfrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuprofessionalfrisbeediv.style = inventorymenumenuprofessionalfrisbeedivstyle;
    }
}
function movedownprofessionalfrisbeeLoc() {
    professionalfrisbeeloc = professionalfrisbeeloc - 1;
    inventorymenumenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuprofessionalfrisbeebutton.style = inventorymenumenuprofessionalfrisbeebuttonstyle;
    inventorymenumenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuprofessionalfrisbeediv.style = inventorymenumenuprofessionalfrisbeedivstyle;

    if (frisbeeEquipped == "professionalfrisbee") {
        inventorymenumenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuprofessionalfrisbeebutton.style = inventorymenumenuprofessionalfrisbeebuttonstyle;
        inventorymenumenuprofessionalfrisbeebutton.innerHTML = "EQUIPPED";
        inventorymenumenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - professionalfrisbeeloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuprofessionalfrisbeediv.style = inventorymenumenuprofessionalfrisbeedivstyle;
    }
}

var inventorymenumenuprofessionalfrisbeediv = document.createElement("div");
var inventorymenumenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenuprofessionalfrisbeediv.style = inventorymenumenuprofessionalfrisbeedivstyle;
inventorymenumenuprofessionalfrisbeediv.innerHTML = "Professional Frisbee";

var inventorymenumenubaseballbutton = document.createElement("button");
var inventorymenumenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubaseballbutton.style = inventorymenumenubaseballbuttonstyle;
inventorymenumenubaseballbutton.innerHTML = "EQUIP";
inventorymenumenubaseballbutton.ondblclick = function () {
    if (hasbaseball != null) {
        unequipballinvmenu("baseball");

        inventorymenumenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubaseballbutton.style = inventorymenumenubaseballbuttonstyle;
        inventorymenumenubaseballbutton.innerHTML = "EQUIPPED";
        inventorymenumenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubaseballdiv.style = inventorymenumenubaseballdivstyle;

        fetchballEquipped = "baseball";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipbaseballinv() {
    inventorymenumenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubaseballbutton.style = inventorymenumenubaseballbuttonstyle;
    inventorymenumenubaseballbutton.innerHTML = "EQUIP";
    inventorymenumenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubaseballdiv.style = inventorymenumenubaseballdivstyle;
}
function placebaseballLoc() {
    iterator = iterator + 1;
    baseballloc = iterator;
    inventorymenumenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubaseballbutton.style = inventorymenumenubaseballbuttonstyle;
    inventorymenumenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubaseballdiv.style = inventorymenumenubaseballdivstyle;

    if (fetchballEquipped == "baseball") {
        inventorymenumenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubaseballbutton.style = inventorymenumenubaseballbuttonstyle;
        inventorymenumenubaseballbutton.innerHTML = "EQUIPPED";
        inventorymenumenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubaseballdiv.style = inventorymenumenubaseballdivstyle;
    }
}
function movedownbaseballLoc() {
    baseballloc = baseballloc - 1;
    inventorymenumenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubaseballbutton.style = inventorymenumenubaseballbuttonstyle;
    inventorymenumenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubaseballdiv.style = inventorymenumenubaseballdivstyle;

    if (fetchballEquipped == "baseball") {
        inventorymenumenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubaseballbutton.style = inventorymenumenubaseballbuttonstyle;
        inventorymenumenubaseballbutton.innerHTML = "EQUIPPED";
        inventorymenumenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - baseballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubaseballdiv.style = inventorymenumenubaseballdivstyle;
    }
}

var inventorymenumenubaseballdiv = document.createElement("div");
var inventorymenumenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubaseballdiv.style = inventorymenumenubaseballdivstyle;
inventorymenumenubaseballdiv.innerHTML = "Baseball";

var inventorymenumenutennisballbutton = document.createElement("button");
var inventorymenumenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenutennisballbutton.style = inventorymenumenutennisballbuttonstyle;
inventorymenumenutennisballbutton.innerHTML = "EQUIP";
inventorymenumenutennisballbutton.ondblclick = function () {
    if (hastennisball != null) {
        unequipballinvmenu("tennisball");

        inventorymenumenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenutennisballbutton.style = inventorymenumenutennisballbuttonstyle;
        inventorymenumenutennisballbutton.innerHTML = "EQUIPPED";
        inventorymenumenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenutennisballdiv.style = inventorymenumenutennisballdivstyle;

        fetchballEquipped = "tennisball";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequiptennisballinv() {
    inventorymenumenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenutennisballbutton.style = inventorymenumenutennisballbuttonstyle;
    inventorymenumenutennisballbutton.innerHTML = "EQUIP";
    inventorymenumenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenutennisballdiv.style = inventorymenumenutennisballdivstyle;
}
function placetennisballLoc() {
    iterator = iterator + 1;
    tennisballloc = iterator;
    inventorymenumenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenutennisballbutton.style = inventorymenumenutennisballbuttonstyle;
    inventorymenumenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenutennisballdiv.style = inventorymenumenutennisballdivstyle;

    if (fetchballEquipped == "tennisball") {
        inventorymenumenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenutennisballbutton.style = inventorymenumenutennisballbuttonstyle;
        inventorymenumenutennisballbutton.innerHTML = "EQUIPPED";
        inventorymenumenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenutennisballdiv.style = inventorymenumenutennisballdivstyle;
    }
}
function movedowntennisballLoc() {
    tennisballloc = tennisballloc - 1;
    inventorymenumenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenutennisballbutton.style = inventorymenumenutennisballbuttonstyle;
    inventorymenumenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenutennisballdiv.style = inventorymenumenutennisballdivstyle;

    if (fetchballEquipped == "tennisball") {
        inventorymenumenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenutennisballbutton.style = inventorymenumenutennisballbuttonstyle;
        inventorymenumenutennisballbutton.innerHTML = "EQUIPPED";
        inventorymenumenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - tennisballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenutennisballdiv.style = inventorymenumenutennisballdivstyle;
    }
}

var inventorymenumenutennisballdiv = document.createElement("div");
var inventorymenumenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenutennisballdiv.style = inventorymenumenutennisballdivstyle;
inventorymenumenutennisballdiv.innerHTML = "Tennis Ball";

var inventorymenumenubouncyballbutton = document.createElement("button");
var inventorymenumenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubouncyballbutton.style = inventorymenumenubouncyballbuttonstyle;
inventorymenumenubouncyballbutton.innerHTML = "EQUIP";
inventorymenumenubouncyballbutton.ondblclick = function () {
    if (hasbouncyball != null) {
        unequipballinvmenu("bouncyball");

        inventorymenumenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubouncyballbutton.style = inventorymenumenubouncyballbuttonstyle;
        inventorymenumenubouncyballbutton.innerHTML = "EQUIPPED";
        inventorymenumenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubouncyballdiv.style = inventorymenumenubouncyballdivstyle;

        fetchballEquipped = "bouncyball";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipbouncyballinv() {
    inventorymenumenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubouncyballbutton.style = inventorymenumenubouncyballbuttonstyle;
    inventorymenumenubouncyballbutton.innerHTML = "EQUIP";
    inventorymenumenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubouncyballdiv.style = inventorymenumenubouncyballdivstyle;
}
function placebouncyballLoc() {
    iterator = iterator + 1;
    bouncyballloc = iterator;
    inventorymenumenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubouncyballbutton.style = inventorymenumenubouncyballbuttonstyle;
    inventorymenumenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubouncyballdiv.style = inventorymenumenubouncyballdivstyle;

    if (fetchballEquipped == "bouncyball") {
        inventorymenumenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubouncyballbutton.style = inventorymenumenubouncyballbuttonstyle;
        inventorymenumenubouncyballbutton.innerHTML = "EQUIPPED";
        inventorymenumenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubouncyballdiv.style = inventorymenumenubouncyballdivstyle;
    }
}
function movedownbouncyballLoc() {
    bouncyballloc = bouncyballloc - 1;
    inventorymenumenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubouncyballbutton.style = inventorymenumenubouncyballbuttonstyle;
    inventorymenumenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubouncyballdiv.style = inventorymenumenubouncyballdivstyle;

    if (fetchballEquipped == "bouncyball") {
        inventorymenumenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubouncyballbutton.style = inventorymenumenubouncyballbuttonstyle;
        inventorymenumenubouncyballbutton.innerHTML = "EQUIPPED";
        inventorymenumenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bouncyballloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubouncyballdiv.style = inventorymenumenubouncyballdivstyle;
    }
}

var inventorymenumenubouncyballdiv = document.createElement("div");
var inventorymenumenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubouncyballdiv.style = inventorymenumenubouncyballdivstyle;
inventorymenumenubouncyballdiv.innerHTML = "Bouncy Ball";

var inventorymenumenufitnesswaterbutton = document.createElement("button");
var inventorymenumenufitnesswaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenufitnesswaterbutton.style = inventorymenumenufitnesswaterbuttonstyle;
inventorymenumenufitnesswaterbutton.innerHTML = "1/5";
inventorymenumenufitnesswaterbutton.ondblclick = function () {
    if (hasfitnesswater != null) {
        hasfitnesswater.itemamount = hasfitnesswater.itemamount - 1;

        updatefitnesswaterquantity();

        addwaterstat(30);
        addhappystat(5);
        
    } else {
        //shouldn't execute.
    }
}

function updatefitnesswaterquantity() {
    inventorymenumenufitnesswaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - fitnesswaterloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenufitnesswaterbutton.style = inventorymenumenufitnesswaterbuttonstyle;
    inventorymenumenufitnesswaterbutton.innerHTML = hasfitnesswater.getitemamount.toString() + "/5";
    inventorymenumenufitnesswaterdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - fitnesswaterloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenufitnesswaterdiv.style = inventorymenumenufitnesswaterdivstyle;

    if (hasfitnesswater.getitemamount == 0) {
        unplacefitnesswaterLoc();
    }
    localStorage.getItem('fitnesswater', fitnesswater);
    foodstoremenufitnesswatercount.innerHTML = hasfitnesswater.getitemamount.toString() + "/5";
}

function placefitnesswaterLoc() {
    iterator = iterator + 1;
    fitnesswaterloc = iterator;
    inventorymenumenufitnesswaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - fitnesswaterloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenufitnesswaterbutton.style = inventorymenumenufitnesswaterbuttonstyle;
    inventorymenumenufitnesswaterdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - fitnesswaterloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenufitnesswaterdiv.style = inventorymenumenufitnesswaterdivstyle;
}
function movedownfitnesswaterLoc() {
    fitnesswaterloc = fitnesswaterloc - 1;
    inventorymenumenufitnesswaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - fitnesswaterloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenufitnesswaterbutton.style = inventorymenumenufitnesswaterbuttonstyle;
    inventorymenumenufitnesswaterdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - fitnesswaterloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenufitnesswaterdiv.style = inventorymenumenufitnesswaterdivstyle;
}
function unplacefitnesswaterLoc() {
    if(fitnesswaterloc < baseballloc) {
        movedownbaseballLoc();
    }
    if(fitnesswaterloc < blackcollarloc) {
        movedownblackcollarLoc();
    }
    if(fitnesswaterloc < bluecollarloc) {
        movedownbluecollarLoc();
    }
    if(fitnesswaterloc < standardfoodloc) {
        movedownstandardfoodLoc();
    }
    if(fitnesswaterloc < bouncyballloc) {
        movedownbouncyballLoc();
    }
    if(fitnesswaterloc < elitefrisbeeloc) {
        movedownelitefrisbeeLoc();
    }
    if(fitnesswaterloc < bottledwaterloc) {
        movedownbottledwaterLoc();
    }
    if(fitnesswaterloc < goldcollarloc) {
        movedowngoldcollarLoc();
    }
    if(fitnesswaterloc < competitionticketloc) {
        movedowncompetitionticketLoc();
    }
    if(fitnesswaterloc < pinkcollarloc) {
        movedownpinkcollarLoc();
    }
    if(fitnesswaterloc < pinkfrisbeeloc) {
        movedownpinkfrisbeeLoc();
    }
    if(fitnesswaterloc < professionalfrisbeeloc) {
        movedownprofessionalfrisbeeLoc();
    }
    if(fitnesswaterloc < rainbowcollarloc) {
        movedownrainbowcollarLoc();
    }
    if(fitnesswaterloc < gourmetfoodloc) {
        movedowngourmetfoodLoc();
    }
    if(fitnesswaterloc < tennisballloc) {
        movedowntennisballLoc();
    }
    if(fitnesswaterloc < whitecollarloc) {
        movedownwhitecollarLoc();
    }
    if(fitnesswaterloc < bluefrisbeeloc) {
        movedownbluefrisbeeLoc();
    }
    

    fitnesswaterloc = -1;
    inventorymenumenufitnesswaterbuttonstyle = "visibility: hidden";
    inventorymenumenufitnesswaterbutton.style = inventorymenumenufitnesswaterbuttonstyle;
    inventorymenumenufitnesswaterdivstyle = "visibility: hidden";
    inventorymenumenufitnesswaterdiv.style = inventorymenumenufitnesswaterdivstyle;



    iterator = iterator - 1;
}

var inventorymenumenufitnesswaterdiv = document.createElement("div");
var inventorymenumenufitnesswaterdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenufitnesswaterdiv.style = inventorymenumenufitnesswaterdivstyle;
inventorymenumenufitnesswaterdiv.innerHTML = "Bottled Water";

var inventorymenumenubluecollarbutton = document.createElement("button");
var inventorymenumenubluecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubluecollarbutton.style = inventorymenumenubluecollarbuttonstyle;
inventorymenumenubluecollarbutton.innerHTML = "EQUIP";
inventorymenumenubluecollarbutton.ondblclick = function () {
    if (hasbluecollar != null) {
        unequipcollarinvmenu("bluecollar");

        inventorymenumenubluecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluecollarbutton.style = inventorymenumenubluecollarbuttonstyle;
        inventorymenumenubluecollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenubluecollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluecollardiv.style = inventorymenumenubluecollardivstyle;

        collarEquipped = "bluecollar";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipbluecollarinv() {
    inventorymenumenubluecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluecollarbutton.style = inventorymenumenubluecollarbuttonstyle;
    inventorymenumenubluecollarbutton.innerHTML = "EQUIP";
    inventorymenumenubluecollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluecollardiv.style = inventorymenumenubluecollardivstyle;
}
function placebluecollarLoc() {
    iterator = iterator + 1;
    bluecollarloc = iterator;
    inventorymenumenubluecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluecollarbutton.style = inventorymenumenubluecollarbuttonstyle;
    inventorymenumenubluecollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluecollardiv.style = inventorymenumenubluecollardivstyle;

    if (collarEquipped == "bluecollar") {
        inventorymenumenubluecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluecollarbutton.style = inventorymenumenubluecollarbuttonstyle;
        inventorymenumenubluecollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenubluecollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluecollardiv.style = inventorymenumenubluecollardivstyle;
    }
}
function movedownbluecollarLoc() {
    bluecollarloc = bluecollarloc - 1;
    inventorymenumenubluecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluecollarbutton.style = inventorymenumenubluecollarbuttonstyle;
    inventorymenumenubluecollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenubluecollardiv.style = inventorymenumenubluecollardivstyle;

    if (collarEquipped == "bluecollar") {
        inventorymenumenubluecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluecollarbutton.style = inventorymenumenubluecollarbuttonstyle;
        inventorymenumenubluecollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenubluecollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - bluecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenubluecollardiv.style = inventorymenumenubluecollardivstyle;
    }
}

var inventorymenumenubluecollardiv = document.createElement("div");
var inventorymenumenubluecollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenubluecollardiv.style = inventorymenumenubluecollardivstyle;
inventorymenumenubluecollardiv.innerHTML = "Blue Collar";

var inventorymenumenublackcollarbutton = document.createElement("button");
var inventorymenumenublackcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenublackcollarbutton.style = inventorymenumenublackcollarbuttonstyle;
inventorymenumenublackcollarbutton.innerHTML = "EQUIP";
inventorymenumenublackcollarbutton.ondblclick = function () {
    if (hasblackcollar != null) {
        unequipcollarinvmenu("blackcollar");

        inventorymenumenublackcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenublackcollarbutton.style = inventorymenumenublackcollarbuttonstyle;
        inventorymenumenublackcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenublackcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenublackcollardiv.style = inventorymenumenublackcollardivstyle;

        collarEquipped = "blackcollar";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipblackcollarinv() {
    inventorymenumenublackcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenublackcollarbutton.style = inventorymenumenublackcollarbuttonstyle;
    inventorymenumenublackcollarbutton.innerHTML = "EQUIP";
    inventorymenumenublackcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenublackcollardiv.style = inventorymenumenublackcollardivstyle;
}
function placeblackcollarLoc() {
    iterator = iterator + 1;
    blackcollarloc = iterator;
    inventorymenumenublackcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenublackcollarbutton.style = inventorymenumenublackcollarbuttonstyle;
    inventorymenumenublackcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenublackcollardiv.style = inventorymenumenublackcollardivstyle;

    if (collarEquipped == "blackcollar") {
        inventorymenumenublackcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenublackcollarbutton.style = inventorymenumenublackcollarbuttonstyle;
        inventorymenumenublackcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenublackcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenublackcollardiv.style = inventorymenumenublackcollardivstyle;
    }
}
function movedownblackcollarLoc() {
    blackcollarloc = blackcollarloc - 1;
    inventorymenumenublackcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenublackcollarbutton.style = inventorymenumenublackcollarbuttonstyle;
    inventorymenumenublackcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenublackcollardiv.style = inventorymenumenublackcollardivstyle;

    if (collarEquipped == "blackcollar") {
        inventorymenumenublackcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenublackcollarbutton.style = inventorymenumenublackcollarbuttonstyle;
        inventorymenumenublackcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenublackcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - blackcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenublackcollardiv.style = inventorymenumenublackcollardivstyle;
    }
}

var inventorymenumenublackcollardiv = document.createElement("div");
var inventorymenumenublackcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenublackcollardiv.style = inventorymenumenublackcollardivstyle;
inventorymenumenublackcollardiv.innerHTML = "Black Collar";

var inventorymenumenugoldcollarbutton = document.createElement("button");
var inventorymenumenugoldcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenugoldcollarbutton.style = inventorymenumenugoldcollarbuttonstyle;
inventorymenumenugoldcollarbutton.innerHTML = "EQUIP";
inventorymenumenugoldcollarbutton.ondblclick = function () {
    if (hasgoldcollar != null) {
        unequipcollarinvmenu("goldcollar");

        inventorymenumenugoldcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenugoldcollarbutton.style = inventorymenumenugoldcollarbuttonstyle;
        inventorymenumenugoldcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenugoldcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenugoldcollardiv.style = inventorymenumenugoldcollardivstyle;

        collarEquipped = "goldcollar";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipgoldcollarinv() {
    inventorymenumenugoldcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugoldcollarbutton.style = inventorymenumenugoldcollarbuttonstyle;
    inventorymenumenugoldcollarbutton.innerHTML = "EQUIP";
    inventorymenumenugoldcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugoldcollardiv.style = inventorymenumenugoldcollardivstyle;
}
function placegoldcollarLoc() {
    iterator = iterator + 1;
    goldcollarloc = iterator;
    inventorymenumenugoldcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugoldcollarbutton.style = inventorymenumenugoldcollarbuttonstyle;
    inventorymenumenugoldcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugoldcollardiv.style = inventorymenumenugoldcollardivstyle;

    if (collarEquipped == "goldcollar") {
        inventorymenumenugoldcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenugoldcollarbutton.style = inventorymenumenugoldcollarbuttonstyle;
        inventorymenumenugoldcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenugoldcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenugoldcollardiv.style = inventorymenumenugoldcollardivstyle;
    }
}
function movedowngoldcollarLoc() {
    goldcollarloc = goldcollarloc - 1;
    inventorymenumenugoldcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugoldcollarbutton.style = inventorymenumenugoldcollarbuttonstyle;
    inventorymenumenugoldcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenugoldcollardiv.style = inventorymenumenugoldcollardivstyle;

    if (collarEquipped == "goldcollar") {
        inventorymenumenugoldcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenugoldcollarbutton.style = inventorymenumenugoldcollarbuttonstyle;
        inventorymenumenugoldcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenugoldcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - goldcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenugoldcollardiv.style = inventorymenumenugoldcollardivstyle;
    }
}

var inventorymenumenugoldcollardiv = document.createElement("div");
var inventorymenumenugoldcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenugoldcollardiv.style = inventorymenumenugoldcollardivstyle;
inventorymenumenugoldcollardiv.innerHTML = "Gold Collar";

//
var inventorymenumenupinkcollarbutton = document.createElement("button");
var inventorymenumenupinkcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenupinkcollarbutton.style = inventorymenumenupinkcollarbuttonstyle;
inventorymenumenupinkcollarbutton.innerHTML = "EQUIP";
inventorymenumenupinkcollarbutton.ondblclick = function () {
    if (haspinkcollar != null) {
        unequipcollarinvmenu("pinkcollar");

        inventorymenumenupinkcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkcollarbutton.style = inventorymenumenupinkcollarbuttonstyle;
        inventorymenumenupinkcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenupinkcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkcollardiv.style = inventorymenumenupinkcollardivstyle;

        collarEquipped = "pinkcollar";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequippinkcollarinv() {
    inventorymenumenupinkcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkcollarbutton.style = inventorymenumenupinkcollarbuttonstyle;
    inventorymenumenupinkcollarbutton.innerHTML = "EQUIP";
    inventorymenumenupinkcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkcollardiv.style = inventorymenumenupinkcollardivstyle;
}
function placepinkcollarLoc() {
    iterator = iterator + 1;
    pinkcollarloc = iterator;
    inventorymenumenupinkcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkcollarbutton.style = inventorymenumenupinkcollarbuttonstyle;
    inventorymenumenupinkcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkcollardiv.style = inventorymenumenupinkcollardivstyle;

    if (collarEquipped == "pinkcollar") {
        inventorymenumenupinkcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkcollarbutton.style = inventorymenumenupinkcollarbuttonstyle;
        inventorymenumenupinkcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenupinkcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkcollardiv.style = inventorymenumenupinkcollardivstyle;
    }
}
function movedownpinkcollarLoc() {
    pinkcollarloc = pinkcollarloc - 1;
    inventorymenumenupinkcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkcollarbutton.style = inventorymenumenupinkcollarbuttonstyle;
    inventorymenumenupinkcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenupinkcollardiv.style = inventorymenumenupinkcollardivstyle;

    if (collarEquipped == "pinkcollar") {
        inventorymenumenupinkcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkcollarbutton.style = inventorymenumenupinkcollarbuttonstyle;
        inventorymenumenupinkcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenupinkcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - pinkcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenupinkcollardiv.style = inventorymenumenupinkcollardivstyle;
    }
}

var inventorymenumenupinkcollardiv = document.createElement("div");
var inventorymenumenupinkcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenupinkcollardiv.style = inventorymenumenupinkcollardivstyle;
inventorymenumenupinkcollardiv.innerHTML = "Pink Collar";

//
var inventorymenumenurainbowcollarbutton = document.createElement("button");
var inventorymenumenurainbowcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenurainbowcollarbutton.style = inventorymenumenurainbowcollarbuttonstyle;
inventorymenumenurainbowcollarbutton.innerHTML = "EQUIP";
inventorymenumenurainbowcollarbutton.ondblclick = function () {
    if (hasrainbowcollar != null) {
        unequipcollarinvmenu("rainbowcollar");

        inventorymenumenurainbowcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenurainbowcollarbutton.style = inventorymenumenurainbowcollarbuttonstyle;
        inventorymenumenurainbowcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenurainbowcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenurainbowcollardiv.style = inventorymenumenurainbowcollardivstyle;

        collarEquipped = "rainbowcollar";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequiprainbowcollarinv() {
    inventorymenumenurainbowcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenurainbowcollarbutton.style = inventorymenumenurainbowcollarbuttonstyle;
    inventorymenumenurainbowcollarbutton.innerHTML = "EQUIP";
    inventorymenumenurainbowcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenurainbowcollardiv.style = inventorymenumenurainbowcollardivstyle;
}
function placerainbowcollarLoc() {
    iterator = iterator + 1;
    rainbowcollarloc = iterator;
    inventorymenumenurainbowcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenurainbowcollarbutton.style = inventorymenumenurainbowcollarbuttonstyle;
    inventorymenumenurainbowcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenurainbowcollardiv.style = inventorymenumenurainbowcollardivstyle;

    if (collarEquipped == "rainbowcollar") {
        inventorymenumenurainbowcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenurainbowcollarbutton.style = inventorymenumenurainbowcollarbuttonstyle;
        inventorymenumenurainbowcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenurainbowcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenurainbowcollardiv.style = inventorymenumenurainbowcollardivstyle;
    }
}
function movedownrainbowcollarLoc() {
    rainbowcollarloc = rainbowcollarloc - 1;
    inventorymenumenurainbowcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenurainbowcollarbutton.style = inventorymenumenurainbowcollarbuttonstyle;
    inventorymenumenurainbowcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenurainbowcollardiv.style = inventorymenumenurainbowcollardivstyle;

    if (collarEquipped == "rainbowcollar") {
        inventorymenumenurainbowcollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenurainbowcollarbutton.style = inventorymenumenurainbowcollarbuttonstyle;
        inventorymenumenurainbowcollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenurainbowcollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - rainbowcollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenurainbowcollardiv.style = inventorymenumenurainbowcollardivstyle;
    }
}

var inventorymenumenurainbowcollardiv = document.createElement("div");
var inventorymenumenurainbowcollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenurainbowcollardiv.style = inventorymenumenurainbowcollardivstyle;
inventorymenumenurainbowcollardiv.innerHTML = "Rainbow Collar";

//
var inventorymenumenuwhitecollarbutton = document.createElement("button");
var inventorymenumenuwhitecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenuwhitecollarbutton.style = inventorymenumenuwhitecollarbuttonstyle;
inventorymenumenuwhitecollarbutton.innerHTML = "EQUIP";
inventorymenumenuwhitecollarbutton.ondblclick = function () {
    if (haswhitecollar != null) {
        unequipcollarinvmenu("whitecollar");

        inventorymenumenuwhitecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuwhitecollarbutton.style = inventorymenumenuwhitecollarbuttonstyle;
        inventorymenumenuwhitecollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenuwhitecollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuwhitecollardiv.style = inventorymenumenuwhitecollardivstyle;

        collarEquipped = "whitecollar";
    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

function unequipwhitecollarinv() {
    inventorymenumenuwhitecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuwhitecollarbutton.style = inventorymenumenuwhitecollarbuttonstyle;
    inventorymenumenuwhitecollarbutton.innerHTML = "EQUIP";
    inventorymenumenuwhitecollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuwhitecollardiv.style = inventorymenumenuwhitecollardivstyle;
}
function placewhitecollarLoc() {
    iterator = iterator + 1;
    whitecollarloc = iterator;
    inventorymenumenuwhitecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuwhitecollarbutton.style = inventorymenumenuwhitecollarbuttonstyle;
    inventorymenumenuwhitecollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuwhitecollardiv.style = inventorymenumenuwhitecollardivstyle;

    if (collarEquipped == "whitecollar") {
        inventorymenumenuwhitecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuwhitecollarbutton.style = inventorymenumenuwhitecollarbuttonstyle;
        inventorymenumenuwhitecollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenuwhitecollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuwhitecollardiv.style = inventorymenumenuwhitecollardivstyle;
    }
}
function movedownwhitecollarLoc() {
    whitecollarloc = whitecollarloc - 1;
    inventorymenumenuwhitecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 30px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuwhitecollarbutton.style = inventorymenumenuwhitecollarbuttonstyle;
    inventorymenumenuwhitecollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    inventorymenumenuwhitecollardiv.style = inventorymenumenuwhitecollardivstyle;

    if (collarEquipped == "whitecollar") {
        inventorymenumenuwhitecollarbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 30px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 30px; color: #4E4E4E; font-size: 15px; border-radius: 0; border: 2px #C9C9C9; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuwhitecollarbutton.style = inventorymenumenuwhitecollarbuttonstyle;
        inventorymenumenuwhitecollarbutton.innerHTML = "EQUIPPED";
        inventorymenumenuwhitecollardivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 26px; bottom: " + (550 - whitecollarloc * 30).toString() + "px; height: 26px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        inventorymenumenuwhitecollardiv.style = inventorymenumenuwhitecollardivstyle;
    }
}

var inventorymenumenuwhitecollardiv = document.createElement("div");
var inventorymenumenuwhitecollardivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 26px; bottom: 550px; height: 30px; color: #C9C9C9; font-size: 15px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
inventorymenumenuwhitecollardiv.style = inventorymenumenuwhitecollardivstyle;
inventorymenumenuwhitecollardiv.innerHTML = "White Collar";


document.getElementById('hubbtn').appendChild(inventorymenumenuhubbtnbutton);

document.getElementById('inventorymenu').appendChild(inventorymenumenubluefrisbeebutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenubluefrisbeediv);
document.getElementById('inventorymenu').appendChild(inventorymenutitle);
document.getElementById('inventorymenu').appendChild(inventorymenumenucompetitionticketbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenucompetitionticketdiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenugourmetfoodbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenugourmetfooddiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenustandardfoodbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenustandardfooddiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenubottledwaterbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenubottledwaterdiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenupinkfrisbeebutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenupinkfrisbeediv);
document.getElementById('inventorymenu').appendChild(inventorymenumenuelitefrisbeebutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenuelitefrisbeediv);
document.getElementById('inventorymenu').appendChild(inventorymenumenuprofessionalfrisbeebutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenuprofessionalfrisbeediv);
document.getElementById('inventorymenu').appendChild(inventorymenumenubaseballbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenubaseballdiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenubouncyballbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenubouncyballdiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenutennisballbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenutennisballdiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenufitnesswaterbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenufitnesswaterdiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenublackcollarbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenublackcollardiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenubluecollarbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenubluecollardiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenugoldcollarbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenugoldcollardiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenupinkcollarbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenupinkcollardiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenurainbowcollarbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenurainbowcollardiv);
document.getElementById('inventorymenu').appendChild(inventorymenumenuwhitecollarbutton);
document.getElementById('inventorymenu').appendChild(inventorymenumenuwhitecollardiv);

//#endregion

//#region accessory store
var accessorystoremenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 20%; text-align:center; position: absolute; left: 35%; top: 20%; visibility: hidden";
document.getElementById('accessorystore').style = accessorystoremenubackgroundstyle;

var accessorystoretitle = document.createElement("accessorystoretitle");
accessorystoretitle.innerText = "Accessory Store";
var accessorystoretitlestyle = "left: 50%; width: 100%; font-size: 50px;";
accessorystoretitle.style = accessorystoretitlestyle;

var accessorystoremenupinkcolbutton = document.createElement("button");
var accessorystoremenupinkcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 329px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenupinkcolbutton.style = accessorystoremenupinkcolbuttonstyle;
accessorystoremenupinkcolbutton.innerHTML = "BUY";
accessorystoremenupinkcolbutton.ondblclick = function () {
   if (money >= 25.0 && haspinkcollar == null) {
       haspinkcollar = new inventoryitem("pinkcollar", 1);
       accessorystoremenupinkcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 329px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenupinkcolbutton.style = accessorystoremenupinkcolbuttonstyle;
       accessorystoremenupinkcolbutton.innerHTML = "OWNED";
       accessorystoremenupinkcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 329px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenupinkcoldiv.style = accessorystoremenupinkcoldivstyle;
       updatemoney(-25.0);
       
       placepinkcollarLoc();

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var accessorystoremenupinkcoldiv = document.createElement("div");
var accessorystoremenupinkcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 329px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenupinkcoldiv.style = accessorystoremenupinkcoldivstyle;
accessorystoremenupinkcoldiv.innerHTML = "Pink Collar $25";

var accessorystoremenugoldcolbutton = document.createElement("button");
var accessorystoremenugoldcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 285px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenugoldcolbutton.style = accessorystoremenugoldcolbuttonstyle;
accessorystoremenugoldcolbutton.innerHTML = "BUY";
accessorystoremenugoldcolbutton.ondblclick = function () {
   if (money >= 50.0 && hasgoldcollar == null) {
       hasgoldcollar = new inventoryitem("goldcollar", 1);
       accessorystoremenugoldcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 285px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenugoldcolbutton.style = accessorystoremenugoldcolbuttonstyle;
       accessorystoremenugoldcolbutton.innerHTML = "OWNED";
       accessorystoremenugoldcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 285px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenugoldcoldiv.style = accessorystoremenugoldcoldivstyle;
       updatemoney(-50.0);
       
       placegoldcollarLoc();

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var accessorystoremenugoldcoldiv = document.createElement("div");
var accessorystoremenugoldcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 285px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenugoldcoldiv.style = accessorystoremenugoldcoldivstyle;
accessorystoremenugoldcoldiv.innerHTML = "Gold Collar $50";

var accessorystoremenublackcolbutton = document.createElement("button");
var accessorystoremenublackcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 241px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenublackcolbutton.style = accessorystoremenublackcolbuttonstyle;
accessorystoremenublackcolbutton.innerHTML = "BUY";
accessorystoremenublackcolbutton.ondblclick = function () {
   if (money >= 25.0 && hasblackcollar == null) {
       hasblackcollar = new inventoryitem("blackcollar", 1);
       accessorystoremenublackcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 241px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenublackcolbutton.style = accessorystoremenublackcolbuttonstyle;
       accessorystoremenublackcolbutton.innerHTML = "OWNED";
       accessorystoremenublackcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 241px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenublackcoldiv.style = accessorystoremenublackcoldivstyle;
       updatemoney(-25.0);
       
       placeblackcollarLoc();

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var accessorystoremenublackcoldiv = document.createElement("div");
var accessorystoremenublackcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 241px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenublackcoldiv.style = accessorystoremenublackcoldivstyle;
accessorystoremenublackcoldiv.innerHTML = "Black Collar $25";

var accessorystoremenurainbowcolbutton = document.createElement("button");
var accessorystoremenurainbowcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 197px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenurainbowcolbutton.style = accessorystoremenurainbowcolbuttonstyle;
accessorystoremenurainbowcolbutton.innerHTML = "BUY";
accessorystoremenurainbowcolbutton.ondblclick = function () {
   if (money >= 50.0 && hasrainbowcollar == null) {
       hasrainbowcollar = new inventoryitem("rainbowcollar", 1);
       accessorystoremenurainbowcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 197px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenurainbowcolbutton.style = accessorystoremenurainbowcolbuttonstyle;
       accessorystoremenurainbowcolbutton.innerHTML = "OWNED";
       accessorystoremenurainbowcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 197px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenurainbowcoldiv.style = accessorystoremenurainbowcoldivstyle;
       updatemoney(-50.0);
       
       placerainbowcollarLoc();

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var accessorystoremenurainbowcoldiv = document.createElement("div");
var accessorystoremenurainbowcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 197px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenurainbowcoldiv.style = accessorystoremenurainbowcoldivstyle;
accessorystoremenurainbowcoldiv.innerHTML = "Rainbow Collar $50";

var accessorystoremenubluecolbutton = document.createElement("button");
var accessorystoremenubluecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 153px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenubluecolbutton.style = accessorystoremenubluecolbuttonstyle;
accessorystoremenubluecolbutton.innerHTML = "BUY";
accessorystoremenubluecolbutton.ondblclick = function () {
   if (money >= 25.0 && hasbluecollar == null) {
       hasbluecollar = new inventoryitem("bluecollar", 1);
       accessorystoremenubluecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 153px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenubluecolbutton.style = accessorystoremenubluecolbuttonstyle;
       accessorystoremenubluecolbutton.innerHTML = "OWNED";
       accessorystoremenubluecoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 153px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenubluecoldiv.style = accessorystoremenubluecoldivstyle;
       updatemoney(-25.0);
       
       placebluecollarLoc();

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var accessorystoremenubluecoldiv = document.createElement("div");
var accessorystoremenubluecoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 153px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenubluecoldiv.style = accessorystoremenubluecoldivstyle;
accessorystoremenubluecoldiv.innerHTML = "Blue Collar $25";

var accessorystoremenuwhitecolbutton = document.createElement("button");
var accessorystoremenuwhitecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 109px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenuwhitecolbutton.style = accessorystoremenuwhitecolbuttonstyle;
accessorystoremenuwhitecolbutton.innerHTML = "BUY";
accessorystoremenuwhitecolbutton.ondblclick = function () {
   if (money >= 25.0 && haswhitecollar == null) {
       haswhitecollar = new inventoryitem("whitecollar", 1);
       accessorystoremenuwhitecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 109px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenuwhitecolbutton.style = accessorystoremenuwhitecolbuttonstyle;
       accessorystoremenuwhitecolbutton.innerHTML = "OWNED";
       accessorystoremenuwhitecoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 109px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
       accessorystoremenuwhitecoldiv.style = accessorystoremenuwhitecoldivstyle;
       updatemoney(-25.0);
       
       placewhitecollarLoc();

   } else {
       //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
   }
}

var accessorystoremenuwhitecoldiv = document.createElement("div");
var accessorystoremenuwhitecoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 109px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
accessorystoremenuwhitecoldiv.style = accessorystoremenuwhitecoldivstyle;
accessorystoremenuwhitecoldiv.innerHTML = "White Collar $25";


var accessorystoremenuhubbtnbutton = document.createElement("button");
var accessorystoremenuhubbtnbuttonstyle = "right: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 5%; height: 75px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden;";
accessorystoremenuhubbtnbutton.style = accessorystoremenuhubbtnbuttonstyle;
accessorystoremenuhubbtnbutton.innerHTML = "Hub";
accessorystoremenuhubbtnbutton.ondblclick = function () {
   setupAccessoryStore();
}

document.getElementById('hubbtn').appendChild(accessorystoremenuhubbtnbutton);

document.getElementById('accessorystore').appendChild(accessorystoremenupinkcolbutton);
document.getElementById('accessorystore').appendChild(accessorystoremenupinkcoldiv);
document.getElementById('accessorystore').appendChild(accessorystoretitle);
document.getElementById('accessorystore').appendChild(accessorystoremenugoldcolbutton);
document.getElementById('accessorystore').appendChild(accessorystoremenugoldcoldiv);
document.getElementById('accessorystore').appendChild(accessorystoremenublackcolbutton);
document.getElementById('accessorystore').appendChild(accessorystoremenublackcoldiv);
document.getElementById('accessorystore').appendChild(accessorystoremenurainbowcolbutton);
document.getElementById('accessorystore').appendChild(accessorystoremenurainbowcoldiv);
document.getElementById('accessorystore').appendChild(accessorystoremenubluecolbutton);
document.getElementById('accessorystore').appendChild(accessorystoremenubluecoldiv);
document.getElementById('accessorystore').appendChild(accessorystoremenuwhitecolbutton);
document.getElementById('accessorystore').appendChild(accessorystoremenuwhitecoldiv);





//#endregion

//#region sports store
var sportsstoremenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 24%; text-align:center; position: absolute; left: 35%; top: 20%; visibility: hidden";
document.getElementById('sportsstore').style = sportsstoremenubackgroundstyle;

var sportsstoretitle = document.createElement("sportsstoretitle");
sportsstoretitle.innerText = "Sports Store";
var sportsstoretitlestyle = "left: 50%; width: 100%; font-size: 50px;";
sportsstoretitle.style = sportsstoretitlestyle;

var sportsstoremenubluefrisbeebutton = document.createElement("button");
var sportsstoremenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 306px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenubluefrisbeebutton.style = sportsstoremenubluefrisbeebuttonstyle;
sportsstoremenubluefrisbeebutton.innerHTML = "BUY";
sportsstoremenubluefrisbeebutton.ondblclick = function () {
    if (money >= 20.0 && hasbluefrisbee == null) {
        hasbluefrisbee = new inventoryitem("bluefrisbee", 1);
        sportsstoremenubluefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 306px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        sportsstoremenubluefrisbeebutton.style = sportsstoremenubluefrisbeebuttonstyle;
        sportsstoremenubluefrisbeebutton.innerHTML = "OWNED";
        sportsstoremenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 306px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        sportsstoremenubluefrisbeediv.style = sportsstoremenubluefrisbeedivstyle;
        updatemoney(-20.0);

        placebluefrisbeeLoc();

        //iterator = iterator + 1;
        //bluefrisbeeloc = iterator;


    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

var sportsstoremenubluefrisbeediv = document.createElement("div");
var sportsstoremenubluefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 306px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenubluefrisbeediv.style = sportsstoremenubluefrisbeedivstyle;
sportsstoremenubluefrisbeediv.innerHTML = "Blue Frisbee $20";

var sportsstoremenucompetitionticketbutton = document.createElement("button");
var sportsstoremenucompetitionticketbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 262px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenucompetitionticketbutton.style = sportsstoremenucompetitionticketbuttonstyle;
sportsstoremenucompetitionticketbutton.innerHTML = "BUY";
sportsstoremenucompetitionticketbutton.ondblclick = function () {
    if (money >= 50.0 && hascompetitionticket == null) {
        hascompetitionticket = new inventoryitem("competitionticket", 1);
        sportsstoremenucompetitionticketbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 262px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        sportsstoremenucompetitionticketbutton.style = sportsstoremenucompetitionticketbuttonstyle;
        sportsstoremenucompetitionticketbutton.innerHTML = "OWNED";
        sportsstoremenucompetitionticketdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 262px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        sportsstoremenucompetitionticketdiv.style = sportsstoremenucompetitionticketdivstyle;
        updatemoney(-50.0);

        placecompetitionticketLoc();

    } else {
        //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
    }
}

var sportsstoremenucompetitionticketdiv = document.createElement("div");
var sportsstoremenucompetitionticketdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 262px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenucompetitionticketdiv.style = sportsstoremenucompetitionticketdivstyle;
sportsstoremenucompetitionticketdiv.innerHTML = "Competition Ticket $50";

var sportsstoremenuelitefrisbeebutton = document.createElement("button");
var sportsstoremenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 218px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenuelitefrisbeebutton.style = sportsstoremenuelitefrisbeebuttonstyle;
sportsstoremenuelitefrisbeebutton.innerHTML = "BUY";
sportsstoremenuelitefrisbeebutton.ondblclick = function () {
if (money >= 200.0 && haselitefrisbee == null) {
   haselitefrisbee = new inventoryitem("elitefrisbee", 1);
   sportsstoremenuelitefrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 218px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenuelitefrisbeebutton.style = sportsstoremenuelitefrisbeebuttonstyle;
   sportsstoremenuelitefrisbeebutton.innerHTML = "OWNED";
   sportsstoremenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 218px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenuelitefrisbeediv.style = sportsstoremenuelitefrisbeedivstyle;
   updatemoney(-200.0);

   placeelitefrisbeeLoc();

} else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var sportsstoremenuelitefrisbeediv = document.createElement("div");
var sportsstoremenuelitefrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 218px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenuelitefrisbeediv.style = sportsstoremenuelitefrisbeedivstyle;
sportsstoremenuelitefrisbeediv.innerHTML = "Elite Frisbee $200";

var sportsstoremenutennisballbutton = document.createElement("button");
var sportsstoremenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 174px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenutennisballbutton.style = sportsstoremenutennisballbuttonstyle;
sportsstoremenutennisballbutton.innerHTML = "BUY";
sportsstoremenutennisballbutton.ondblclick = function () {
if (money >= 30.0 && hastennisball == null) {
   hastennisball = new inventoryitem("tennisball", 1);
   sportsstoremenutennisballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 174px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenutennisballbutton.style = sportsstoremenutennisballbuttonstyle;
   sportsstoremenutennisballbutton.innerHTML = "OWNED";
   sportsstoremenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 174px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenutennisballdiv.style = sportsstoremenutennisballdivstyle;
   updatemoney(-30.0);

   placetennisballLoc();

} else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var sportsstoremenutennisballdiv = document.createElement("div");
var sportsstoremenutennisballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 174px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenutennisballdiv.style = sportsstoremenutennisballdivstyle;
sportsstoremenutennisballdiv.innerHTML = "Tennis Ball $30";

var sportsstoremenubaseballbutton = document.createElement("button");
var sportsstoremenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 130px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenubaseballbutton.style = sportsstoremenubaseballbuttonstyle;
sportsstoremenubaseballbutton.innerHTML = "BUY";
sportsstoremenubaseballbutton.ondblclick = function () {
if (money >= 30.0 && hasbaseball == null) {
   hasbaseball = new inventoryitem("baseball", 1);
   sportsstoremenubaseballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 130px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenubaseballbutton.style = sportsstoremenubaseballbuttonstyle;
   sportsstoremenubaseballbutton.innerHTML = "OWNED";
   sportsstoremenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 130px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenubaseballdiv.style = sportsstoremenubaseballdivstyle;
   updatemoney(-30.0);

   placebaseballLoc();

} else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var sportsstoremenubaseballdiv = document.createElement("div");
var sportsstoremenubaseballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 130px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenubaseballdiv.style = sportsstoremenubaseballdivstyle;
sportsstoremenubaseballdiv.innerHTML = "Baseball $30";

var sportsstoremenubouncyballbutton = document.createElement("button");
var sportsstoremenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 86px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenubouncyballbutton.style = sportsstoremenubouncyballbuttonstyle;
sportsstoremenubouncyballbutton.innerHTML = "BUY";
sportsstoremenubouncyballbutton.ondblclick = function () {
if (money >= 50.0 && hasbouncyball == null) {
   hasbouncyball = new inventoryitem("bouncyball", 1);
   sportsstoremenubouncyballbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 86px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenubouncyballbutton.style = sportsstoremenubouncyballbuttonstyle;
   sportsstoremenubouncyballbutton.innerHTML = "OWNED";
   sportsstoremenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 86px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenubouncyballdiv.style = sportsstoremenubouncyballdivstyle;
   updatemoney(-50.0);

   placebouncyballLoc();

} else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var sportsstoremenubouncyballdiv = document.createElement("div");
var sportsstoremenubouncyballdivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 86px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenubouncyballdiv.style = sportsstoremenubouncyballdivstyle;
sportsstoremenubouncyballdiv.innerHTML = "Bouncy Ball $50";

var sportsstoremenupinkfrisbeebutton = document.createElement("button");
var sportsstoremenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 42px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenupinkfrisbeebutton.style = sportsstoremenupinkfrisbeebuttonstyle;
sportsstoremenupinkfrisbeebutton.innerHTML = "BUY";
sportsstoremenupinkfrisbeebutton.ondblclick = function () {
if (money >= 20.0 && haspinkfrisbee == null) {
   haspinkfrisbee = new inventoryitem("pinkfrisbee", 1);
   sportsstoremenupinkfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 42px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenupinkfrisbeebutton.style = sportsstoremenupinkfrisbeebuttonstyle;
   sportsstoremenupinkfrisbeebutton.innerHTML = "OWNED";
   sportsstoremenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 42px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenupinkfrisbeediv.style = sportsstoremenupinkfrisbeedivstyle;
   updatemoney(-20.0);

   placepinkfrisbeeLoc();

} else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var sportsstoremenupinkfrisbeediv = document.createElement("div");
var sportsstoremenupinkfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 42px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenupinkfrisbeediv.style = sportsstoremenupinkfrisbeedivstyle;
sportsstoremenupinkfrisbeediv.innerHTML = "Pink Frisbee $20";

var sportsstoremenuprofessionalfrisbeebutton = document.createElement("button");
var sportsstoremenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: -2px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenuprofessionalfrisbeebutton.style = sportsstoremenuprofessionalfrisbeebuttonstyle;
sportsstoremenuprofessionalfrisbeebutton.innerHTML = "BUY";
sportsstoremenuprofessionalfrisbeebutton.ondblclick = function () {
if (money >= 400.0 && hasprofessionalfrisbee == null) {
   hasprofessionalfrisbee = new inventoryitem("professionalfrisbee", 1);
   sportsstoremenuprofessionalfrisbeebuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: -2px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenuprofessionalfrisbeebutton.style = sportsstoremenuprofessionalfrisbeebuttonstyle;
   sportsstoremenuprofessionalfrisbeebutton.innerHTML = "OWNED";
   sportsstoremenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: -2px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   sportsstoremenuprofessionalfrisbeediv.style = sportsstoremenuprofessionalfrisbeedivstyle;
   updatemoney(-400.0);

   placeprofessionalfrisbeeLoc();

} else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var sportsstoremenuprofessionalfrisbeediv = document.createElement("div");
var sportsstoremenuprofessionalfrisbeedivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: -2px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
sportsstoremenuprofessionalfrisbeediv.style = sportsstoremenuprofessionalfrisbeedivstyle;
sportsstoremenuprofessionalfrisbeediv.innerHTML = "Professional Frisbee $400";


var sportsstoremenuhubbtnbutton = document.createElement("button");
var sportsstoremenuhubbtnbuttonstyle = "right: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 5%; height: 75px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden;";
sportsstoremenuhubbtnbutton.style = sportsstoremenuhubbtnbuttonstyle;
sportsstoremenuhubbtnbutton.innerHTML = "Hub";
sportsstoremenuhubbtnbutton.ondblclick = function () {
setupSportsStore();
}

document.getElementById('hubbtn').appendChild(sportsstoremenuhubbtnbutton);

document.getElementById('sportsstore').appendChild(sportsstoremenubluefrisbeebutton);
document.getElementById('sportsstore').appendChild(sportsstoremenubluefrisbeediv);
document.getElementById('sportsstore').appendChild(sportsstoretitle);
document.getElementById('sportsstore').appendChild(sportsstoremenucompetitionticketbutton);
document.getElementById('sportsstore').appendChild(sportsstoremenucompetitionticketdiv);
document.getElementById('sportsstore').appendChild(sportsstoremenuelitefrisbeebutton);
document.getElementById('sportsstore').appendChild(sportsstoremenuelitefrisbeediv);
document.getElementById('sportsstore').appendChild(sportsstoremenutennisballbutton);
document.getElementById('sportsstore').appendChild(sportsstoremenutennisballdiv);
document.getElementById('sportsstore').appendChild(sportsstoremenubaseballbutton);
document.getElementById('sportsstore').appendChild(sportsstoremenubaseballdiv);
document.getElementById('sportsstore').appendChild(sportsstoremenubouncyballbutton);
document.getElementById('sportsstore').appendChild(sportsstoremenubouncyballdiv);
document.getElementById('sportsstore').appendChild(sportsstoremenupinkfrisbeebutton);
document.getElementById('sportsstore').appendChild(sportsstoremenupinkfrisbeediv);
document.getElementById('sportsstore').appendChild(sportsstoremenuprofessionalfrisbeebutton);
document.getElementById('sportsstore').appendChild(sportsstoremenuprofessionalfrisbeediv);





//#endregion

//#region food store
var foodstoremenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 36%; text-align:center; position: absolute; left: 35%; top: 32%; visibility: hidden";
document.getElementById('foodstore').style = foodstoremenubackgroundstyle;

var foodstoretitle = document.createElement("foodstoretitle");
foodstoretitle.innerText = "Food Store";
var foodstoretitlestyle = "left: 50%; width: 100%; font-size: 50px;";
foodstoretitle.style = foodstoretitlestyle;

var foodstoremenufitnesswaterbutton = document.createElement("button");
var foodstoremenufitnesswaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 130px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenufitnesswaterbutton.style = foodstoremenufitnesswaterbuttonstyle;
foodstoremenufitnesswaterbutton.innerHTML = "BUY";
foodstoremenufitnesswaterbutton.ondblclick = function () {
    if (money >= 2.0 && hasfitnesswater.getitemamount == 4) {
        hasfitnesswater.itemamount = hasfitnesswater.itemamount + 1;
        foodstoremenufitnesswaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 130px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenufitnesswaterbutton.style = foodstoremenufitnesswaterbuttonstyle;
        foodstoremenufitnesswaterbutton.innerHTML = "OWNED";
        foodstoremenufitnesswaterdivstyle = "left: -0.5%; width: 50%; background-color: #595959; line-height: 40px; bottom: 130px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenufitnesswatercountstyle = "right: 24.5%; width: 24.5%; background-color: #434343; line-height: 40px; bottom: 130px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenufitnesswatercount.innerHTML = hasfitnesswater.getitemamount.toString() + "/5";
        foodstoremenufitnesswatercount.style = foodstoremenufitnesswatercountstyle;
        foodstoremenufitnesswaterdiv.style = foodstoremenufitnesswaterdivstyle;
        updatemoney(-2.0);
        if (hasfitnesswater.getitemamount == 1) {
            placefitnesswaterLoc();
        }
        updatefitnesswaterquantity();
    } else if (money >= 2.0 && hasfitnesswater.getitemamount < 5) {
        hasfitnesswater.itemamount = hasfitnesswater.itemamount + 1;
        foodstoremenufitnesswaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 130px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenufitnesswaterbutton.style = foodstoremenufitnesswaterbuttonstyle;
        foodstoremenufitnesswaterbutton.innerHTML = "BUY";
        foodstoremenufitnesswaterdivstyle = "left: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 40px; bottom: 130px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenufitnesswatercountstyle = "right: 24.5%; width: 24.5%; background-color: #5e5e5e; line-height: 40px; bottom: 130px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenufitnesswatercount.innerHTML = hasfitnesswater.getitemamount.toString() + "/5";
        foodstoremenufitnesswatercount.style = foodstoremenufitnesswatercountstyle;
        foodstoremenufitnesswaterdiv.style = foodstoremenufitnesswaterdivstyle;
        updatemoney(-2.0);
        if (hasfitnesswater.getitemamount == 1) {
            placefitnesswaterLoc();
        }
        updatefitnesswaterquantity();

}
else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var foodstoremenufitnesswatercount = document.createElement("div");
var foodstoremenufitnesswatercountstyle = "right: 24.5%; width: 24.5%; background-color: #5e5e5e; line-height: 40px; bottom: 130px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenufitnesswatercount.innerHTML = "0/5";
foodstoremenufitnesswatercount.style = foodstoremenufitnesswatercountstyle;

var foodstoremenufitnesswaterdiv = document.createElement("div");
var foodstoremenufitnesswaterdivstyle = "left: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 40px; bottom: 130px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenufitnesswaterdiv.style = foodstoremenufitnesswaterdivstyle;
foodstoremenufitnesswaterdiv.innerHTML = "Fitness Water $2";

var foodstoremenubottledwaterbutton = document.createElement("button");
var foodstoremenubottledwaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 86px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenubottledwaterbutton.style = foodstoremenubottledwaterbuttonstyle;
foodstoremenubottledwaterbutton.innerHTML = "BUY";
foodstoremenubottledwaterbutton.ondblclick = function () {
    if (money >= 1.0 && hasbottledwater.getitemamount == 4) {
        hasbottledwater.itemamount = hasbottledwater.itemamount + 1;
        foodstoremenubottledwaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 86px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenubottledwaterbutton.style = foodstoremenubottledwaterbuttonstyle;
        foodstoremenubottledwaterbutton.innerHTML = "OWNED";
        foodstoremenubottledwaterdivstyle = "left: -0.5%; width: 50%; background-color: #595959; line-height: 40px; bottom: 86px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenubottledwatercountstyle = "right: 24.5%; width: 24.5%; background-color: #434343; line-height: 40px; bottom: 86px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenubottledwatercount.innerHTML = hasbottledwater.getitemamount.toString() + "/5";
        foodstoremenubottledwatercount.style = foodstoremenubottledwatercountstyle;
        foodstoremenubottledwaterdiv.style = foodstoremenubottledwaterdivstyle;
        updatemoney(-1.0);
        if (hasbottledwater.getitemamount == 1) {
            placebottledwaterLoc();
        }
        updatebottledwaterquantity();
    } else if (money >= 1.0 && hasbottledwater.getitemamount < 5) {
        hasbottledwater.itemamount = hasbottledwater.itemamount + 1;
        foodstoremenubottledwaterbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 86px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenubottledwaterbutton.style = foodstoremenubottledwaterbuttonstyle;
        foodstoremenubottledwaterbutton.innerHTML = "BUY";
        foodstoremenubottledwaterdivstyle = "left: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 40px; bottom: 86px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenubottledwatercountstyle = "right: 24.5%; width: 24.5%; background-color: #5e5e5e; line-height: 40px; bottom: 86px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenubottledwatercount.innerHTML = hasbottledwater.getitemamount.toString() + "/5";
        foodstoremenubottledwatercount.style = foodstoremenubottledwatercountstyle;
        foodstoremenubottledwaterdiv.style = foodstoremenubottledwaterdivstyle;
        updatemoney(-1.0);
        if (hasbottledwater.getitemamount == 1) {
            placebottledwaterLoc();
        }
        updatebottledwaterquantity();

}
else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var foodstoremenubottledwatercount = document.createElement("div");
var foodstoremenubottledwatercountstyle = "right: 24.5%; width: 24.5%; background-color: #5e5e5e; line-height: 40px; bottom: 86px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenubottledwatercount.innerHTML = "0/5";
foodstoremenubottledwatercount.style = foodstoremenubottledwatercountstyle;

var foodstoremenubottledwaterdiv = document.createElement("div");
var foodstoremenubottledwaterdivstyle = "left: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 40px; bottom: 86px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenubottledwaterdiv.style = foodstoremenubottledwaterdivstyle;
foodstoremenubottledwaterdiv.innerHTML = "Bottled Water $1";

var foodstoremenustandardfoodbutton = document.createElement("button");
var foodstoremenustandardfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 42px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenustandardfoodbutton.style = foodstoremenustandardfoodbuttonstyle;
foodstoremenustandardfoodbutton.innerHTML = "BUY";
foodstoremenustandardfoodbutton.ondblclick = function () {
    if (money >= 1.0 && hasstandardfood.getitemamount == 4) {
        hasstandardfood.itemamount = hasstandardfood.itemamount + 1;
        foodstoremenustandardfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 42px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenustandardfoodbutton.style = foodstoremenustandardfoodbuttonstyle;
        foodstoremenustandardfoodbutton.innerHTML = "OWNED";
        foodstoremenustandardfooddivstyle = "left: -0.5%; width: 50%; background-color: #595959; line-height: 40px; bottom: 42px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenustandardfoodcountstyle = "right: 24.5%; width: 24.5%; background-color: #434343; line-height: 40px; bottom: 42px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenustandardfoodcount.innerHTML = hasstandardfood.getitemamount.toString() + "/5";
        foodstoremenustandardfoodcount.style = foodstoremenustandardfoodcountstyle;
        foodstoremenustandardfooddiv.style = foodstoremenustandardfooddivstyle;
        updatemoney(-1.0);
        if (hasstandardfood.getitemamount == 1) {
            placestandardfoodLoc();
        }
        updatestandardfoodquantity();
    } else if (money >= 1.0 && hasstandardfood.getitemamount < 5) {
        hasstandardfood.itemamount = hasstandardfood.itemamount + 1;
        foodstoremenustandardfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 42px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenustandardfoodbutton.style = foodstoremenustandardfoodbuttonstyle;
        foodstoremenustandardfoodbutton.innerHTML = "BUY";
        foodstoremenustandardfooddivstyle = "left: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 40px; bottom: 42px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenustandardfoodcountstyle = "right: 24.5%; width: 24.5%; background-color: #5e5e5e; line-height: 40px; bottom: 42px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenustandardfoodcount.innerHTML = hasstandardfood.getitemamount.toString() + "/5";
        foodstoremenustandardfoodcount.style = foodstoremenustandardfoodcountstyle;
        foodstoremenustandardfooddiv.style = foodstoremenustandardfooddivstyle;
        updatemoney(-1.0);
        if (hasstandardfood.getitemamount == 1) {
            placestandardfoodLoc();
        }
        updatestandardfoodquantity();

}
else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var foodstoremenustandardfoodcount = document.createElement("div");
var foodstoremenustandardfoodcountstyle = "right: 24.5%; width: 24.5%; background-color: #5e5e5e; line-height: 40px; bottom: 42px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenustandardfoodcount.innerHTML = "0/5";
foodstoremenustandardfoodcount.style = foodstoremenustandardfoodcountstyle;

var foodstoremenustandardfooddiv = document.createElement("div");
var foodstoremenustandardfooddivstyle = "left: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 40px; bottom: 42px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenustandardfooddiv.style = foodstoremenustandardfooddivstyle;
foodstoremenustandardfooddiv.innerHTML = "Standard Dog Food $1";

var foodstoremenugourmetfoodbutton = document.createElement("button");
var foodstoremenugourmetfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: -2px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenugourmetfoodbutton.style = foodstoremenugourmetfoodbuttonstyle;
foodstoremenugourmetfoodbutton.innerHTML = "BUY";
foodstoremenugourmetfoodbutton.ondblclick = function () {
    if (money >= 5.0 && hasgourmetfood.getitemamount == 4) {
        hasgourmetfood.itemamount = hasgourmetfood.itemamount + 1;
        foodstoremenugourmetfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: -2px; height: 44px; color: #4E4E4E; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenugourmetfoodbutton.style = foodstoremenugourmetfoodbuttonstyle;
        foodstoremenugourmetfoodbutton.innerHTML = "OWNED";
        foodstoremenugourmetfooddivstyle = "left: -0.5%; width: 50%; background-color: #595959; line-height: 40px; bottom: -2px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenugourmetfoodcountstyle = "right: 24.5%; width: 24.5%; background-color: #434343; line-height: 40px; bottom: -2px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenugourmetfoodcount.innerHTML = hasgourmetfood.getitemamount.toString() + "/5";
        foodstoremenugourmetfoodcount.style = foodstoremenugourmetfoodcountstyle;
        foodstoremenugourmetfooddiv.style = foodstoremenugourmetfooddivstyle;
        updatemoney(-5.0);
        if (hasgourmetfood.getitemamount == 1) {
            placegourmetfoodLoc();
        }
        updategourmetfoodquantity();
    } else if (money >= 5.0 && hasgourmetfood.getitemamount < 5) {
        hasgourmetfood.itemamount = hasgourmetfood.itemamount + 1;
        foodstoremenugourmetfoodbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: -2px; height: 44px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenugourmetfoodbutton.style = foodstoremenugourmetfoodbuttonstyle;
        foodstoremenugourmetfoodbutton.innerHTML = "BUY";
        foodstoremenugourmetfooddivstyle = "left: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 40px; bottom: -2px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenugourmetfoodcountstyle = "right: 24.5%; width: 24.5%; background-color: #5e5e5e; line-height: 40px; bottom: -2px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        foodstoremenugourmetfoodcount.innerHTML = hasgourmetfood.getitemamount.toString() + "/5";
        foodstoremenugourmetfoodcount.style = foodstoremenugourmetfoodcountstyle;
        foodstoremenugourmetfooddiv.style = foodstoremenugourmetfooddivstyle;
        updatemoney(-5.0);
        updategourmetfoodquantity();
        if (hasgourmetfood.getitemamount == 1) {
            placegourmetfoodLoc();
        }
        updategourmetfoodquantity();

}
else {
   //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
}
}

var foodstoremenugourmetfoodcount = document.createElement("div");
var foodstoremenugourmetfoodcountstyle = "right: 24.5%; width: 24.5%; background-color: #5e5e5e; line-height: 40px; bottom: -2px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenugourmetfoodcount.innerHTML = "0/5";
foodstoremenugourmetfoodcount.style = foodstoremenugourmetfoodcountstyle;

var foodstoremenugourmetfooddiv = document.createElement("div");
var foodstoremenugourmetfooddivstyle = "left: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 40px; bottom: -2px; height: 40px; color: #C9C9C9; font-size: 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
foodstoremenugourmetfooddiv.style = foodstoremenugourmetfooddivstyle;
foodstoremenugourmetfooddiv.innerHTML = "Gourmet Dog Food $5";


var foodstoremenuhubbtnbutton = document.createElement("button");
var foodstoremenuhubbtnbuttonstyle = "right: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 5%; height: 75px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden;";
foodstoremenuhubbtnbutton.style = foodstoremenuhubbtnbuttonstyle;
foodstoremenuhubbtnbutton.innerHTML = "Hub";
foodstoremenuhubbtnbutton.ondblclick = function () {
setupFoodStore();
}

document.getElementById('hubbtn').appendChild(foodstoremenuhubbtnbutton);

document.getElementById('foodstore').appendChild(foodstoretitle);
document.getElementById('foodstore').appendChild(foodstoremenufitnesswaterbutton);
document.getElementById('foodstore').appendChild(foodstoremenufitnesswaterdiv);
document.getElementById('foodstore').appendChild(foodstoremenufitnesswatercount);
document.getElementById('foodstore').appendChild(foodstoremenubottledwaterbutton);
document.getElementById('foodstore').appendChild(foodstoremenubottledwaterdiv);
document.getElementById('foodstore').appendChild(foodstoremenubottledwatercount);
document.getElementById('foodstore').appendChild(foodstoremenustandardfoodbutton);
document.getElementById('foodstore').appendChild(foodstoremenustandardfooddiv);
document.getElementById('foodstore').appendChild(foodstoremenustandardfoodcount);
document.getElementById('foodstore').appendChild(foodstoremenugourmetfoodbutton);
document.getElementById('foodstore').appendChild(foodstoremenugourmetfooddiv);
document.getElementById('foodstore').appendChild(foodstoremenugourmetfoodcount);





//#endregion



//#region parkmenu initiators
var parkmenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 35%; text-align:center; position: absolute; left: 5%; top: 35%; visibility: visible";
//#region parkmenu title initiator
   var parkmenutitle = document.createElement("parkmenutitle");
   parkmenutitle.innerText = "Park";
   var parkmenutitlestyle = "left: 50%; width: 100%; font-size: 50px;";
   parkmenutitle.style = parkmenutitlestyle;
//#endregion

//#region parkmenu competition button initiator
   var parkmenucompetition = document.createElement("button");
   var parkmenucompetitionstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   parkmenucompetition.style = parkmenucompetitionstyle;
   parkmenucompetition.innerHTML = "Enter Competition";
//#endregion

//#region parkmenu fetch button initiator
   var parkmenufetch = document.createElement("button");
   var parkmenufetchstyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   parkmenufetch.style = parkmenufetchstyle;
   parkmenufetch.innerHTML = "Play Fetch";
   parkmenufetch.ondblclick = function () {
    setupFetchMinigame();
 };
//#endregion

//#region parkmenu socialize button initiator
   var parkmenusocialize = document.createElement("button");
   var parkmenusocializestyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
   parkmenusocialize.style = parkmenusocializestyle;
   parkmenusocialize.innerHTML = "Socialize";
//#endregion

//#region parkmenu frisbee button initiator
var parkmenufrisbee = document.createElement("button");
var parkmenufrisbeestyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
parkmenufrisbee.style = parkmenufrisbeestyle;
parkmenufrisbee.innerHTML = "Play Frisbee";
parkmenufrisbee.ondblclick = function () {
   setupFrisbeeMinigame();
};
//#endregion
//#endregion

//#region storemenu initiators
var storemenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 35%; text-align:center; position: absolute; left: 35%; top: 35%; visibility: visible";
//#region storemenu title initiator
var storemenutitle = document.createElement("storemenutitle");
storemenutitle.innerText = "Store";
var storemenutitlestyle = "left: 50%; width: 100%; font-size: 50px;";
storemenutitle.style = storemenutitlestyle;
//#endregion

//#region storemenu food button initiator
var storemenufood = document.createElement("button");
var storemenufoodstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
storemenufood.style = storemenufoodstyle;
storemenufood.innerHTML = "Food Store";
storemenufood.ondblclick = function () {
   setupFoodStore();
};
//#endregion

//#region storemenu veterinary button initiator
var storemenuveterinary = document.createElement("button");
var storemenuveterinarystyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
storemenuveterinary.style = storemenuveterinarystyle;
storemenuveterinary.innerHTML = "Veterinary";
//#endregion

//#region storemenu sport button initiator
var storemenusport = document.createElement("button");
var storemenusportstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
storemenusport.style = storemenusportstyle;
storemenusport.innerHTML = "Sports Store";
storemenusport.ondblclick = function () {
   setupSportsStore();
};
//#endregion

//#region storemenu accessory button initiator
var storemenuaccessory = document.createElement("button");
var storemenuaccessorystyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
storemenuaccessory.style = storemenuaccessorystyle;
storemenuaccessory.innerHTML = "Accessory Store";
storemenuaccessory.ondblclick = function () {
setupAccessoryStore();
};
//#endregion
//#endregion

//#region actionmenu initiators
var actionmenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 35%; text-align:center; position: absolute; left: 65%; top: 35%; visibility: visible";
//#region actionmenu title initiator
var actionmenutitle = document.createElement("actionmenutitle");
actionmenutitle.innerText = "Action";
var actionmenutitlestyle = "left: 50%; width: 100%; font-size: 50px;";
actionmenutitle.style = actionmenutitlestyle;
//#endregion

//#region actionmenu eat button initiator
var actionmenueat = document.createElement("button");
var actionmenueatstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
actionmenueat.style = actionmenueatstyle;
actionmenueat.innerHTML = "Eat";
//#endregion

//#region actionmenu drink button initiator
var actionmenudrink = document.createElement("button");
var actionmenudrinkstyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
actionmenudrink.style = actionmenudrinkstyle;
actionmenudrink.innerHTML = "Drink";
//#endregion

//#region actionmenu walk button initiator
var actionmenuwalk = document.createElement("button");
var actionmenuwalkstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
actionmenuwalk.style = actionmenuwalkstyle;
actionmenuwalk.innerHTML = "Walk";
//#endregion

//#region actionmenu Work button initiator
var actionmenuWork = document.createElement("button");
var actionmenuWorkstyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
actionmenuWork.style = actionmenuWorkstyle;
actionmenuWork.innerHTML = "Work";
actionmenuWork.ondblclick = function () {
updatemoney(20);
addfoodstat(-20);
addhappystat(-10);
addsocialstat(-10);
addwaterstat(-20);
setupWorkMinigame();
};
//#endregion
//#endregion




//#region stats initiators
var statusstyle = "visibility: visible;";
document.getElementById('status').style = statusstyle;
//#region foodstats initiator
   var foodstat = parseFloat(localStorage.getItem('foodstat')) || 100.0; //STORED IN DATABASE
   var repeaterfoodstat;
   var foodStatElem = document.createElement("div");
   var foodStatElemstyle = "left: 2.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
   foodStatElem.style = foodStatElemstyle;
   document.getElementById('status').appendChild(foodStatElem);
   var innerfoodStatElem = document.createElement("div");
   var innerfoodStatElemstyle = "width: " + foodstat + "%; height: 101%; background-color: #FF8800; border: 0; padding: 0; left: -1%;";
   innerfoodStatElem.style = innerfoodStatElemstyle;
   foodStatElem.appendChild(innerfoodStatElem);
   var foodstatimg = document.createElement("img");
   var foodstatimgstyle = "mix-blend-mode: multiply; max-width:100%; max-height:100%; margin-left: auto; margin-right: auto; bottom: 8%; left: 38%; display: block; position: absolute;"
   foodstatimg.style = foodstatimgstyle;
   foodstatimg.src = "food1.png";
   foodStatElem.appendChild(foodstatimg);
//#endregion

//#region waterstats initiator
   var waterstat = localStorage.getItem('waterstat') || 100.0; //STORED IN DATABASE
   var repeaterwaterstat;
   var waterStatElem = document.createElement("div");
   var waterStatElemstyle = "left: 17.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
   waterStatElem.style = waterStatElemstyle;
   document.getElementById('status').appendChild(waterStatElem);
   var innerwaterStatElem = document.createElement("div");
   var innerwaterStatElemstyle = "width: " + waterstat + "%; height: 101%; background-color: #00B9FF; border: 0; padding: 0; left: -1%;";
   innerwaterStatElem.style = innerwaterStatElemstyle;
   waterStatElem.appendChild(innerwaterStatElem);
   var waterstatimg = document.createElement("img");
   var waterstatimgstyle = "mix-blend-mode: multiply; max-width:100%; max-height:100%; margin-left: auto; margin-right: auto; bottom: 8%; left: 43%; display: block; position: absolute;"
   waterstatimg.style = waterstatimgstyle;
   waterstatimg.src = "water1.png";
   waterStatElem.appendChild(waterstatimg);
//#endregion

//#region happystats initiator
   var happystat = localStorage.getItem('happystat') || 100.0; //STORED IN DATABASE
   var repeaterhappystat;
   var happyStatElem = document.createElement("div");
   var happyStatElemstyle = "left: 32.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
   happyStatElem.style = happyStatElemstyle;
   document.getElementById('status').appendChild(happyStatElem);
   var innerhappyStatElem = document.createElement("div");
   var innerhappyStatElemstyle = "width: " + happystat + "%; height: 101%; background-color: #00FF3D; border: 0; padding: 0; left: -1%;";
   innerhappyStatElem.style = innerhappyStatElemstyle;
   happyStatElem.appendChild(innerhappyStatElem);
   var happystatimg = document.createElement("img");
   var happystatimgstyle = "mix-blend-mode: multiply; max-width:100%; max-height:100%; margin-left: auto; margin-right: auto; bottom: 0%; left: 42%; display: block; position: absolute;"
   happystatimg.style = happystatimgstyle;
   happystatimg.src = "happy1.png";
   happyStatElem.appendChild(happystatimg);
//#endregion

//#region socialstats initiator
   var socialstat = localStorage.getItem('socialstat') || 100.0; //STORED IN DATABASE
   var repeatersocialstat;
   var socialStatElem = document.createElement("div");
   var socialStatElemstyle = "left: 47.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
   socialStatElem.style = socialStatElemstyle;
   document.getElementById('status').appendChild(socialStatElem);
   var innersocialStatElem = document.createElement("div");
   var innersocialStatElemstyle = "width: " + socialstat + "%; height: 101%; background-color: #FF00DE; border: 0; padding: 0; left: -1%;";
   innersocialStatElem.style = innersocialStatElemstyle;
   socialStatElem.appendChild(innersocialStatElem);
   var socialstatimg = document.createElement("img");
   var socialstatimgstyle = "mix-blend-mode: multiply; max-width:100%; max-height:100%; margin-left: auto; margin-right: auto; bottom: 0%; left: 42%; display: block; position: absolute;"
   socialstatimg.style = socialstatimgstyle;
   socialstatimg.src = "social1.png";
   socialStatElem.appendChild(socialstatimg);
//#endregion

//#region healthstats initiator
var healthstat = localStorage.getItem('healthstat') || 100.0; //STORED IN DATABASE
var repeaterhealthstat;
var healthStatElem = document.createElement("div");
var healthStatElemstyle = "left: 62.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size: 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
healthStatElem.style = healthStatElemstyle;
document.getElementById('status').appendChild(healthStatElem);
var innerhealthStatElem = document.createElement("div");
var innerhealthStatElemstyle = "width: " + healthstat + "%; height: 101%; background-color: #FF0000; border: 0; padding: 0; left: -1%;";
innerhealthStatElem.style = innerhealthStatElemstyle;
healthStatElem.appendChild(innerhealthStatElem);
var healthstatimg = document.createElement("img");
var healthstatimgstyle = "mix-blend-mode: multiply; max-width:100%; max-height:100%; margin-left: auto; margin-right: auto; bottom: 0%; left: 42%; display: block; position: absolute;"
healthstatimg.style = healthstatimgstyle;
healthstatimg.src = "health1.png";
healthStatElem.appendChild(healthstatimg);
//#endregion
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
document.getElementById('storemenu').appendChild(storemenuaccessory);

document.getElementById('actionmenu').style = actionmenubackgroundstyle;
document.getElementById('actionmenu').appendChild(actionmenutitle);
document.getElementById('actionmenu').appendChild(actionmenueat);
document.getElementById('actionmenu').appendChild(actionmenudrink);
document.getElementById('actionmenu').appendChild(actionmenuwalk);
document.getElementById('actionmenu').appendChild(actionmenuWork);
//#endregion


//#region stat updaters
//#region foodstat updaters
function updatefoodstat() {
foodstat = foodstat - 0.1;
localStorage.setItem('foodstat', foodstat);
innerfoodStatElemstyle = "width: " + foodstat + "%; height: 101%; background-color: #FF8800; border: 0; padding: 0; left: -1%;";
innerfoodStatElem.style = innerfoodStatElemstyle;

if (foodstat <= 0.0) {
   clearTimeout(repeaterfoodstat);
   return;
}

repeaterfoodstat = setTimeout(updatefoodstat, 800); // adjust last variable to determine how fast foodstat drains
}
updatefoodstat();

/**
* @param {number} numb
*/
function addfoodstat(numb) {
foodstat = foodstat + numb;
if (foodstat >= 100) {
   foodstat = 100;
}
localStorage.setItem('foodstat', foodstat);
innerfoodStatElemstyle = "width: " + foodstat + "%; height: 101%; background-color: #FF8800; border: 0; padding: 0; left: -1%;";
innerfoodStatElem.style = innerfoodStatElemstyle;
}
//#endregion

//#region waterstat updaters
function updatewaterstat() {
waterstat = waterstat - 0.1;
localStorage.setItem('waterstat', waterstat);
innerwaterStatElemstyle = "width: " + waterstat + "%; height: 101%; background-color: #00B9FF; border: 0; padding: 0; left: -1%;";
innerwaterStatElem.style = innerwaterStatElemstyle;

if (waterstat <= 0.0) {
   clearTimeout(repeaterwaterstat);
   return;
}

repeaterwaterstat = setTimeout(updatewaterstat, 800); // adjust last variable to determine how fast waterstat drains
}
updatewaterstat();

/**
* @param {number} numb
*/
function addwaterstat(numb) {
waterstat = waterstat + numb;
if (waterstat >= 100) {
   waterstat = 100;
}
localStorage.setItem('waterstat', waterstat);
innerwaterStatElemstyle = "width: " + waterstat + "%; height: 101%; background-color: #00B9FF; border: 0; padding: 0; left: -1%;";
innerwaterStatElem.style = innerwaterStatElemstyle;
}
//#endregion

//#region happystat updaters
function updatehappystat() {
var happystatupdatespeed = 1000;

happystat = happystat - 0.1;
localStorage.setItem('happystat', happystat);
innerhappyStatElemstyle = "width: " + happystat + "%; height: 101%; background-color: #00FF3D; border: 0; padding: 0; left: -1%;";
innerhappyStatElem.style = innerhappyStatElemstyle;

if (happystat <= 0.0) {
   clearTimeout(repeaterhappystat);
   return;
}

if (foodstat < 40) {
   happystatupdatespeed = happystatupdatespeed - 150;
}
if (waterstat < 40) {
   happystatupdatespeed = happystatupdatespeed - 150;
}
if (socialstat < 40) {
   happystatupdatespeed = happystatupdatespeed - 150;
}
if (healthstat < 40) {
   happystatupdatespeed = happystatupdatespeed - 350;
}

repeaterhappystat = setTimeout(updatehappystat, happystatupdatespeed); // adjust last variable to determine how fast happystat drains
}
updatehappystat();

/**
* @param {number} numb
*/
function addhappystat(numb) {
happystat = happystat + numb;
if (happystat >= 100) {
   happystat = 100;
}
localStorage.setItem('happystat', happystat);
innerhappyStatElemstyle = "width: " + happystat + "%; height: 101%; background-color: #00FF3D; border: 0; padding: 0; left: -1%;";
innerhappyStatElem.style = innerhappyStatElemstyle;
}
//#endregion

//#region socialstat updaters
function updatesocialstat() {
socialstat = socialstat - 0.1;
localStorage.setItem('socialstat', socialstat);
innersocialStatElemstyle = "width: " + socialstat + "%; height: 101%; background-color: #FF00DE; border: 0; padding: 0; left: -1%;";
innersocialStatElem.style = innersocialStatElemstyle;

if (socialstat <= 0.0) {
   clearTimeout(repeatersocialstat);
   return;
}

repeatersocialstat = setTimeout(updatesocialstat, 1000); // adjust last variable to determine how fast socialstat drains
}
updatesocialstat();

/**
* @param {number} numb
*/
function addsocialstat(numb) {
socialstat = socialstat + numb;
if (socialstat >= 100) {
   socialstat = 100;
}
localStorage.setItem('socialstat', socialstat);
innersocialStatElemstyle = "width: " + socialstat + "%; height: 101%; background-color: #FF00DE; border: 0; padding: 0; left: -1%;";
innersocialStatElem.style = innersocialStatElemstyle;
}
//#endregion

//#region healthstat updater
/**
* @param {number} numb
*/
function addhealthstat(numb) {
healthstat = healthstat + numb;
if (healthstat >= 100) {
   healthstat = 100;
}
localStorage.setItem('healthstat', socialstat);
innerhealthStatElemstyle = "width: " + healthstat + "%; height: 101%; background-color: #FF0000; border: 0; padding: 0; left: -1%;";
innerhealthStatElem.style = innerhealthStatElemstyle;
}
//#endregion
//#region
   var frisbeebtn = document.createElement("button");
   frisbeebtn.id = "fBTN";
   var frisbeebtnstyle = "left: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 0%; height: 55px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: visible;";
   frisbeebtn.style = frisbeebtnstyle;
   frisbeebtn.innerHTML = "Throw";
  document.getElementById('hubbtn').appendChild(frisbeebtn);
  frisbeebtnstyle = togglevisibility(frisbeebtnstyle, document.getElementById('fBTN'));
  

  var frisbeehubbtn = document.createElement("button");
  frisbeehubbtn.id = "fhBTN";
   var frisbeehubbtnstyle = "right: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 0%; height: 55px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: visible;";
   frisbeehubbtn.style = frisbeehubbtnstyle;
   frisbeehubbtn.innerHTML = "Hub";
  document.getElementById('hubbtn').appendChild(frisbeehubbtn);
  frisbeehubbtnstyle = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));

  var fetchbtn = document.createElement("button");
  fetchbtn.id = "fetBTN";
   var fetchbtnstyle = "right: 40%; width: 20%; background-color: #5e5e5e; line-height: 75px; bottom: 0%; height: 55px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: visible;";
   fetchbtn.style = fetchbtnstyle;
   fetchbtn.innerHTML = "Lives Left: 3";
  document.getElementById('hubbtn').appendChild(fetchbtn);
  fetchbtnstyle = togglevisibility(fetchbtnstyle, document.getElementById('fetBTN'));

  var workhubbtn = document.createElement("button");
workhubbtn.id = "workhBTN";
var workhubbtnstyle = "right: 4.5%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 0%; height: 55px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: visible;";
workhubbtn.style = workhubbtnstyle;
workhubbtn.innerHTML = "Hub";
document.getElementById('hubbtn').appendChild(workhubbtn);
workhubbtnstyle = togglevisibility(workhubbtnstyle, document.getElementById('workhBTN'));
  
var guessBtn = document.createElement("button");
guessBtn.id = "guessBTN";
 var guessBtnstyle = "right: 20%; width: 15%; background-color: #5e5e5e; line-height: 75px; bottom: 0%; height: 55px; color: #C9C9C9; font-size: 40px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: visible;";
 guessBtn.style = guessBtnstyle;
 guessBtn.innerHTML = "Guess";
guessBtnstyle = togglevisibility(guessBtnstyle, document.getElementById('guessBTN'));
//#endregion

function setuphomepage() {

parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
//TODO: togglevisibility of actions menu
if (moneyElemStyle.includes("visible")) {
   //do nothing
} else {
   moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
}
if (statusstyle.includes("visible")) {
   //do nothing
} else {
   statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
}

if (inventorybtnstyle.includes("hidden")) {
   inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
}


}






function setupAccessoryStore() { // can also take down accessory store

    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    // turns off main menu

    accessorystoremenubackgroundstyle = togglevisibility(accessorystoremenubackgroundstyle, document.getElementById('accessorystore'));
    accessorystoremenuhubbtnbuttonstyle = togglevisibility(accessorystoremenuhubbtnbuttonstyle, accessorystoremenuhubbtnbutton);
    inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
    //TODO


}

function setupSportsStore() { // can also take down sports store

    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    // turns off main menu

    sportsstoremenubackgroundstyle = togglevisibility(sportsstoremenubackgroundstyle, document.getElementById('sportsstore'));
    sportsstoremenuhubbtnbuttonstyle = togglevisibility(sportsstoremenuhubbtnbuttonstyle, sportsstoremenuhubbtnbutton);
    inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
    //TODO


}

function setupInventory() { // can also take down sports store

    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    // turns off main menu

    inventorymenumenubackgroundstyle = togglevisibility(inventorymenumenubackgroundstyle, document.getElementById('inventorymenu'));

    //sportsstoremenubackgroundstyle = togglevisibility(sportsstoremenubackgroundstyle, document.getElementById('sportsstore'));
    
    if (inventorybtn.innerHTML == "Inventory") {
        inventorybtn.innerHTML = "Hub";
    } else {
        inventorybtn.innerHTML = "Inventory";
    }

    //TODO


}

function setupFoodStore() { // can also take down sports store

    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    // turns off main menu

    foodstoremenubackgroundstyle = togglevisibility(foodstoremenubackgroundstyle, document.getElementById('foodstore'));
    foodstoremenuhubbtnbuttonstyle = togglevisibility(foodstoremenuhubbtnbuttonstyle, foodstoremenuhubbtnbutton);
    inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
    //TODO


}




//#region assigners (equippers)
/**
 * @param {string} strball
 */
function assignfetchball(strball) {
    fetchballEquipped = strball;
}

/**
 * @param {string} strfris
 */
function assignfrisbee(strfris) {
    frisbeeEquipped = strfris;
}
//#endregion

//#region visibility togglers
/**
 * @param {string} strvis
 * @param {Node} elementupd
 */
function togglevisibility(strvis, elementupd) {
    if (strvis.includes("visible")) {
        strvis = strvis.replace("visible", "hidden");
    } else {
        strvis = strvis.replace("hidden", "visible");
    }
    elementupd.style = strvis;
    return strvis;
} //example of use would be: parkmenutitlestyle = togglevisibility(parkmenutitlestyle, parkmenutitle);
//#endregion


