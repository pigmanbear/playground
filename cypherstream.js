var cs = require('cypher-stream')('bolt://localhost', 'neo4j', 'password1')
var R = require("ramda");
var neo4j = require("neo4j-driver").v1;
var fs = require('fs');
var stringify = require("streaming-json-stringify");
var csp = require('js-csp')
var most = require('most')
var { fromReadable, fromWritable, toWritable } = require('most-node-streams')

var both = R.both;
var compose = R.compose;
var cond = R.cond;
var converge = R.converge;
var has = R.has;
var identity = R.identity;
var invoker = R.invoker;
var is = R.is;
var isArrayLike = R.isArrayLike;
var isNil = R.isNil;
var map = R.map;
var mapObjIndexed = R.mapObjIndexed;
var prop = R.prop;
var zipObj = R.zipObj;
var test = R.test;

var g = {
   "records":[
      {
         "keys":[
            "key1",
            "key2"
         ],
         "length":2,
         "_fields":[
            {
               "identity":{
                  "low":143258,
                  "high":0
               },
               "labels":[
                  "Label1",
                  "Label2"
               ],
               "properties":{
                  "field1":"...",
                  "number":{
                     "low":42,
                     "high":0
                  },
                  "date":1460183280000
               }
            },
            {
               "identity":{
                  "low":117186,
                  "high":0
               },
               "labels":[
                  "Another",
                  "Node"
               ],
               "properties":{}
            }
         ],
         "_fieldLookup":{
            "key1":0,
            "key2":1
         }
      },
      {
         "keys":[
            "key1",
            "key2"
         ],
         "length":2,
         "_fields":[
            {
               "identity":{
                  "low":143260,
                  "high":0
               },
               "labels":[
                  "Label1",
                  "Label2"
               ],
               "properties":{
                  "field1":"...",
                  "number":{
                     "low":2,
                     "high":0
                  },
                  "date":1460183280000
               }
            },
            {
               "identity":{
                  "low":117186,
                  "high":0
               },
               "labels":[
                  "Another",
                  "Node"
               ],
               "properties":{}
            }
         ],
         "_fieldLookup":{
            "key1":0,
            "key2":1
         }
      }
   ],
   "summary":{
      "statement":{
         "text":"MATCH (a:Label1)\nMATCH (a)-[:Another]->(b)\nRETURN a AS key1, b AS key2\nORDER BY a.date DESC\nLIMIT 2",
         "parameters":{
            "skip":{
               "low":10,
               "high":0
            },
            "limit":{
               "low":2,
               "high":0
            }
         }
      },
      "statementType":"r",
      "updateStatistics":{
         "_stats":{
            "nodesCreated":0,
            "nodesDeleted":0,
            "relationshipsCreated":0,
            "relationshipsDeleted":0,
            "propertiesSet":0,
            "labelsAdded":0,
            "labelsRemoved":0,
            "indexesAdded":0,
            "indexesRemoved":0,
            "constraintsAdded":0,
            "constraintsRemoved":0
         }
      },
      "plan":false,
      "profile":false,
      "notifications":[
 
      ]
   }
}

// var recordToNative = converge(zipObj, [prop("keys"), prop("_fields")]);
// var isRecord = both(has("_fields"), has("keys"));

// var toNative = cond([
//   [isNil, identity],
//   [is(neo4j.types.Node), x => compose(toNative, prop("properties"))(x)],
//   [is(neo4j.types.Relationship), prop("properties")],
//   [neo4j.isInt, invoker(0, "toInt")],
//   [isArrayLike, x => map(toNative, x)],
//   [isRecord, x => compose(toNative, recordToNative)(x)],
//   [is(Object), x => mapObjIndexed(toNative, x)],
//   [R.T, identity]
//  ]);
// process.stdout(recordToNative(g));

var currentDomainMatches = `MATCH (d:Domain) WITH d, rand() as rand ORDER BY rand LIMIT 300000 WITH collect(d)
  as ds UNWIND ds as d MATCH (d)-[:CONNECTED]-(i:IP) WITH d, collect(i) as ip RETURN d.name as domain, 
  ip`;
//`MATCH (d:Domain) WITH d, rand() as rand ORDER BY rand LIMIT 300000 WITH collect(d)
//  as ds UNWIND ds as d MATCH (d)-[:CONNECTED]-(i:IP) WITH d, collect(i) as ip WHERE size(ip) >5  RETURN d.name as domain, 
//  ip`

const { Readable } = require("stream");
const util = require('util');
var $ = require("highland");
const inStream = Readable.call(this);

// var ReadStream = function() {
//   Readable.call(this, { objectMode: true });
// };
// util.inherits(ReadStream, Readable);
//util.inherits(inStream, Readable);

const oTs =  observable => $(push =>
  observable.subscribe({
    onNext      : data  => push(null, data),
    onError     : error => { push(error); push(null, $.nil); },
    onCompleted : ()    => push(null, $.nil)
  }))

var addExistingToGraph =
  "UNWIND $connections as c WITH c MATCH (d:Domain {name:c[0]}) MATCH (i:IP {addres" +
  "s:c[1]}) MERGE (i)-[:CONNECTED]->(d) RETURN d.name as domain, i.address as ip";
var deleteRelationships = `UNWIND $connections as c
   WITH c MATCH (d:Domain {name: c[0] })-[r:CONNECTED]-(i:IP {address: c[1]})
   DELETE r RETURN d.name as domain, i.address as ip`

var getCount = 
`Match (d:Domain) WITH count(d) as domainCount
MATCH (i:IP) WITH domainCount, count(i) as ipCount
RETURN domainCount, ipCount`

var getIPs = `MATCH (i:IP) RETURN i.address as IP`;

var getDomainPaths = 
  `MATCH (d: Domain {name: 'guhdi.vi'}) 
   WITH d 
   MATCH (i: IP )
   WITH d,i
   MATCH p = (d)-[*1..50]-(i)
   Return d, length(p) as length,  i`
var getDomain = `MATCH (d: Domain) WHERE d.name = {domain} RETURN d.name as name`
var myfile = fs.createWriteStream("myfile.json");

let params = [['guhdi.vi', '182.149.75.126']]
let domain = {domain: 'guhdi.vi', key: 'name'}
let tx = cs.transaction()
let golag = cs(getDomainPaths);
let goD = cs(getDomain, domain);
//console.log(goD)
tx.write({statement: getDomainPaths, commit: true})
//tx.write(getDomainPaths)
let stream = fromReadable(tx, 'data')
stream.observe(x => console.log('observing ', x)).catch(y => console.log(y))


// function* player(name, table) {
//   while (true) {
//     let ball = yield csp.take(table);

//     if (ball === csp.CLOSED) {
//       console.log(name + ": table's gone");
//       return;
//     }

//     ball.hits += 1;
//     console.log(`${name} ${ball.hits}`);

//     yield csp.timeout(1000);
//     yield csp.put(table, ball);
//   }
// }

// csp.go(function*() {
//   const table = csp.chan();

//   csp.go(player, ["ping", table]);
//   csp.go(player, ["pong", table]);

//   yield csp.put(table, { hits: 0 });
//   yield csp.timeout(10000);

//   table.close();
// });


// function fuzzysearch (needle, haystack) {
//   var tlen = haystack.length;
//   var qlen = needle.length;
//   if (qlen > tlen) {
//     return false;
//   }
//   if (qlen === tlen) {
//     return needle === haystack;
//   }
//   outer: for (var i = 0, j = 0; i < qlen; i++) {
//     var nch = needle.charCodeAt(i);
//     while (j < tlen) {
//       if (haystack.charCodeAt(j++) === nch) {
//         continue outer;
//       }
//     }
//     return false;
//   }
//   return true;
// }

// const All = x => ({
//   x,
//   concat: ({ x: y }) => All(x && y)
// });

// All.empty = () => All(true);
// const Fn = f =>
// ({
//     fold: f,
//     concat: o =>
//         Fn(x => f(x).concat(o.fold(x)))
// })
// //Example 9 Continued

// const hasVowels = x => !!x.match(/[aeiou]/ig)
// const longWord = x => x.length >= 5

// const both1 = Fn(compose(All, hasVowels))
//              .concat(Fn(compose(All, longWord)))

// console.log(['gym', 'bird', 'lilac']
// .filter(x => both1.fold(x).x))