window.addEventListener('DOMContentLoaded', () => {
  console.log("document chargé");
 
   // tableau qui conserve les cellules choisit par l'ordi
   let cellChosen = [];
   // tableau qui conserve les cellules choisit par le player
   let cellChoseId = [];
 
   // Déclarations variables principales
   const cell = document.querySelectorAll(".cell");
   const ball = document.createElement('div');
 
   // Déclarations variables buttons
   const btn = {
     play: document.querySelector('#play'),
     valid: document.querySelector("#validation")
   };
 
   // Déclarations variables input
   const displayResult = document.querySelector('#result');

   const showBtn = (target) => target.style.opacity = '1';
   const hideBtn = (target) => target.style.opacity = "0";

   // nombre aléatoire sur la longueur de la grille
   const random = () => Math.round(Math.random() * cell.length);

   const showMessage = (str) => {
      displayResult.classList.add("isFocus")
      displayResult.textContent = str;
   }
   
   const hideMessage = () => {
      displayResult.classList.remove("isFocus")
      displayResult.textContent = "";
   }
 
   showBtn(btn.play);


   // Variables pour stocker la difficulté
   let times = 2;
   let speed = 700;
 
   
   const startGame = () => {
     showMessage("");
     hideMessage()
     gameTime(times, speed);
     hideBtn(btn.play);
    }
    
    // Ecouteurs d'évenements sur buttons
    btn.play.addEventListener('click', startGame);
   
    
   const checkGame = () => {
      stopPlayerDo();
      hideMessage();
      hideBtn(btn.valid);
      checkForMatch();
   }
 
   const playerDo = () => {
      cell.forEach(cell => {
         cell.style.cursor = "pointer";
         cell.addEventListener('click',() => {
            if (cell.classList.contains("cellChosen")){
              cellChoseId.pop(cell)
              cell.classList.remove("cellChosen");
            }
            else {
              cellChoseId.push(cell)
              cell.classList.add("cellChosen");
              console.log(cellChoseId)
            }
         })
      })
   }
 
   const stopPlayerDo = () => {
     cell.forEach(cell => {
       cell.style.cursor = "initial";
       cell.removeEventListener('click', playerDo, true);
     });
   };
   
   // Nettoyage de la grille
   const clearGrid = () => {
     cellChosen = [];
     console.log(cellChosen)
     cellChoseId = [];
     console.log(cellChoseId)
     cell.forEach(cell => {
       cell.classList.remove("cellChosen");
       console.log(cell)
     });
   };
 
   // Robot joue
   const showBall = (index) => {
     ball.classList.add("ball");
     cell[index].appendChild(ball);
     cellChosen.push(cell[index]);
     console.log(cellChosen);
   } 
 
 
   // Nombres de balls et vitesse selon le niveau de difficulté
   const gameTime = (times, speed) => {
     let i = 0;
     let interval = setInterval(() => {
       i++;
       if (i > times){
         clearInterval(interval);
         showMessage("A vous");
         ball.classList.remove("ball");
         playerDo();
         showBtn(btn.valid)
         btn.valid.addEventListener('click', checkGame);
       } 
       else {
         intervalBall();
       }     
     }, speed);  
   }
   
   // Déclaration du niveau suivant en incrémentant times et speed
   const nextLevel = () => {
      hideMessage("")
      gameTime(times++, speed += - 50);
   };
 
 
   // Vérification si joueur à cocher même cellules que robot
   const checkForMatch = () => {
      let player;
      let robot;
      // comparer par rapport aux index de chaque tableaux
      for (let i = 0; i < cellChosen.length; i++){
         robot = cellChosen[i]
      }
      for (let j = 0; j < cellChoseId.length; j++){
         player = cellChoseId[j]
      }
      if (player === robot){
         console.log("ya match")
         showMessage(`C'était trop facile \u{1F606}`);
         clearGrid();
         playerDo()
         window.setTimeout(nextLevel, 2000);
         hideBtn(btn.play);
      }
      else {
        console.log("ya pas match")
        showMessage(`Déjà perdu t'abuses...\u{1F631}`)
        clearGrid();
        playerDo()
        btn.play.textContent = "Rejouez";
        showBtn(btn.play);
        times = 2;
        speed = 700;
      }
   }
 
   // condition et apparitions des balls
   const intervalBall = () => {
      console.log('lancement du jeu');
      let number = random();
      switch(number){
         case number:
            showBall(number);
            break;
      }
   }
 });
   