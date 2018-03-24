const State = function(initial = {}){
  this._state = initial
}

State.prototype = {
  get getState(){
    return this._state
  },

  modify(key, value){
    this._state[key] = value
    return
  }
}

export default new State({
  total: 0,
  currentCurrencies: {
    BTC: 0,
    ETH: 0,
    LTC: 0,
    PRG: 0
  }
})