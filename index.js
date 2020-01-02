//These components generate the <img> tags for peons and loggers
Vue.component('peon', {props: {name: String}, template: '<img src="https://i.imgur.com/k23yRbP.png" class="test_peon" :id=name>'})

Vue.component('logger', {props: {name: String}, template: '<img src="https://i.imgur.com/k23yRbP.png" class="test_logger" :id=name>'})

/*to do
Upgrades System
Click Amount
Mine Amount
Move Speed
Mine Speed

Visual Based Menu

Effects For Gold Gain

Full Animation


*/

var app = new Vue({
  el: '#app',
  data: { //Game variables
    gold: 999999,
    logs: 0,
    peonCount: 0,
    peonCost: 10,
    peons: [], //Array of peon objects
    loggerCount: 0,
    loggerCost: 10,
    loggers: [] //Array of logger objects
	//the rest of these are upgrade counters:
	peonSpeed: 0,
	loggerSpeed: 0,
	peonAmount: 0,
	loggerAmount: 0,
	clickGoldAmount: 0,
	clickLogAmount: 0,
	mineSpeedAmount: 0,
	logSpeedAmount:0
  },
  methods: {
	//Click for gold!
    clickGold: function () {
		this.gold += 1
    },
	//instatiates a new peon
    clickPeon: function () {
		if (this.gold >= this.peonCost){
			this.gold -= this.peonCost
            this.peonCost = parseInt(10*(1.25**(this.peonCount+1)))
			this.peonCount += 1
            this.peons.push({name: "Peon"+this.peonCount, mLeft: -95, mTop: 500, returning: false, mining: true, animState: 0, anim: 0, mineTimer: 0, mineReps: 0})
		}
    },
    //instatiates a new logger
    clickLogger: function () {
		if (this.gold >= this.loggerCost){
			this.gold -= this.loggerCost
            this.loggerCost = parseInt(10*(1.25**(this.loggerCount+1)))
			this.loggerCount += 1
            this.loggers.push({name: "Logger"+this.loggerCount, mLeft: 20, mTop: 500, returning: false})
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
                if (peon.mTop <= 125) { //reached mine
                    elem.style.zIndex = 2;
                    peon.returning = true;
                    peon.mining = true;
                    elem.src = "https://i.imgur.com/acx5LyQ.png" //return 1
                } else if (peon.mTop > 100) {
                    peon.mTop -= (6*(1.25**5));
                    peon.mLeft -= (2*(1.25**5));
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
            } else if (peon.mining) {
                if (peon.mineReps < 3) {
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
                            peon.mineReps+= 6;
                            peon.mineTimer = 0;
                    }
                    peon.mineTimer += 1;
                } else {
                    peon.mining = false;
                    peon.mineReps = 0;
                }
            
            } else { //peon returning
                if (peon.mTop >= 500) { //reached town hall
                    app.gold += 10;
                    peon.returning = false
                    elem.style.zIndex = 3;
                    elem.src = "https://i.imgur.com/k23yRbP.png" //walk 1
                    peon.animState = 0;
                } else {
                    peon.mTop += 6;
                    peon.mLeft += 2;
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
            }
			//handles animations for walking to mine
            if (!peon.returning){
                switch (peon.animState) {
                    case 15:
                        elem.src="https://i.imgur.com/dKAnONq.png"; //walk 2
                        break;
                    case 30:
                        elem.src="https://i.imgur.com/vvZaf3n.png"; //walk 3
                        break;
                    case 45:
                        elem.src="https://i.imgur.com/dKAnONq.png"; //walk 2
                        break;
                    case 60:
                        elem.src="https://i.imgur.com/k23yRbP.png"; //walk 1
                        break;
                    case 75:
                        elem.src="https://i.imgur.com/hzRLJbx.png"; //walk 5
                        break;
                    case 90:
                        elem.src="https://i.imgur.com/lGyfK8U.png"; //walk 4
                        break;
                    case 105: 
                        elem.src="https://i.imgur.com/hzRLJbx.png"; //walk 5
                        break;
                    case 120:
                        elem.src="https://i.imgur.com/k23yRbP.png"; //walk 1
                        peon.animState = 0;
                        break;
            }

            }
                
        }
		//animations work the same way for loggers
        for (i = 0; i < app.loggerCount; i++) {
            var peon = app.loggers[i]
            var elem = document.getElementById(peon.name);
            if (!peon.returning){
                if (peon.mTop <= 125) {
                    elem.style.zIndex = 2;
                    peon.returning = true;
                    elem.src = "https://i.imgur.com/acx5LyQ.png"
                } else if (peon.mTop > 100) {
                    peon.mTop -= 6;
                    peon.mLeft += 2;
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
            } else {
                
                if (peon.mTop >= 500) {
                    app.logs += 10;
                    peon.returning = false
                    elem.style.zIndex = 3;
                    elem.src = "https://i.imgur.com/k23yRbP.png"
                } else {
                    peon.mTop += 6;
                    peon.mLeft -= 2;
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
            }  
        }
    
    }
}

runGame()





