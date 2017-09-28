import  {
  scan,
  mapObjIndexed,
  flip,
  divide,
  map,
  compose,
  zipObj,
  sum,
  add,
  converge,
  values,
  keys,
  reduce,
  multiply,
  length,
  countBy,
  uniq,
  filter,
  gte,
  assoc,
  tap,
  drop,
  head,
  objOf,
  subtract,
  dropLast,
  lensIndex,
  view,
  equals,
  identity,
  times,
  call,
  lt,
  pair,
  zip,
  zipWith,
  merge,
  toUpper,
  pipe
} from 'ramda'
import { node } from 'fluture'
const c = require("chance");
const type = require("tcomb");
const csp = require("js-csp");
const pull = require("pull-stream");
const cs = require("cypher-stream")("bolt://localhost", "neo4j", "password1");
const { go } = csp;
const most = require("most");
const S = require("sanctuary");
const neo = require("neopreen");



const domains_ips_totals = `Match (d:Domaisn) WITH count(d) as domainCount
MATCH (i:IPs) WITH domainCount, count(i) as ipCount
RETURN domainCount, ipCount`;

