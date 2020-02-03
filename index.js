//These components generate the <img> tags for peons and loggers
Vue.component('peon', {props: {name: String}, template: '<img src="Sprites/walk1.png" class="test_peon" :id=name>'})

Vue.component('logger', {props: {name: String}, template: '<img src="Sprites/walk1.png" class="test_logger" :id=name>'})

/*to do
Visual Based Menu

Effects For Gold/Lumber Gain
*/

var app = new Vue({
  el: '#app',
  data: { //Game variables
    gold: 00000000,
    logs: 00000000,
	houses: 1,
	houseCost: 100,
    peonCount: 0,
    peonCost: 10,
    peons: [], //Array of peon objects
    loggerCount: 0,
    loggerCost: 10,
    loggers: [], //Array of logger objects
	//the rest of these are upgrade counters:
	peonSpeed: 1,
    peonSpeedCost: [750,250],
    
	peonAmount: 1,
    peonAmountCost: [500,500],
    
	mineSpeed: 1, //SHOULD CAP AT 5!!!
    mineSpeedCost: [250,750],
    
    //logger upgrades:
    loggerSpeed: 1,
    loggerSpeedCost: [750,250],
    
	loggerAmount: 1,
    loggerAmountCost: [500,500],

	loggingSpeed: 1, //SHOULD CAP AT 5!!!
    loggingSpeedCost: [250,750],
    
    //click upgrade
    clickGoldAmount: 1,
    clickGoldAmountCost: [2,2],
    
    
    //upgrade button controllers
    showMineSpeedUp: true,
    showLogSpeedUp: true,
  },
  methods: {
	//Click for gold!
    clickGold: function () {
		this.gold += this.clickGoldAmount
    },
    //Click for Logs!
    clickLogs: function () {
		this.logs += this.clickGoldAmount
    },
	clickHouse: function () {
		if (this.logs >= this.houseCost){
			this.logs -= this.houseCost
            this.houseCost = parseInt(100*(1.75**(this.houses)))
			this.houseCost -= this.houseCost%10
			this.houses += 1
        }
    },
    //Upgrade Peon Speed
    peonSpeedUp: function () {
        if (this.gold >= this.peonSpeedCost[0] && this.logs >= this.peonSpeedCost[1]) {
            this.gold -= this.peonSpeedCost[0]
            this.logs -= this.peonSpeedCost[1]
            this.peonSpeed += 1
            this.peonSpeedCost[0] = 750*parseInt(5**(this.peonSpeed))
            this.peonSpeedCost[1] = 250*parseInt(2.5**(this.peonSpeed))
        }
    },
    //upgrade gold carry amount
    peonAmountUp: function () {
        if (this.gold >= this.peonAmountCost[0] && this.logs >= this.peonAmountCost[1]) {
            this.gold -= this.peonAmountCost[0]
            this.logs -= this.peonAmountCost[1]
            this.peonAmount += 1
            this.peonAmountCost[0] = 500*parseInt(3**this.peonAmount)
            this.peonAmountCost[1] = 500*parseInt(1.5**this.peonAmount)
        }
    },
    //upgrade mining speed
    mineSpeedUp: function () {
		if (this.gold >= this.mineSpeedCost[0] && this.logs >= this.mineSpeedCost[1]) {
            this.gold -= this.mineSpeedCost[0]
            this.logs -= this.mineSpeedCost[1]
            this.mineSpeed += 1
            if (this.mineSpeed > 4) {
                this.showMineSpeedUp = false
            }
            this.mineSpeedCost[0] = 250*parseInt(10**this.mineSpeed)
            this.mineSpeedCost[1] = 750*parseInt(15**this.mineSpeed)
        }
    },
    //upgrade gold per click
    clickGoldUp: function () {
		if (this.gold >= this.clickGoldAmountCost[0] && this.logs >= this.clickGoldAmountCost[1]) {
            this.gold -= this.clickGoldAmountCost[0]
            this.logs -= this.clickGoldAmountCost[1]
            this.clickGoldAmount += 1
            this.clickGoldAmountCost[0] = 2**this.clickGoldAmount
            this.clickGoldAmountCost[1] = 2**this.clickGoldAmount
        }
    },
	//instatiates a new peon
    clickPeon: function () {
		if (this.gold >= this.peonCost && (this.peons.length + this.loggers.length < this.houses*5)){
			this.gold -= this.peonCost
            this.peonCost = parseInt(10*(1.25**(this.peonCount+1)))
			this.peonCount += 1
            this.peons.push({name: "Peon"+this.peonCount, mLeft: -95, mTop: 500, returning: false, mining: true, animState: 0, anim: 0, mineTimer: 0, mineReps: 5+(parseInt(Math.random()*10)%5)})
		}
    },
    //NOW LOGGER FUNCTIONS
    //instatiates a new logger
    clickLogger: function () {
		if (this.gold >= this.loggerCost && (this.peons.length + this.loggers.length < this.houses*5)){
			this.gold -= this.loggerCost
            this.loggerCost = parseInt(10*(1.25**(this.loggerCount+1)))
			this.loggerCount += 1
            this.loggers.push({name: "Logger"+this.loggerCount, mLeft: 20, mTop: 500, returning: false, logging: true, animState: 0, anim: 0, loggingTimer: 0, loggingReps: 5+(parseInt(Math.random()*10)%5)})
		}
    },
	//upgrade log carry amount
    loggerAmountUp: function () {
        if (this.gold >= this.loggerAmountCost[0] && this.logs >= this.loggerAmountCost[1]) {
            this.gold -= this.loggerAmountCost[0]
            this.logs -= this.loggerAmountCost[1]
            this.loggerAmount += 1
            this.loggerAmountCost[0] = 500*parseInt(3**this.loggerAmount)
            this.loggerAmountCost[1] = 500*parseInt(1.5**this.loggerAmount)
        }
    },
    //upgrade logging speed
    loggingSpeedUp: function () {
		if (this.gold >= this.loggingSpeedCost[0] && this.logs >= this.loggingSpeedCost[1]) {
            this.gold -= this.loggingSpeedCost[0]
            this.logs -= this.loggingSpeedCost[1]
            this.loggingSpeed += 1
            if (this.loggingSpeed > 4) {
                this.showLogSpeedUp = false
            }
            this.loggingSpeedCost[0] = 250*parseInt(10**this.loggingSpeed)
            this.loggingSpeedCost[1] = 750*parseInt(15**this.loggingSpeed)
        }
    },
	//Upgrade logger Speed
    loggerSpeedUp: function () {
        if (this.gold >= this.loggerSpeedCost[0] && this.logs >= this.loggerSpeedCost[1]) {
            this.gold -= this.loggerSpeedCost[0]
            this.logs -= this.loggerSpeedCost[1]
            this.loggerSpeed += 1
            this.loggerSpeedCost[0] = 750*parseInt(5**(this.loggerSpeed))
            this.loggerSpeedCost[1] = 250*parseInt(2.5**(this.loggerSpeed))
        }
    }
  }
})
//This function is responsible for automating peons and loggers
function runGame() {
	//effectively, there is a game tick every 90ms. (or whatever this interval is set to)
    var id = setInterval(frame, 90)
    function frame() {
        for (i = 0; i < app.peonCount; i++) {
            var peon = app.peons[i]
            peon.animState += 5;
            var elem = document.getElementById(peon.name);
            if (!peon.returning){ //peon is heading to mine
                switch (peon.animState) {
                    case 15:
                        elem.src="Sprites/walk2.png"; //walk 2
                        break;
                    case 30:
                        elem.src="Sprites/walk3.png"; //walk 3
                        break;
                    case 45:
                        elem.src="Sprites/walk2.png"; //walk 2
                        break;
                    case 60:
                        elem.src="Sprites/walk1.png"; //walk 1
                        break;
                    case 75:
                        elem.src="Sprites/walk5.png"; //walk 5
                        break;
                    case 90:
                        elem.src="Sprites/walk4.png"; //walk 4
                        break;
                    case 105: 
                        elem.src="Sprites/walk5.png"; //walk 5
                        break;
                    case 120:
                        elem.src="Sprites/walk1.png"; //walk 1
                        peon.animState = 0;
                        break;
                }
                if (peon.mTop <= 125) { //reached mine
                    elem.style.zIndex = 2;
                    peon.returning = true;
                    peon.mining = true;
                    peon.mLeft -= 75
                    elem.style.marginLeft = peon.mLeft + 'px';
                    elem.src = "https://i.imgur.com/acx5LyQ.png" //return 1
                } else if (peon.mTop > 100) {
                    peon.mTop -= (6*(1.25**app.peonSpeed));
                    peon.mLeft -= (2*(1.25**app.peonSpeed));
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
                
            } else if (peon.mining) { //peon is mining
                if (peon.mineReps - app.mineSpeed > 0) {
                    switch (peon.mineTimer) {
                        case 6:
                            break;
                        case 12:
                            break;
                        case 18:
                            break;
                        case 24:
                            break;
                        case 30:
                            break;
                        case 36:
                            break;
                        case 42:
                            peon.mineReps -= 1;
                            peon.mineTimer = 0;
                    }
                    peon.mineTimer += 2;
                } else {
                    peon.mining = false;
					peon.animState = 0;
                    peon.mineReps = 5 + (parseInt(Math.random()*10)%2);
                }
            
            } else { //peon returning
				switch (peon.animState) {
                    case 15:
                        elem.src="Sprites/mine1.png"; //log 1
                        break;
                    case 30:
                        elem.src="Sprites/mine2.png"; //log 2
                        break;
                    case 45:
                        elem.src="Sprites/mine3.png"; //log 3
                        break;
                    case 60:
                        elem.src="Sprites/mine2.png"; //log 2
                        break;
                    case 75:
                        elem.src="Sprites/mine1.png"; //log 1
                        break;
                    case 90:
                        elem.src="Sprites/mine4.png"; //log 2
                        break;
                    case 105: 
						elem.src="Sprites/mine5.png"; //log 4
						break;
					case 120:
						elem.src="Sprites/mine4.png"; //log 2
						peon.animState = 0;
						break;
                }
                if (peon.mTop >= 500) { //reached town hall
                    app.gold += app.peonAmount*10;
                    peon.returning = false
                    elem.style.zIndex = 3;
                    peon.mLeft += 75
                    elem.style.marginLeft = peon.mLeft + 'px';
                    elem.src = "Sprites/walk1.png" //walk 1
                    peon.animState = 0;
                } else {
                    peon.mTop += (6*(1.25**app.peonSpeed));
                    peon.mLeft += (2*(1.25**app.peonSpeed));
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
            }
			//handles animations for walking to mine
          
                
        }
		//animations work the same way for loggers
        for (i = 0; i < app.loggerCount; i++) {
            var logger = app.loggers[i]
            logger.animState += 5;
            var elem = document.getElementById(logger.name);
            if (!logger.returning){ //peon is heading to mine
                switch (logger.animState) {
                    case 15:
                        elem.src="Sprites/walk2.png"; //walk 2
                        break;
                    case 30:
                        elem.src="Sprites/walk3.png"; //walk 3
                        break;
                    case 45:
                        elem.src="Sprites/walk2.png"; //walk 2
                        break;
                    case 60:
                        elem.src="Sprites/walk1.png"; //walk 1
                        break;
                    case 75:
                        elem.src="Sprites/walk5.png"; //walk 5
                        break;
                    case 90:
                        elem.src="Sprites/walk4.png"; //walk 4
                        break;
                    case 105: 
                        elem.src="Sprites/walk5.png"; //walk 5
                        break;
                    case 120:
                        elem.src="Sprites/walk1.png"; //walk 1
                        logger.animState = 0;
                        break;
                }
                if (logger.mTop <= 125) { //reached mine
                    elem.style.zIndex = 2;
                    logger.returning = true;
                    logger.logging = true;
                    logger.mLeft += 75
                    elem.style.marginLeft = logger.mLeft + 'px';
                    elem.src = "https://i.imgur.com/acx5LyQ.png" //return 1
                } else if (logger.mTop > 100) {
                    logger.mTop -= (6*(1.25**app.loggerSpeed));
                    logger.mLeft += (2*(1.25**app.loggerSpeed));
                    elem.style.marginTop = logger.mTop + 'px';
                    elem.style.marginLeft = logger.mLeft + 'px';
                }
                
            } else if (logger.logging) { //logger is logging
                //console.log(logger.loggingReps + "minus" + app.loggingSpeed)
                if (logger.loggingReps - app.loggingSpeed > 0) {
                    switch (logger.loggingTimer) {
                        case 6:
                            break;
                        case 12:
                            break;
                        case 18:
                            break;
                        case 24:
                            break;
                        case 30:
                            break;
                        case 36:
                            break;
                        case 42:
                            logger.loggingReps -= 1;
                            logger.loggingTimer = 0;
                    }
                    logger.loggingTimer += 2;
                } else {
                    logger.logging = false;
                    logger.loggingReps = 5 + (parseInt(Math.random()*10)%2);
					logger.animState = 0;
                }
            
            } else { //logger returning
				switch (logger.animState) {
                    case 15:
                        elem.src="Sprites/log1.png"; //log 1
                        break;
                    case 30:
                        elem.src="Sprites/log2.png"; //log 2
                        break;
                    case 45:
                        elem.src="Sprites/log3.png"; //log 3
                        break;
                    case 60:
                        elem.src="Sprites/log2.png"; //log 2
                        break;
                    case 75:
                        elem.src="Sprites/log1.png"; //log 1
                        break;
                    case 90:
                        elem.src="Sprites/log2.png"; //log 2
                        break;
                    case 105: 
						elem.src="Sprites/log4.png"; //log 4
						break;
					case 120:
						elem.src="Sprites/log2.png"; //log 2
						logger.animState = 0;
						break;
                }
                if (logger.mTop >= 500) { //reached town hall
                    app.logs += app.loggerAmount*10;
                    logger.returning = false
                    elem.style.zIndex = 3;
                    logger.mLeft -= 75
                    elem.style.marginLeft = logger.mLeft + 'px';
                    elem.src = "Sprites/log1.png" //walk 1
                    logger.animState = 0;
                } else {
                    logger.mTop += (6*(1.25**app.loggerSpeed));
                    logger.mLeft -= (2*(1.25**app.loggerSpeed));
                    elem.style.marginTop = logger.mTop + 'px';
                    elem.style.marginLeft = logger.mLeft + 'px';
                }
            }
        }
    }
}

runGame()





