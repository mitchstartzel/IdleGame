Vue.component('prog-bar', {props: {name: Number}, template: '<img src="https://i.imgur.com/acx5LyQ.png" class="test_peon" :id=name>'})

var app = new Vue({
  el: '#app',
  data: {
    gold: 0,
    peonCount: 0,
    peonCost: 10,
    peons: []
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
            this.peons.push({name: this.peonCount, mLeft: -95, mTop: 500, returning: false})
		}
    }
  }
})

function myMove() {
   var id = setInterval(frame, 40)
    function frame() {
        for (i = 0; i < app.peonCount; i++) {
            var peon = app.peons[i]
            var elem = document.getElementById(peon.name);
            if (!peon.returning){
                if (peon.mTop <= 125) {
                    elem.style.zIndex = 2;
                    peon.returning = true;
                } else if (peon.mTop > 100) {
                    peon.mTop -= 3;
                    peon.mLeft -= 1;
                    elem.style.marginTop = peon.mTop + 'px';
                    elem.style.marginLeft = peon.mLeft + 'px';
                }
            } else {
                peon.mTop += 3;
                peon.mLeft += 1;
                if (peon.mTop >= 500) {
                    app.gold += 10;
                    peon.returning = false
                    elem.style.zIndex = 3;
                } else {
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



