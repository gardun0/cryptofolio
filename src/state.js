const EventEmitter = require('events').EventEmitter

const State = function(initial = {}){
  this._initial = initial
  this._state = this._initial;

  EventEmitter.call(this)
}

State.prototype = Object.create({
  get getState(){
    return this._state
  },

  modifyTotal(newData){
    this._state.total = newData
    this.emit('changeTotal', this._state.total)
  },

  modifyCurrency(curr, value){
    this._state.currencies[curr] = value
    this.emit('changeCurrency', curr, this._state.currencies[curr])
  }
})

Object.assign(State.prototype, EventEmitter.prototype)

export default new State({
  total: 0,
  currencies: {
    BTC: 0,
    ETH: 0,
    LTC: 0,
    PRG: 0
  }
})
