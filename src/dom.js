import { curry } from 'folktale/core/lambda'
import Maybe from 'folktale/maybe'

export const createElem = curry(2, (type, data = {}) =>
  Object.assign(document.createElement(type), data))

export const getElem = query =>
  Maybe.fromNullable(document.querySelector(query))

export const getChild = curry(2, (query, elem) =>
  Maybe.fromNullable(elem.querySelector(query)))

export const getAllElem = query =>
  Maybe.fromNullable(document.querySelectorAll(query))

export const modifyElem = curry(2, (props, elem = {}) =>
  Maybe.Just(Object.assign(elem, props)))

export const appendChildren = curry(2, (nodes, elem) => {
  ((typeof nodes === 'object') ?
    Object.values(nodes) :
    nodes
  ).map(node => elem.appendChild(node))
  
  return Maybe.Just(elem)
})

export const appendChild = curry(2, (elem, node) => {
  elem.appendChild(node)
  return elem
})