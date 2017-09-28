const {
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
  pipe,
  xprod,
  product
} = require("ramda");
const c = require("chance");
const type = require("tcomb");
const csp = require("js-csp");
const pull = require("pull-stream");
const cs = require("cypher-stream")("bolt://localhost", "neo4j", "password1");
const {go} = csp;
const most = require("most");
const S = require('sanctuary')
const neo = require('neopreen')
const Future = require('fluture')
const fetch = require('node-fetch')
const daggy = require('daggy')

const chance = new c();
const rI = compose(Math.floor, multiply(Math.random()), length);
const divideLeft = flip(divide);
rI;
var g = [
  11,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  3,
  4,
  5,
  6,
  47,
  47,
  47,
  53,
  82,
  53,
  53,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1
];
console.log(rI(g))
var t = countBy(Math.floor, g);
//R.zipObj(R.keys(freq(list)), exports.keysToInt(R.keys(exports.freq(list))))
zipObj(keys(t), keys(t));
t;
var s = zipObj(keys(t), keys(t));
const normalize = function (dict) {
  return R.map(divideLeft(sum(values(dict))), dict);
};

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
  zipUp: f => Box(f(x, x))
});

const l = console.log
//var result1 = Box(uniq(g)).map(s => console.log(assoc(s,s,{})))

const dd = x => zipObj(x, x);
const addUp = compose(sum, values);
const invert1 = compose(divide(1), sum, values);
const degreeDistDivisor = x => map(divideLeft(addUp(x)), x);

const div = a => b => a / b;
const gendry = createRandomData(10)(chance.domain);

map(divideLeft(compose(sum, values)));
map(compose(divideLeft, uniq))(g);
//compose(map(divide), compose(sum, values))
map(divideLeft, compose(sum, values))(g);
map(map(divideLeft, compose(sum, values))(g))(g);
dd(g, g);
// Box(g).zipUp(zipObj).fold(x => console.log(x))
// compose(map(divideLeft),compose(sum, values),zipObj(g))
degreeDistDivisor(dd(g));
const degreeDist = compose(degreeDistDivisor, dd);
degreeDist(g);

map(converge(divideLeft, [addUp]))(g);

const ccc = compose(degreeDistDivisor, converge(zipObj, [values, values]));
//ccc(g)

let total = addUp(g);
let invertTotal = divide(1, addUp(g));

console.log();
const telli = compose(degreeDistDivisor, converge(zipObj, [values, values])); //functionally same as gondola, more complexity just use mapObjIndexed
const ff = converge(zipObj, [values, values]); // zipObj for compose, [value] -> {value: value}
const wut = mapObjIndexed((v, k, o) => div(v)(sum(values(o)))); //degree distribution, functionally same as ccc
const scanList = map(gte(Math.random()), scan(subtract, 1)); //function for furby first comp -> after gondola
compose(converge(zipObj, [values, values]))(t);

const ff2 = map(x => objOf(x, parseInt(x, 10)));

chooseRandomIndex = function (list) {
  return filter(function (x) {
    return x === true;
  }, map(gte(Math.random()), scan(subtract, 1, values(list))));
};

//console.log(values(ff2(g)))
const gondola = compose(wut, ff)(g); //functionally same as telli, using mapObjIndexed
//console.log(gondola); console.log(wut(ff(g)))
const furby = tap(console.log, compose(length, filter(x => x === true),
//tap(console.log),
map(gte(Math.random())),
//tap(console.log),
dropLast(1),
//tap(console.log),
x => scan(subtract, 1, values(x)))(gondola));

//******************************************************************************
//******
function createRandomData(num) {
  type.Number(num);
  return function (func) {
    type.Function(func);
    return chance.unique(func, num);
  };
}

function createRandomData1(num) {
  type.Number(num);
  return function (func) {
    type.Function(func);
    return map(S.of(S.Maybe), chance.unique(func, num));
  };
}
var currentDomainMatches = `MATCH (d:Domain) WITH collect(d)
  as ds UNWIND ds as d MATCH (d)-[:CONNECTED]-(i:IP) WITH d, collect(i) as ip RETURN d, ip`;

// drop(1), x=> scan(add, 0, values(x)) console.log('gg',
// map(compose(filter(gte(Math.random())),scan(add,0)))(gondola))
// console.log('ff,',compose(x => scan(add,0, values(x)))(gondola))
// console.log(gondola[tap(console.log,chooseRandomIndex(gondola).length-1)])
const gggo = furby;
//console.log(gggo); console.log(gondola)
const flora = keys(gondola)[gggo];
// console.log("Flora:", flora); console.log(values(gondola).length)
// console.log(filter(x => x === parseInt(flora, 10))(g));
// console.log(chance.pickone(filter(x => x === parseInt(flora, 10))(g)));

const dolly = compose(mapObjIndexed((v, k, o) => compose(divide(v), sum, values)(o)), converge(zipObj, [values, values]));

// const jolly = compose(   length,   filter(x => x === true),
// map(gte(Math.random())),   dropLast(1),   x => scan(subtract, 1, x),
// values,   dolly );
const domainNameRegex = /^(?:[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?\.){0,126}(?:[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9]))\.?$/i

// console.log(S.of(S.Either, S.test(domainNameRegex, 'kkla.sksk')))
// console.log(S.of(S.Either, S.test(domainNameRegex, 'terraform')))

const Domain1 = daggy.tagged('Domain', ['name', 'weight'])

const DType = type.refinement(type.String, x => S.test(domainNameRegex, x), 'DType')

const Domain2 = type.struct({
  name: DType,
  ip: type.maybe(type.list(type.String)),
  weight: type.maybe(type.Number)
})

const unique = xs => [...new Set(xs)] // unique values!!!
//console.log(S.compose(x => map(S.div(S.sum(x)),x),unique)(g))

const jolly = pipe(dolly, values, x => scan(subtract, 1, x), dropLast(1), map(gte(Math.random())), filter(x => x === true), length)
const holly = S.pipe([
  dolly, values, x => scan(subtract, 1, x),
  dropLast(1),
  map(gte(Math.random())),
  filter(x => x === true),
  length
]);

const domainsPairs = compose(x => x(chance.domain), createRandomData, length)(g)
// console.log(map(x => Domain2({name: x[0], weight: x[1]}),
// zip(domainsPairs,g)))

const molly = converge((x, y) => view(lensIndex(x), keys(y)), [jolly, dolly]);

const domains_ips_totals = `Match (d:Domain) WITH count(d) as domainCount
MATCH (i:IP) WITH domainCount, count(i) as ipCount
RETURN domainCount, ipCount`;

console.log("molly " + molly(g));
// const y = parseInt(molly(g), 10); console.log(filter(x => equals(x, y), g));
// console.log(bolly(g)) const folly = view(lensIndex(jolly(g)), keys(gondola));
// console.log(folly);
console.log(dolly(g))
console.log(`holly ${holly(g)}`)

const golly = compose(mapObjIndexed((v, k, o) => compose(divide(v), sum, values)(o)), converge(zipObj, [keys, values]))

let diceRoll = Array.from({
  length: 6
}, (v, i) => i + 1)

l(diceRoll)
l(countBy(y => y, xprod(diceRoll, diceRoll).map(x => sum(x))))

let dict = countBy(y => y, xprod(diceRoll, diceRoll).map(x => sum(x)))
l(dict)
l('golly', golly(dict))

//l(map(flip(divide)(compose(sum,values)(dict)), dict))

l(mapObjIndexed((v, i, o) => {
  return keys(o).map(x => parseInt(i, 10) >= parseInt(x, 10)
    ? o[x]
    : 0).reduce(add)
}, golly(dict)))

//console.log(folly(gondola));

/*
exports.mapRandomizeAddExistingPair = function(domains) {
  return R.map(function(o) {
    return exports.mapAddIP(
      exports.mapPickDomain(
        exports.mapChoice(
          domains,
          exports.randomValue(
            exports.normalize(exports.degreeDist(exports.mapWeight(domains)))
          )
        )
      ),
      o
    );
  }, exports.mapGetIPList(domains));
};
adjustment for mapRandomizeExistingPair
Math.random() = 0,1 (add delete odd/even?)
Actually seperate logic, repeated code for add/substract (for picking domain)
random pick below

compose(
  furby,
  gondola
)
*/

const baratheon = createRandomData(10)(chance.ip);
const ip_domain_pairs = zip(gendry, baratheon);
const ip_object_pairs = zipWith(merge, map(objOf("domain"), gendry), map(objOf("ip"), baratheon));

const connections = {
  connection: ip_domain_pairs
};

//console.log(ip_object_pairs); const ch = csp.chan();

const fakeSave = tuple => console.log(tuple);

const addNewToGraph = `UNWIND $connections as c MERGE (d:Domain {name:c[0]}) MERGE (i:IP {address:c[1]}) 
   MERGE (i)-[:CONNECTED]->(d) RETURN d.name as domain, i.address as ip`;

const addNewToGraph2 = `MERGE (d:Domain {name: {domain} }) MERGE (i:IP {address:{ip}}) 
   MERGE (i)-[:CONNECTED]->(d) RETURN d.name as domain, i.address as ip`;
// Not what I want to do, want to send one at a time [[]] or [] var toPull =
// require('stream-to-pull-stream') var deferred =
// require("pull-defer").through(); var { stdin, stdout, stderr } =
// require("pull-stdio"); const stream = cs(addNewToGraph, connections); pull(
// pull.values(ip_object_pairs),   pull.map(d =>     pull(
// toPull.source(cs(addNewToGraph2,d)),       pull.log()     )   ),
// pull.onEnd(d => console.log(d)) ); function* save(name, table) {   while
// (true) {     let ball = yield csp.take(table);     if (ball === csp.CLOSED) {
//       console.log(name + ": table's gone");       return;     }     ball.hits
// += 1;     console.log(`${name} ${ball.hits}`);     yield csp.timeout(1000);
//   yield csp.put(table, ball);   } } csp.go(function*() {   const table =
// csp.chan();   csp.go(player, ["ping", table]);   csp.go(player, ["pong",
// table]);   yield csp.put(table, { hits: 0 });   //yield csp.timeout(1000);
// //table.close(); }); const ch = csp.chan(); const ch2 = csp.promiseChan();
// csp.operations.onto(ch, ip_object_pairs, false); csp.takeAsync(ch2, v => {
// console.log("Taking", v); }); var neo4j_driver_1 = require("neo4j-driver");
// var driver = neo4j_driver_1.v1.driver(   "bolt://localhost",
// neo4j_driver_1.v1.auth.basic("neo4j", "password1") ); const preen =
// neo.many({   domain: neo.string,   ip: neo.array(neo.string) }); const preen2
// = neo.row({   domainCount: neo.int,   ipCount: neo.int }) const cdm = "MATCH
// (d:Domain) WITH d, rand() as rand ORDER BY rand LIMIT 10 WITH collect(d" +
//      ") as ds UNWIND ds as d MATCH (d)-[:CONNECTED]-(i:IP) RETURN d.name as
// domain, co" +         "llect(i.address) as ip"; var streamSession =
// driver.session(); const getRecStream = Future.encaseP(getRecordsStream) const
// getCsStream = Future.encase(cs) function getRecordsStream(statement,
// parameters) {   return streamSession     .run(statement, parameters)
// .then(function(results) {   return map(function(record) {     return
// zipObj(record["keys"], record["_fields"]);   }, results.records); })
// .catch(function(error) {   streamSession.close();   throw error; }); }
// getRecordsStream(cdm).then(x => console.log(preen(x)))

const {Map, List} = require('immutable-ext')

console.log('FFFF')
// const f = getRecStream(cdm).map(preen) .fork(   x => console.error('x', x),
// x => console.log(     map(y =>  Domain2({       name: y.domain,       ip:
// y.ip,       weight: S.fromMaybe(0, S.of(S.Maybe, length(y.ip)))     }),
// x))) const gpol = getRecStream(domains_ips_totals).fork(console.error,
// console.log) const hghgj = getCsStream(domains_ips_totals) .fork(x =>
// console.error('xxx', x),   r => {     most.fromEvent('data', r).forEach(x =>
// null)     //console.log(r)     //setTimeout(() => console.log(r), 5000)   })
// const NS_PER_SEC = 1e9 const time = process.hrtime() async function testes()
// {       await getCsStream(domains_ips_totals).fork(console.error, r =>
//  most.fromEvent("data", r).forEach(x => console.log(x))       );       await
// setTimeout(() => console.log(process.hrtime(time), 1000))       await
// console.log('done') } testes(); hghgj.fork(console.error, console.log)
// go(function*() {   let value = yield ch;   //let promiseChan =
// csp.promiseChan();   //csp.put(promiseChan, 'Hello from ' + value);   //
// const next = async () => {   //    let y = await
// getRecordsStream(addNewToGraph2,value);   //    console.log('y',y)   //
// return y   // }   // let g = yield next();   // console.log('g', g)   //
// console.log('p', next())   let next = false;   while (value !== csp.CLOSED) {
//     if (!next) {       console.log(value, next);       //
// most.fromEvent("data", cs(addNewToGraph2, value)).forEach(d => {       //
// csp.putAsync(ch2, d);       //   console.log("Got ", d);       //
// console.log("Waiting for a value");       //   next = false;       // });
//   most         .of([addNewToGraph2, value])         .map(x =>
// getRecordsStream(...x))         //.map(mapObjIndexed((v, k, o) =>
// console.log(v, k, o)))         .await()         .map(head)         .map(x =>
// mapObjIndexed((v, k, o) => tap(console.log,toUpper(v)), x))
// .forEach(_ => {           next = false;         });       value = yield ch;
//     //console.log(value , next);     }   next = true;   yield csp.timeout(10)
//   //console.info('trips')     //var x = yield
// getRecordsStream(addNewToGraph2,value);     //yield csp.timeout(2000);
// //console.log("1 ", value, next);     //yield
// console.log(csp.put(promiseChan, value))   }   console.log("Channel
// closed!"); }); go(function*(){   let value = yield csp.take(ch2);
// console.log('ch 2 value 1 ', value)   //let promiseChan = csp.promiseChan();
// csp.put(promiseChan, 'Hello from ' + value); while (value !== csp.CLOSED) {
// //let stream = yield cs(addNewToGraph2,value)   //console.log(stream)
// console.log("Got ", value);   console.log("Waiting for a value");   //yield
// console.log(csp.put(promiseChan, value))   value = yield ch2
// console.log('ch 2 value 2 ', value) } console.log("Channel closed!");})

const fetchJsonStream = most.from
const Rx  = require('rxjs')
// Future.tryP(() => fetch('http://localhost:8080/todos').then(x =>
// x.json())).fork(console.error, p => most.from(p).forEach(x => l(x)))
// fetchf('https://api.github.com/users/Avaq') .chain(res => Future.tryP(_ =>
// res.json())) .map(user => user.name) .fork(console.error, console.log);

const jsonO = new Rx.Subject()
const urlT = 'http://localhost:8080/todos'
const stream = todos => s => s(todos)
getTodos = (url) => Future.tryP(() => fetch(url).then(x => x.json()))


l(getTodos(urlT))

//const fetchf = Future.encaseP(fetch);

// fetchf('https://api.github.com/users/Avaq')
// .chain(res => Future.tryP(_ => res.json()))
// .map(user => user.name)
// .fork(r => r, x => x)

l(getTodos(urlT).fork(console.error, x => jsonO.next(x)))

// jsonO.subscribe({
//   next: n => l(n),
//   error: e => l(e),
//   complete: () => l('complete')
// })

var items = {
  "todos": [
      {
          "id": 9,
          "name": "Ze ufkemer gaadohog visentav boeb.",
          "isComplete": false
      },
      {
          "id": 110,
          "name": "Cop po mada kuike lajbamoz.",
          "isComplete": true
      },
      {
          "id": 130,
          "name": "Zukozi unnobju ruowiwu udi nal.",
          "isComplete": false
      },
      {
          "id": 71,
          "name": "Cohvu sivowzus zolik ubda wev.",
          "isComplete": false
      },
      {
          "id": 119,
          "name": "Uhaen ahagi pesinno agagira jat.",
          "isComplete": false
      },
      {
          "id": 153,
          "name": "Haktu receen so wurhugow mop.",
          "isComplete": true
      },
      {
          "id": 65,
          "name": "Alubokas zow befvowu nis ojuilow.",
          "isComplete": false
      },
      {
          "id": 64,
          "name": "Ukligu fo pohitawu ulzoshem ez.",
          "isComplete": false
      },
      {
          "id": 1,
          "name": "Ofu lub tog hohili laga.",
          "isComplete": false
      },
      {
          "id": 12,
          "name": "Sizkolka asa vo cakicib nokuga.",
          "isComplete": true
      },
      {
          "id": 112,
          "name": "Kik or zimiga kalukva zujabkon.",
          "isComplete": true
      },
      {
          "id": 124,
          "name": "Geher wokpeh babofbu to fib.",
          "isComplete": false
      },
      {
          "id": 118,
          "name": "Huvluobe ra uc woh rapjodap.",
          "isComplete": false
      },
      {
          "id": 89,
          "name": "Lefhu ribodet wovful ebasi homud.",
          "isComplete": true
      },
      {
          "id": 44,
          "name": "Gek fe erbaga zunrad cinjan.",
          "isComplete": true
      },
      {
          "id": 142,
          "name": "Il fu higri usijate opan.",
          "isComplete": false
      },
      {
          "id": 181,
          "name": "Lilirefic ujfub faata sitzo buc.",
          "isComplete": true
      },
      {
          "id": 154,
          "name": "Fepazo su pubzore suapova cido.",
          "isComplete": false
      },
      {
          "id": 165,
          "name": "Iskueji vecozad re hiuh pora.",
          "isComplete": true
      },
      {
          "id": 195,
          "name": "Zutilba ihape daovi ebfoohu livu.",
          "isComplete": false
      }
  ]
}

//l(items.todos.sort((a, b) => parseInt(a.id, 10) > parseInt(b.id, 10) ? 1 : -1))

// var futes = fetch(urlT).then(x => x.json())
// async function testF () {
//   let x = await Promise.resolve(fetch(urlT)).then(x => l('op', x.json()))
// return x
// }



//l('test', testF())

// Rx.Observable.fromPromise(fetch(urlT).then(x => x.json()))
// .subscribe({
//   next: x => l(x),
//   error: e => l(e),
//   complete: () => l('isComplete')})

let tSub = new Rx.Subject()
  const futureFetchTodos = () => () =>
  {

  getTodos(urlT)
  .fork(console.error, x => tSub.next(x))

  }
futureFetchTodos()()
tSub.flatMap(y => y).subscribe({ 
    next: n => l('Next', n),
    error: e => l(e),
    complete: _ => l('complete')
  })