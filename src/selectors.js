import * as Dom from './dom'

const selectors = {
  cryptoConvertions: Dom.getElem('#crypto-convertions'),
  totalValue: Dom.getElem('#total-value')
}

const specialSelectors = {
}

export default {
  ...selectors,
  ...specialSelectors
}
