// LOAD STYLES
import '../assets/app.css'

// LIBRARIES
import { curry , map} from 'barely-functional'
import Maybe from 'data.maybe'

// IMPORTANT STUFF
import State from './state'

const cryptoToText = arr => arr.join()

const createElem = curry((type, innerData) => {
  let elem = document.createElement(type)
  elem.innerHTML = innerData
  return elem
})

const getElem = (query) => Maybe.fromNullable(document.querySelector(query))

const generateNodes = currencies => {
  return Maybe.of(Object.keys(currencies).reduce((prev, key) =>{
    prev.push(createElem('div', `
      <div class="crytpo-element">
        <span>${currencies[key]}</span>
        <span>${key}</span>
      </div>
    `))
    return prev
  }, []))
}

const pricesNow = fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${cryptoToText(Object.keys(State.getState.currentCurrencies))}&tsyms=USD,MXN`)

const nodes = generateNodes(State.getState.currentCurrencies)
const listElem = getElem('#crypto-convertions')

const appendChild = curry((elem, nodes) => {
  return map(node => {
    elem.appendChild(node)
  }, nodes)
})


listElem.chain(elem => {
  nodes.chain(appendChild(elem))
})
/*
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