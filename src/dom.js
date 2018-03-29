import { curry } from 'folktale/core/lambda'
import Maybe from 'folktale/maybe'

export const getElem = query =>
  Maybe.fromNullable(document.querySelector(query))

export const getChild = curry(2, (query, elem) =>
  Maybe.fromNullable(elem.querySelector(query)))

export const modifyElem = curry(2, (props, elem = {}) =>
  Object.assign(elem, props))

export const createEvent = curry(3, (evt, fn, elem) => {
  elem.addEventListener(evt, fn)
  return elem
})
