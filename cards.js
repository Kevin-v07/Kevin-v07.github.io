var errors=0;
var cardlist=[
    "baronedf",
    "blackwng",
    "blueeyes",
    "darkmagic",
    "mirrorjd",
    "rescuehydr",
    "promepr",
    "slmnphnx",
    "slmngz",
    "turbulenceac"
]


var cardSet=[];
var board=[];
var rows=4;
var columns=5;

var card1Selected;
var card2Selected;
var matchedPairs=0;


window.onload=function(){
    shuffleCards();
    startGame();
}

function shuffleCards(){
    cardSet= cardlist.concat(cardlist); //Dos cartas de cada una
    console.log("Antes del Barajeo",cardSet);
    //Mezclado o Barajeo de las cartas

    for( let i= cardSet.length-1;i>0; i--){
        let j= Math.floor(Math.random()*(i+1)); //obtener un random index
        //cambio
        let temp=cardSet[i];
        cardSet[i]=cardSet[j];
        cardSet[j]=temp;
    }
    console.log("Despues del barajeo",cardSet);
}

function startGame(){
    //Crear la tabla, en este caso de 4x5

    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<columns;c++){
            let cardImg= cardSet.pop();
            row.push(cardImg); //Para el Javascript


            //<img id="0-0" class="card" src="barone.jpg">
            let card=document.createElement("img");
            card.id= r.toString()+"-"+c.toString();
            card.src= cardImg+".jpg";
            card.classList.add("card");
            card.addEventListener("click",selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards,2000);
}

function hideCards(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            let card= document.getElementById(r.toString()+"-"+c.toString());
            card.src="cardbg.jpg";
        }
    }
}

function selectCard(){
    if(this.src.includes("cardbg")){
        if(!card1Selected){
            card1Selected=this;

            let coords= card1Selected.id.split("-"); //tomara el id "0-1" y lo convierte en ["0","1"]
            let r=parseInt(coords[0]);
            let c=parseInt(coords[1]);

            card1Selected.src= board[r][c]+".jpg";
        }
        else if(!card2Selected && this !=card1Selected){
            card2Selected= this;

            let coords= card2Selected.id.split("-"); //tomara el id "0-1" y lo convierte en ["0","1"]
            let r=parseInt(coords[0]);
            let c=parseInt(coords[1]);  
            card2Selected.src= board[r][c]+".jpg";
            setTimeout(update,2000);
        }
    }
}


function update(){
    //si ambas cartas no son iguales se realiza la siguiente funcion
    if(card1Selected.src != card2Selected.src){
        card1Selected.src= "cardbg.jpg";
        card2Selected.src= "cardbg.jpg";
        errors +=1;
        document.getElementById("errors").innerText=errors;
    } else{
        matchedPairs+=1;
        checkforCompletation();
    }
    card1Selected= null;
    card2Selected= null;
}

function checkforCompletation(){
    if(matchedPairs==cardlist.length){
        setTimeout(()=>{
            alert("¡Felicidades!, completaste el juego.");
        },500);
    }
}
