//work activity

function setupWorkMinigame(){
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
    
    //start work game
    //generate random numbers
    var firstNumber = parseInt(Math.random()*10);
    var secondNumber = parseInt(Math.random()*10);
    //get the total
    var total = firstNumber + secondNumber;
    //display numbers on the canvas
    var primary = document.getElementById('primary-number');
        primary.innerHTML = `<p>${firstNumber}</p>`;
    var secondary = document.getElementById('secondary-number');
        secondary.innerHTML = `<p>${secondNumber}</p>`;
    //get guess from user
    guessBtn.ondblclick('click', function(){
    var guess = document.getElementById('guess').value;
    guess = Number(guess);
    //check answer
    if (guess === total){
        window.alert('You just got paid!');
        window.location.reload();
        updatemoney(10);
    } else {
        window.alert('Sorry, the correct answer was ' + total + '.');
        window.location.reload();
}
    });

//go back to home page function indicat
    if(workhubbtnstyle.ondblclick == true || workhubbtn.ondblclick == true){
        goBackFromWork();
    }

    //goes back to hub page 
        function goBackFromWork(){
            //Hides throw and hub buttons
            workhubbtnstyle = togglevisibility(workhubbtnstyle, document.getElementById('workhBTN'));
            //clear the canvas
            context.clearRect(0,0, canvas.width, canvas.height);
            //Makes park menu visible
            parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
            //Makes store visible
            storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
            //Makes status visible
            statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
            //Makes action menu visible
            actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
            //Makes the inventory button visible
            inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
            //Redraws the dog for main menu
            document.getElementById("dogimg").appendChild(dogImgElem);
            //Below clears the entire minigame.
            workImgElemStyle = togglevisibility(workImgElemStyle, document.getElementById('workImg'));
            // *previous code*
            // setuphomepage();
            // //workhubbtn = togglevisibility(workhubbtn, document.getElementById('workhubBTN'));
            // workhubbtnstyle = togglevisibility(workhubbtnstyle, document.getElementById('workhBTN'));
            // context.clearRect(0,0, canvas.width, canvas.height);
            // parkmenubackgroundstyle = togglevisibility(parkmenubackgroundstyle, document.getElementById('parkmenu'));
            // storemenubackgroundstyle = togglevisibility(storemenubackgroundstyle, document.getElementById('storemenu'));
            // //moneyElemStyle = togglevisibility(moneyElemStyle, moneyElem);
            // statusstyle = togglevisibility(statusstyle, document.getElementById('status'));
            // actionmenubackgroundstyle = togglevisibility(actionmenubackgroundstyle, document.getElementById('actionmenu'));
            // //inventorybtnstyle = togglevisibility(inventorybtnstyle, inventorybtn);
            // document.getElementById("dogimg").appendChild(dogImgElem);
        }
}