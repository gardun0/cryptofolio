import * as Dom from './dom'

const selectors = {
  totalValue: Dom.getElem('#total-value'),
  transferButton: Dom.getElem('#transfer-crypto-button'),
  inputValue: Dom.getElem('#transfer-value'),
  selectCrypto: Dom.getElem('#cryptoFrom'),
  currencies: {
    BTC: Dom.getElem('#currency-btc'),
    ETH: Dom.getElem('#currency-eth'),
    LTC: Dom.getElem('#currency-ltc'),
    PRG: Dom.getElem('#currency-prg')
  }
}

export default selectors
