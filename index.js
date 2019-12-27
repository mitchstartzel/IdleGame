Vue.component('peon', {props: {name: String}, template: '<img src="https://i.imgur.com/k23yRbP.png" class="test_peon" :id=name>'})

Vue.component('logger', {props: {name: String}, template: '<img src="https://i.imgur.com/k23yRbP.png" class="test_logger" :id=name>'})

//https://i.imgur.com/acx5LyQ.png return1
//https://i.imgur.com/k23yRbP.png

var app = new Vue({
  el: '#app',
  data: {
    gold: 999999,
    logs: 0,
    peonCount: 0,
    peonCost: 10,
    peons: [],
    loggerCount: 0,
    loggerCost: 10,
    loggers: []
  },
  methods: {
    clickGold: function () {
		this.gold += 1
    },
    clickPeon: function () {
		if (this.gold >= this.peonCost){
			this.gold -= this.peonCost
            this.peonCost = parseInt(10*(1.25**(this.peonCount+1)))
			this.peonCount += 1
            this.peons.push({name: "Peon"+this.peonCount, mLeft: -95, mTop: 500, returning: false, animState: 0, anim: 0})
		}
    },
    
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

function myMove() {
   var id = setInterval(frame, 90)
    function frame() {
        for (i = 0; i < app.peonCount; i++) {
            var peon = app.peons[i]
            peon.animState += 5;
            var elem = document.getElementById(peon.name);
            if (!peon.returning){
                if (peon.mTop <= 125) {
                    elem.style.zIndex = 2;
                    peon.returning = true;
                    elem.src = "https://i.imgur.com/acx5LyQ.png"
                } else if (peon.mTop > 100) {
                    peon.mTop -= 6;
                    peon.mLeft -= 2;
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
            } else {
                if (peon.mTop >= 500) {
                    app.gold += 10;
                    peon.returning = false
                    elem.style.zIndex = 3;
                    elem.src = "https://i.imgur.com/k23yRbP.png"
                    peon.animState = 0;
                } else {
                    peon.mTop += 6;
                    peon.mLeft += 2;
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
            }
            if (!peon.returning){
                switch (peon.animState) {
                    case 15:
                        elem.src="https://i.imgur.com/dKAnONq.png";
                        break;
                    case 30:
                        elem.src="https://i.imgur.com/vvZaf3n.png";
                        break;
                    case 45:
                        elem.src="https://i.imgur.com/dKAnONq.png";
                        break;
                    case 60:
                        elem.src="https://i.imgur.com/k23yRbP.png";
                        break;
                    case 75:
                        elem.src="https://i.imgur.com/hzRLJbx.png";
                        break;
                    case 90:
                        elem.src="https://i.imgur.com/lGyfK8U.png";
                        break;
                    case 105:
                        elem.src="https://i.imgur.com/hzRLJbx.png";
                        break;
                    case 120:
                        elem.src="https://i.imgur.com/k23yRbP.png";
                        peon.animState = 0;
                        break;
            }

            }
                
        }
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

myMove()

function moveBars() {
    
    var id = setInterval(frame, 50)
    function frame() {
        for (i = 0; i < app.peonCount; i++) {
            var peon = app.peons[i]
            if (peon.progress >= 100) {
                peon.progress = 0
                app.gold += 10
            }
            peon.progress++;
            document.getElementById(peon.text).style.width = peon.progress + "%";
        }
    
    }
}
//moveBars()



