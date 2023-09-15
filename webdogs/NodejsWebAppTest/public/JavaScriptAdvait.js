function setupCompetition() {
    //hide hub items
    document.getElementById("dogimg").removeChild(dogImgElem);
    parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
    storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
    moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
    statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
    actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
    inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
    hubbtn = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));

    document.body.style.backgroundImage = "url('CompetitionsBackground.png')";

    fetchMinigameBTN = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
    frisbeeMinigameBTN = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
    walkMinigameBTN = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));
    walkMinigameBTN = togglevisibility(frisbeehubbtnstyle, document.getElementById('fhBTN'));




document.getElementById('fhBTN').ondblclick = function () {
    window.location.reload()

//     //#region parkmenu initiators
// var parkmenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 35%; text-align:center; position: absolute; left: 5%; top: 35%; visibility: visible";
// //#region parkmenu title initiator
//    var parkmenutitle = document.createElement("parkmenutitle");
//    parkmenutitle.innerText = "Park";
//    var parkmenutitlestyle = "left: 50%; width: 100%; font-size: 50px;";
//    parkmenutitle.style = parkmenutitlestyle;
// //#endregion

// //#region storemenu initiators
// var storemenubackgroundstyle = "background-color: #5e5e5e; color: #C9C9C9; border-radius: 3px; border-color: #C9C9C9; border: 3px; border-radius: 0; border-style: solid; width: 400px; bottom: 35%; text-align:center; position: absolute; left: 35%; top: 35%; visibility: visible";
// //#region storemenu title initiator
// var storemenutitle = document.createElement("storemenutitle");
// storemenutitle.innerText = "Store";
// var storemenutitlestyle = "left: 50%; width: 100%; font-size: 50px;";
// storemenutitle.style = storemenutitlestyle;
// //#endregion







// //#region homepage setup
// document.getElementById('parkmenu').style = parkmenubackgroundstyle;
// document.getElementById('parkmenu').appendChild(parkmenutitle);
// document.getElementById('parkmenu').appendChild(parkmenucompetition);
// document.getElementById('parkmenu').appendChild(parkmenufetch);
// document.getElementById('parkmenu').appendChild(parkmenusocialize);
// document.getElementById('parkmenu').appendChild(parkmenufrisbee);

// document.getElementById('storemenu').style = storemenubackgroundstyle;
// document.getElementById('storemenu').appendChild(storemenutitle);
// document.getElementById('storemenu').appendChild(storemenufood);
// document.getElementById('storemenu').appendChild(storemenuveterinary);
// document.getElementById('storemenu').appendChild(storemenusport);
// document.getElementById('storemenu').appendChild(storemenucompetition);

// document.getElementById('actionmenu').style = actionmenubackgroundstyle;
// document.getElementById('actionmenu').appendChild(actionmenutitle);
// document.getElementById('actionmenu').appendChild(actionmenueat);
// document.getElementById('actionmenu').appendChild(actionmenudrink);
// document.getElementById('actionmenu').appendChild(actionmenuwalk);
// document.getElementById('actionmenu').appendChild(actionmenuWork);
// //#endregion
}

    
}
