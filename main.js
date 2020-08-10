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
   const div = {
     result: document.querySelector('#result')
   };
 
   function showBtn(target){
     return target.style.opacity = "1";
   };
   
   function hideBtn(target){
     return target.style.opacity = "0";
   };
   
   function showMessage(str){
      div.result.classList.add("isFocus")
      div.result.textContent = str;
   };
 
   function hideMessage(){
      div.result.classList.remove("isFocus")
      div.result.textContent = " ";
   };
 
   showBtn(btn.play);
 
   // Variables pour stocker la difficulté
   let times = 2;
   let speed = 700;
 
   // Ecouteurs d'évenements sur buttons
   btn.play.addEventListener('click', function(e){
     showMessage("")
     gameTime(times, speed);
     hideBtn(btn.play);
   });
 
   btn.valid.addEventListener('click', function(e){
     stopPlayerDo();
     hideMessage();
     hideBtn(btn.valid);
     checkForMatch();
   });
 
 
   function playerDo(){
     cell.forEach( cell => {
       cell.style.cursor = "pointer";
       cell.addEventListener('click', function(){
         if(cell.classList.contains("cellChosen")){
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
 
   function stopPlayerDo(){
     cell.forEach( cell => {
       cell.style.cursor = "normal";
       cell.removeEventListener('click', playerDo, true);
     });
   };
   
   // nombre aléatoire sur la longueur de la grille
   function random(){
     return Math.round(Math.random() * cell.length);
   };
   
   // Nettoyage de la grille
   function clearGrid(){
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
   function showBall(index){
     ball.classList.add("ball");
     cell[index].appendChild(ball);
     cellChosen.push(cell[index]);
     console.log(cellChosen);
   } 
 
 
   // Nombres de balls et vitesse selon le niveau de difficulté
   function gameTime(times, speed){
     let i = 0;
     let interval = setInterval(() => {
       i++;
       if(i > times){
         clearInterval(interval);
         showMessage("A vous");
         ball.classList.remove("ball");
         playerDo();
         showBtn(btn.valid)
       } else {
         intervalBall();
       }     
     }, speed);  
   }
   
   // Déclaration du niveau suivant en incrémentant times et speed
   function nextLevel(){
      hideMessage("")
      gameTime(times++, speed += - 50);
   };
 
 
   // Vérification si joueur à cocher même cellules que robot
   function checkForMatch(){
     let player;
     let robot;
     // comparer par rapport aux index de chaque tableaux
    for(let i = 0; i < cellChosen.length; i++){
      robot = cellChosen[i]
    }
    for(let j = 0; j < cellChoseId.length; j++){
      player = cellChoseId[j]
    }
    if(player === robot){
      console.log("ya match")
      showMessage("Bien joué mais facile");
      clearGrid();
      playerDo()
      window.setTimeout(nextLevel, 2000);
      hideBtn(btn.play);
    }
    else {
     console.log("ya pas match")
     showMessage("Déjà perdu t'abuses...")
     clearGrid();
     playerDo()
     btn.play.textContent = "Rejouez";
     showBtn(btn.play);
     times = 2;
     speed = 700;
    }
   }
 
   // condition et apparitions des balls
   function intervalBall(){
     console.log('lancement du jeu');
     let number = random();
     switch(number){
       case number:
         showBall(number);
         break;
     }
   }
 });
   