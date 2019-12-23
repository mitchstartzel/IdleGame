Vue.component('prog-bar', {props: ['name'], template: '<div class="myProgress"><div class="myBar" :id="name"></div></div>'})

var app = new Vue({
  el: '#app',
  data: {
    gold: 1,
    peonCount: 0,
    peons: []
  },
  methods: {
    clickGold: function () {
		this.gold += 1
    },
    clickPeon: function () {
		if (this.gold >= 10){
			this.gold -= 10
			this.peonCount += 1
            this.peons.push({text: "Peon" + this.peonCount, progress: 0})
		}
    }
  }
})

var i = 0;


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

function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("Peon0");
    var width = 1;
    var id = setInterval(frame, 100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

moveBars()



