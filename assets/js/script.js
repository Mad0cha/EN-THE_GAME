window.onload = function(){

    // All constants for the game are defined here
    const hero = document.querySelector('.hero');
    const obstacle = document.querySelector('.obstacle');
    const hideDisplay = document.querySelectorAll('.hideDisplay');
    const obstacles = ["assets/img/obstacles/1.png","assets/img/obstacles/2.png","assets/img/obstacles/3.png","assets/img/obstacles/4.png",
                       "assets/img/obstacles/5.png", "assets/img/obstacles/6.png", "assets/img/obstacles/7.png", "assets/img/obstacles/8.png", 
                       "assets/img/obstacles/9.png", "assets/img/obstacles/10.png","assets/img/obstacles/11.png","assets/img/obstacles/12.png",
                       "assets/img/obstacles/13.png", "assets/img/obstacles/14.png","assets/img/obstacles/15.png","assets/img/obstacles/16.png", 
                       "assets/img/obstacles/17.png", "assets/img/obstacles/18.png","assets/img/obstacles/19.png", "assets/img/obstacles/20.png"]

    let evaluation = 0;

    document.body.onkeyup = function(e) {
        if (e.key == " " ||
            e.code == "Space" ||      
            e.keyCode == 32      
        ) {
            hero.classList.add('jump');
            hero.src="assets/img/hero_jump.png";

            setTimeout(() => {
                hero.src="assets/img/hero.gif"
            }, 500);

            setTimeout(() => {
                hero.classList.remove('jump');
            }, 800);
        }
    }

    function hideEnd(){
        hideDisplay.forEach(el => {
            el.style.display = 'none';
        });
        location.reload();
    }

    document.getElementById("closebtn").addEventListener("click", goBack);
    document.getElementById("againbtn").addEventListener("click", hideEnd);
    document.getElementById("btnTxt").addEventListener("click", hideEnd);

    function goBack (){
        window.location.href = "index.html";
    }

    const loop = setInterval(() => {
        
        const obstaclePosition = obstacle.offsetLeft; // Gets obstacle left offset in pixels
        const heroPosition = +window.getComputedStyle(hero).bottom.replace('px',''); // Gets hero bottom position
        // Ver o que faz o +
   
        if(obstaclePosition <= 100  // distance from hero to obstacle (obstacle is between 0 and 100 px from hero)
            && obstaclePosition > 0 
            && heroPosition < 95 // hero jump height
            || evaluation == 20){ 
            
            obstacle.style.animation = 'none';
            obstacle.style.left = `${obstaclePosition}px`; //Gets the variable from the obstacle
            
            hero.style.animation = 'none';
            hero.style.bottom = `${heroPosition}px`; //Gets the variable from the hero
            
            $(".sky-scroll").marquee("toggle");
            $(".mountain-scroll").marquee("toggle");
                
            showEnd();
            if(evaluation == 20){
                showEnd();
                document.getElementById("youWon").innerHTML = evaluation + ", Parabéns!";
            }
            else{
                document.getElementById("finalScore").innerHTML = evaluation  + " Valores";
            }

            clearInterval(loop);
        }

        // Count how many times the animation replays (used to calculate pontuation)
        let iterationCount = 0;
        
        obstacle.addEventListener('animationiteration', () => {

            iterationCount++

            if(iterationCount > evaluation){
                evaluation++

                document.getElementById("counter").innerHTML = evaluation;
                changeObstacleimg(obstacles[evaluation]) // Gets the corresponding image
            }
        });

        // Show game results
        function showEnd (){
            hideDisplay.forEach(el => {
                el.style.display = 'block';
            });
            hero.src="assets/img/hero_jump.png";
        }

        function changeObstacleimg(src){
            obstacle.src = src
        }

    }, 10);

 
    // sky-scroll
    jQuery(document).ready(function($) {
        $('.sky-scroll').marquee({
            direction: 'left',
            duration: 150000, 
            gap: 0,
            delayBeforeStart: 0,
            duplicated: true,
            startVisible: true
        });

        $('.mountain-scroll').marquee({
            direction: 'left',
            duration: 90000, 
            gap: 0,
            delayBeforeStart: 0,
            duplicated: true,
            startVisible: true
        });
        });    
    }