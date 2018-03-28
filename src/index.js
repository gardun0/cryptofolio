import Maybe from 'folktale/maybe'
import Result from 'folktale/result'
import Future from 'folktale/concurrency/future'
import { curry, compose } from 'folktale/core/lambda'
import {
  map,
  reduce,
  join
} from 'barely-functional'

// IMPORTANT STUFF
import State from './state'
import * as Dom from './dom'
import Selector from './selectors'

// GENERAL FUNCTIONS
const joinComma = join(',')

// CRYPTOFOLIO
const generateWalletNodes = currencies =>
  currencies.reduce((prev, now) => Object.assign(prev, {
    [now.toLowerCase()]: Dom.createElem('div', {
      innerHTML: `
        <span class="value">${State.getState.currentCurrencies[now]}</span>
        <span class="crypto bg-${now.toLowerCase()}">${now}</span>
      `,
      id: `currency-${now.toLowerCase()}`
    })
  }), {});

const plainCurrencies = joinComma(Object.keys(State.getState.currentCurrencies))

const currenciesNow = Future.fromPromise(fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${plainCurrencies}&tsyms=${plainCurrencies},MXN,USD`))
  .chain(res => Future.fromPromise(res.json()))

const sumCurrencies = curry(2, (curr, api) =>
  Object.keys(curr).reduce((prev, now) => 
    Object.assign(prev, { [now]: api[now].USD * curr[now] })
  , {}))

const plainResult = obj => Future.of(Object.values(obj).reduce((prev, now) => prev + now, 0))

const trace = curry(2, (label, data) => {
  console.log(label, data)
  return data
})

const getResult = curry(2, (account, m) => {
  return compose(plainResult, sumCurrencies(account))(m)
  }
)

const walletNodes = generateWalletNodes(Object.keys(State.getState.currentCurrencies))

Selector.cryptoConvertions
  .chain(Dom.appendChildren(walletNodes))
  .chain(elem => {
    currenciesNow
      .chain(getResult(State.getState.currentCurrencies))
      .chain(value => {
        return Future.of(Dom.createElem('span', {
          innerText: `$${Math.floor(value)} usd`,
          id: 'total-value'
        }))
      })
      .chain(Dom.appendChild(elem))
  })
/*
setTimeout(() => {
  Dom.getChild('.value', walletNodes['btc']).chain(elem => {
    Dom.modifyElem({ innerText: '10.2' }, elem)
  })
  
}, 2000)

// GENERATE MAIN NODES
nodes.map(node => {
  list.map(x => {
    x.appendChild(node)
  })
})


pricesNow
  .then((response) => response.json())
  .then((cryptoData) => {
    console.log(cryptoData)
  })
*/