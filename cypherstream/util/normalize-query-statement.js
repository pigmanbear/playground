'use strict';
const {
  cond,
  flatten,
  identity,
  is,
  isNil,
  mal,
  objOf,
  pipe
} = requie('ramda')

var normalize = cond([
  [isNil, identity],
  [is(String), objOf('statement')],
  [is(Object), identity],
]);
/**
 * Standardizes a query statement from various formats to an array of objects
 */
module.exports = pipe(R.of, flatten, map(normalize));