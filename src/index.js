import Future from 'folktale/concurrency/future'
import { curry, compose } from 'folktale/core/lambda'

// IMPORTANT STUFF
import State from './state'
import * as Dom from './dom'
import Selector from './selectors'

// GENERAL FUNCTIONS
const joinComma = str => str.join()

// CRYPTOFOLIO
const plainCurrencies = joinComma(Object.keys(State.getState.currencies))

const currenciesNow = Future.fromPromise(fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${plainCurrencies}&tsyms=${plainCurrencies},MXN,USD`))
  .map(res => res.json())
  .toPromise()

const getTotal = curry(2, (curr, api) =>
  Object.keys(curr).reduce((prev, now) => {
    return prev += curr[now] * api[now].USD
  }, 0))

/**
 * Initialize our script
 */
currenciesNow
  .then(currencies => {

    /*
     * Add onclick event on button
     */
    Selector.transferButton
      .map(Dom.createEvent('click', (evt) => {
        const data = Selector.selectCrypto.chain(e => e.options[e.selectedIndex].value.toUpperCase())
        const value = Number(Selector.inputValue.chain(elem => elem.value))

        State.modifyCurrency(data, State.getState.currencies[data] + value)
      }))

    /*
     * If we change the currencies state, then we modify the html
     */
    State.on('changeCurrency', (crypto, value) => {
      Selector.currencies[crypto]
        .chain(Dom.getChild('.value'))
        .map(Dom.modifyElem({
          innerText: value.toFixed(4)
        }))

      State.modifyTotal(getTotal(State.getState.currencies, currencies))
    })

    /**
     * So if we change the total, we have to change the Html as well
     */
    State.on('changeTotal', total => {
      Selector.totalValue
        .map(Dom.modifyElem({
          innerText: `${total.toFixed(4)} usd`
        }))
    })
  })
