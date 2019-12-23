var app = new Vue({
  el: '#app',
  data: {
    gold: 1,
    peonCount: 0
  },
  methods: {
    clickGold: function () {
      this.gold += 1
    },
    clickPeon: function () {
      this.peonCount += 1
    }
  }
})

var gold = 0;