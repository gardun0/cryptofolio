const EventEmitter = require('events').EventEmitter

const State = function(initial = {}){
  this._initial = initial
  this._state = this._initial;
}

State.prototype = {
  get getState(){
    return this._state
  },

  modify(newData, callback){
    this._state = Object.assign(this._state, newData)
    callback(newData)
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