//import React from 'react';
//import ReactDOM from 'react-dom';


//#region skillpoints
    var skillpoints = 0; //hidden number that determines the chance of winning the competition. updates when certain minigames are played
    /**
     * @param {number} numb
     */
    function updateskill(numb) {
        skillpoints = skillpoints + numb;
    }
//#endregion


//#region money
    //#region money initiator
        var money = 50.00;
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
        moneyElem.innerText = money.toFixed(2);
        moneyElem.appendChild(moneyElem2);
    }
//#endregion
//#endregion


//#region equip variables
    var frisbeeEquipped = "";
    var fetchballEquipped = "";
    var collarEquipped = "";
//#endregion

//#region has variables
    var hasbluefrisbee = false;
    var hasstandardfrisbee = false;
    var haselitefrisbee = false;
    var hasgreenfrisbee = false;
    var haspinkfrisbee = false;
    var hasprofessionalfrisbee = false;
    var hastennisball = false;
    var hasbaseball = false;
    var hasbouncyball = false;
    var hascompetitionticket = false;
    var haspinkcollar = false;
    var hasgoldcollar = false;
    var hasblackcollar = false;
    var hasrainbowcollar = false;
    var hasbluecollar = false;
    var haswhitecollar = false;
//#endregion

//#region hub button

//#endregion

//#region accessory store
    var accessorystoremenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 20%; text-align:center; position: absolute; left: 35%; top: 20%; visibility: hidden";
    document.getElementById('accessorystore').style = accessorystoremenubackgroundstyle;

    var accessorystoretitle = document.createElement("accessorystoretitle");
    accessorystoretitle.innerText = "Accessory Store";
    var accessorystoretitlestyle = "left: 50%; width: 100%; font-size: 50px;";
    accessorystoretitle.style = accessorystoretitlestyle;

    var accessorystoremenupinkcolbutton = document.createElement("button");
    var accessorystoremenupinkcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 329px; height: 44px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenupinkcolbutton.style = accessorystoremenupinkcolbuttonstyle;
    accessorystoremenupinkcolbutton.innerHTML = "BUY";
    accessorystoremenupinkcolbutton.ondblclick = function () {
        if (money >= 25.0 && haspinkcollar == false) {
            haspinkcollar = true;
            accessorystoremenupinkcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 329px; height: 44px; color: #4E4E4E; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenupinkcolbutton.style = accessorystoremenupinkcolbuttonstyle;
            accessorystoremenupinkcolbutton.innerHTML = "OWNED";
            accessorystoremenupinkcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 329px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenupinkcoldiv.style = accessorystoremenupinkcoldivstyle;
            updatemoney(-25.0);
            //TODO: append pinkcollar element to inventory menu.

        } else {
            //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
        }
    }

    var accessorystoremenupinkcoldiv = document.createElement("div");
    var accessorystoremenupinkcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 329px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenupinkcoldiv.style = accessorystoremenupinkcoldivstyle;
    accessorystoremenupinkcoldiv.innerHTML = "Pink Collar $25";

    var accessorystoremenugoldcolbutton = document.createElement("button");
    var accessorystoremenugoldcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 285px; height: 44px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenugoldcolbutton.style = accessorystoremenugoldcolbuttonstyle;
    accessorystoremenugoldcolbutton.innerHTML = "BUY";
    accessorystoremenugoldcolbutton.ondblclick = function () {
        if (money >= 50.0 && hasgoldcollar == false) {
            hasgoldcollar = true;
            accessorystoremenugoldcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 285px; height: 44px; color: #4E4E4E; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenugoldcolbutton.style = accessorystoremenugoldcolbuttonstyle;
            accessorystoremenugoldcolbutton.innerHTML = "OWNED";
            accessorystoremenugoldcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 285px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenugoldcoldiv.style = accessorystoremenugoldcoldivstyle;
            updatemoney(-50.0);
            //TODO: append goldcollar element to inventory menu.

        } else {
            //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
        }
    }

    var accessorystoremenugoldcoldiv = document.createElement("div");
    var accessorystoremenugoldcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 285px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenugoldcoldiv.style = accessorystoremenugoldcoldivstyle;
    accessorystoremenugoldcoldiv.innerHTML = "Gold Collar $50";

    var accessorystoremenublackcolbutton = document.createElement("button");
    var accessorystoremenublackcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 241px; height: 44px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenublackcolbutton.style = accessorystoremenublackcolbuttonstyle;
    accessorystoremenublackcolbutton.innerHTML = "BUY";
    accessorystoremenublackcolbutton.ondblclick = function () {
        if (money >= 25.0 && hasblackcollar == false) {
            hasblackcollar = true;
            accessorystoremenublackcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 241px; height: 44px; color: #4E4E4E; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenublackcolbutton.style = accessorystoremenublackcolbuttonstyle;
            accessorystoremenublackcolbutton.innerHTML = "OWNED";
            accessorystoremenublackcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 241px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenublackcoldiv.style = accessorystoremenublackcoldivstyle;
            updatemoney(-25.0);
            //TODO: append blackcollar element to inventory menu.

        } else {
            //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
        }
    }

    var accessorystoremenublackcoldiv = document.createElement("div");
    var accessorystoremenublackcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 241px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenublackcoldiv.style = accessorystoremenublackcoldivstyle;
    accessorystoremenublackcoldiv.innerHTML = "Black Collar $25";

    var accessorystoremenurainbowcolbutton = document.createElement("button");
    var accessorystoremenurainbowcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 197px; height: 44px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenurainbowcolbutton.style = accessorystoremenurainbowcolbuttonstyle;
    accessorystoremenurainbowcolbutton.innerHTML = "BUY";
    accessorystoremenurainbowcolbutton.ondblclick = function () {
        if (money >= 50.0 && hasrainbowcollar == false) {
            hasrainbowcollar = true;
            accessorystoremenurainbowcolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 197px; height: 44px; color: #4E4E4E; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenurainbowcolbutton.style = accessorystoremenurainbowcolbuttonstyle;
            accessorystoremenurainbowcolbutton.innerHTML = "OWNED";
            accessorystoremenurainbowcoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 197px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenurainbowcoldiv.style = accessorystoremenurainbowcoldivstyle;
            updatemoney(-50.0);
            //TODO: append rainbowcollar element to inventory menu.

        } else {
            //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
        }
    }

    var accessorystoremenurainbowcoldiv = document.createElement("div");
    var accessorystoremenurainbowcoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 197px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenurainbowcoldiv.style = accessorystoremenurainbowcoldivstyle;
    accessorystoremenurainbowcoldiv.innerHTML = "Rainbow Collar $50";

    var accessorystoremenubluecolbutton = document.createElement("button");
    var accessorystoremenubluecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 153px; height: 44px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenubluecolbutton.style = accessorystoremenubluecolbuttonstyle;
    accessorystoremenubluecolbutton.innerHTML = "BUY";
    accessorystoremenubluecolbutton.ondblclick = function () {
        if (money >= 25.0 && hasbluecollar == false) {
            hasbluecollar = true;
            accessorystoremenubluecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 153px; height: 44px; color: #4E4E4E; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenubluecolbutton.style = accessorystoremenubluecolbuttonstyle;
            accessorystoremenubluecolbutton.innerHTML = "OWNED";
            accessorystoremenubluecoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 153px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenubluecoldiv.style = accessorystoremenubluecoldivstyle;
            updatemoney(-25.0);
            //TODO: append bluecollar element to inventory menu.

        } else {
            //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
        }
    }

    var accessorystoremenubluecoldiv = document.createElement("div");
    var accessorystoremenubluecoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 153px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenubluecoldiv.style = accessorystoremenubluecoldivstyle;
    accessorystoremenubluecoldiv.innerHTML = "Blue Collar $25";

    var accessorystoremenuwhitecolbutton = document.createElement("button");
    var accessorystoremenuwhitecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #5e5e5e; line-height: 44px; bottom: 109px; height: 44px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenuwhitecolbutton.style = accessorystoremenuwhitecolbuttonstyle;
    accessorystoremenuwhitecolbutton.innerHTML = "BUY";
    accessorystoremenuwhitecolbutton.ondblclick = function () {
        if (money >= 25.0 && haswhitecollar == false) {
            haswhitecollar = true;
            accessorystoremenuwhitecolbuttonstyle = "right: -0.5%; width: 25%; background-color: #434343; line-height: 44px; bottom: 109px; height: 44px; color: #4E4E4E; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenuwhitecolbutton.style = accessorystoremenuwhitecolbuttonstyle;
            accessorystoremenuwhitecolbutton.innerHTML = "OWNED";
            accessorystoremenuwhitecoldivstyle = "left: -0.5%; width: 75%; background-color: #595959; line-height: 40px; bottom: 109px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
            accessorystoremenuwhitecoldiv.style = accessorystoremenuwhitecoldivstyle;
            updatemoney(-25.0);
            //TODO: append whitecollar element to inventory menu.

        } else {
            //TODO: popup message stating insufficient funds, maybe go to work, or win a competition?
        }
    }

    var accessorystoremenuwhitecoldiv = document.createElement("div");
    var accessorystoremenuwhitecoldivstyle = "left: -0.5%; width: 75%; background-color: #5e5e5e; line-height: 40px; bottom: 109px; height: 40px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    accessorystoremenuwhitecoldiv.style = accessorystoremenuwhitecoldivstyle;
    accessorystoremenuwhitecoldiv.innerHTML = "White Collar $25";

    /*
    var accessorystoremenuhubbtnbutton = document.createElement("button");
    var accessorystoremenuhubbtnbuttonstyle = "right: 10%; width: 25%; background-color: #5e5e5e; line-height: 75px; bottom: 10%; height: 75px; color: #C9C9C9; font-size 20px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; visibility: hidden";
    accessorystoremenuhubbtnbutton.style = accessorystoremenuhubbtnbuttonstyle;
    accessorystoremenuhubbtnbutton.innerHTML = "BUY";
    */


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

    //document.getElementById('all').appendChild(accessorystoremenuhubbtn);



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
        var parkmenucompetitionstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        parkmenucompetition.style = parkmenucompetitionstyle;
        parkmenucompetition.innerHTML = "Enter Competition";
    //#endregion

    //#region parkmenu fetch button initiator
        var parkmenufetch = document.createElement("button");
        var parkmenufetchstyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        parkmenufetch.style = parkmenufetchstyle;
        parkmenufetch.innerHTML = "Play Fetch";
    //#endregion

    //#region parkmenu socialize button initiator
        var parkmenusocialize = document.createElement("button");
        var parkmenusocializestyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
        parkmenusocialize.style = parkmenusocializestyle;
        parkmenusocialize.innerHTML = "Socialize";
    //#endregion

    //#region parkmenu frisbee button initiator
    var parkmenufrisbee = document.createElement("button");
    var parkmenufrisbeestyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
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
    var storemenufoodstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    storemenufood.style = storemenufoodstyle;
    storemenufood.innerHTML = "Food Store";
//#endregion

//#region storemenu veterinary button initiator
    var storemenuveterinary = document.createElement("button");
    var storemenuveterinarystyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    storemenuveterinary.style = storemenuveterinarystyle;
    storemenuveterinary.innerHTML = "Veterinary";
//#endregion

//#region storemenu sport button initiator
    var storemenusport = document.createElement("button");
    var storemenusportstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    storemenusport.style = storemenusportstyle;
    storemenusport.innerHTML = "Sports Store";
//#endregion

//#region storemenu accessory button initiator
var storemenuaccessory = document.createElement("button");
var storemenuaccessorystyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
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
    var actionmenueatstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    actionmenueat.style = actionmenueatstyle;
    actionmenueat.innerHTML = "Eat";
//#endregion

//#region actionmenu drink button initiator
    var actionmenudrink = document.createElement("button");
    var actionmenudrinkstyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 75px; bottom: 35%; height: 75px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    actionmenudrink.style = actionmenudrinkstyle;
    actionmenudrink.innerHTML = "Drink";
//#endregion

//#region actionmenu walk button initiator
    var actionmenuwalk = document.createElement("button");
    var actionmenuwalkstyle = "left: -0.5%; width: 51.5%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
    actionmenuwalk.style = actionmenuwalkstyle;
    actionmenuwalk.innerHTML = "Walk";
//#endregion

//#region actionmenu Work button initiator
var actionmenuWork = document.createElement("button");
var actionmenuWorkstyle = "right: -0.5%; width: 50%; background-color: #5e5e5e; line-height: 80px; bottom: -0.5%; height: 80px; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute;";
actionmenuWork.style = actionmenuWorkstyle;
actionmenuWork.innerHTML = "Work";
actionmenuWork.ondblclick = function () {
    updatemoney(20);
    addfoodstat(-20);
    addhappystat(-10);
    addsocialstat(-10);
    addwaterstat(-20);
};
//#endregion
//#endregion




//#region stats initiators
    var statusstyle = "visibility: visible;";
    document.getElementById('status').style = statusstyle;
    //#region foodstats initiator
        var foodstat = 100.0;
        var repeaterfoodstat;
        var foodStatElem = document.createElement("div");
        var foodStatElemstyle = "left: 2.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
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
        var waterstat = 100.0;
        var repeaterwaterstat;
        var waterStatElem = document.createElement("div");
        var waterStatElemstyle = "left: 17.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
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
        var happystat = 100.0;
        var repeaterhappystat;
        var happyStatElem = document.createElement("div");
        var happyStatElemstyle = "left: 32.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
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
        var socialstat = 100.0;
        var repeatersocialstat;
        var socialStatElem = document.createElement("div");
        var socialStatElemstyle = "left: 47.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
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
    var healthstat = 100.0;
    var repeaterhealthstat;
    var healthStatElem = document.createElement("div");
    var healthStatElemstyle = "left: 62.5%; width: 200px; height: 40px; background-color: #5e5e5e; bottom: 5%; color: #C9C9C9; font-size 25px; border-radius: 0; border-color: #C9C9C9; border: 2px; border-style: solid; text-align: center; position: absolute; padding: 0;";
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
    innerfoodStatElemstyle = "width: " + foodstat + "%; height: 101%; background-color: #FF8800; border: 0; padding: 0; left: -1%;";
    innerfoodStatElem.style = innerfoodStatElemstyle;
}
//#endregion

//#region waterstat updaters
function updatewaterstat() {
    waterstat = waterstat - 0.1;

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
    innerwaterStatElemstyle = "width: " + waterstat + "%; height: 101%; background-color: #00B9FF; border: 0; padding: 0; left: -1%;";
    innerwaterStatElem.style = innerwaterStatElemstyle;
}
//#endregion

//#region happystat updaters
function updatehappystat() {
    happystat = happystat - 0.1;

    innerhappyStatElemstyle = "width: " + happystat + "%; height: 101%; background-color: #00FF3D; border: 0; padding: 0; left: -1%;";
    innerhappyStatElem.style = innerhappyStatElemstyle;

    if (happystat <= 0.0) {
        clearTimeout(repeaterhappystat);
        return;
    }

    repeaterhappystat = setTimeout(updatehappystat, 1000); // adjust last variable to determine how fast happystat drains
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
    innerhappyStatElemstyle = "width: " + happystat + "%; height: 101%; background-color: #00FF3D; border: 0; padding: 0; left: -1%;";
    innerhappyStatElem.style = innerhappyStatElemstyle;
}
//#endregion

//#region socialstat updaters
function updatesocialstat() {
    socialstat = socialstat - 0.1;

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
    innerhealthStatElemstyle = "width: " + healthstat + "%; height: 101%; background-color: #FF0000; border: 0; padding: 0; left: -1%;";
    innerhealthStatElem.style = innerhealthStatElemstyle;
}
//#endregion
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

    

}

function goToHomepageFromFoodstore() {
    //TODO: togglevisibility of foodstore
    setuphomepage();
}

function setupFrisbeeMinigame() {

    
    //toggles off visibility of park store money status and action menu
    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
    statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    //creates variable to hold x and y pos of frisbee
    let frisbee = {x:250, y:250};
    //creates image to store the frisbee
    var myImg = document.createElement('img');
    myImg.src = "frisbee.png";
    myImg.style = "width: 150px; height: 150px; padding: 10;"
    //sets frisbee to be draggable
    myImg.draggable = "true";
    myImg.id = "myImg"
    //creates canvas to draw frisbee on
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    currentX = canvas.width/2;
    currentY = canvas.height/2;
    //var to check if the frisbee should be able to be dragged
    var drag = false;
    //this function contains multiple event definitions for when the canvas is clicked. 
    function mouseTriggers() {
        //Creates a hit box between cursX and cursx+100 and cursy +100. If you click within this hit box you are able to drag the frisbee
        canvas.onmousedown = function(e) {
            var cursX = e.pageX - this.offsetLeft;
            var cursY = e.pageY - this.offsetTop;

            if(cursX >= (frisbee.x ) && cursX <= (frisbee.x + 100) && cursY >= (frisbee.y ) && cursY <= (frisbee.y + 100)) {
                drag = true;
            }

        };
        //after letting go of the mouse button, no longer dragging
        canvas.onmouseup = function(e) {
            drag = false;
        };
        //While moving redfines frisbee x and y coordinates accordingly
        canvas.onmousemove = function(e) {
            if(drag) {
                frisbee.x = e.pageX - this.offsetLeft;
                frisbee.y = e.pageY - this.offsetTop;
            }
        };
    }
    //when the frisbee is loaded in, on a specific interval we call mouseTriggers to see if anything is pressed/if pos is updated, refresh the screen full of white, and then draw the current pos of the frisbee
    myImg.onload = function() {
        setInterval(function() {
            mouseTriggers();
            context.fillStyle = '#fff';
            context.fillRect(0,0, canvas.width, canvas.height);
            context.drawImage(myImg, frisbee.x, frisbee.y,100,100);
            
          }, 1000/50);
        
    }

}

function setupAccessoryStore() { // can also take down accessory store

    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    // turns off main menu

    accessorystoremenubackgroundstyle = togglevisibility(accessorystoremenubackgroundstyle, document.getElementById('accessorystore'));

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



