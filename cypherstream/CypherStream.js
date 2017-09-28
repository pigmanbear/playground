"use strict";
var $ = require('most')
var neo4j = require("neo4j-driver").v1;
var normalize = require("./util/normalize-query-statement");
var observableToStream = require("./util/observable-to-stream");
var R = require("ramda");
var Readable = require("stream").Readable;
var toNative = require("./util/to-native");
var S = require('sanctuary')
var Future = require('fluture')

var compose = R.compose;
var cond = R.cond;
var curry = R.curry;
var has = R.has;
var map = R.map;
var prop = R.prop;
var o = R.o;

var tap = R.tap;
var log = console.log.bind(console);
log.run = R.tap(log);
// session => statement => observable
var run = curry((runner,statement) => runner.run(statement.statement, statement.parameters))

var emitError = curry((stream, error) => stream.emit("error", error));

var handleNeo4jError = emit =>compose(
        map(compose(
            emit, 
            error => new neo4j.Neo4jError(error.message, error.code)),
        prop("fields")
    )
  );

var handleError = emit =>
  cond([
        [isNeo4jError, handleNeo4jError(emit)], 
        [R.T, emit]
    ]);

var isNeo4jError = R.has("fields");

class CypherStream extends Readable {
  constructor(runner, statements, options) {
    super({ objectMode: true });
    this.statements = statements;
    this.runner = runner;
    this.options = options || {};
    this.start();
  }


  start() {

    // let stream = compose(run(this.runner), R.head, normalize)(this.statements);
    // stream.subscribe({
    //   onNext: data => this.push(toNative(data)),
    //   onError: err => handleError(emitError(this,err)),
    //   onCompleted: () => this.push(null)
    // });




    $.of(this.statements)
        .chain(x => $.from(normalize(x)))
        .filter(x => has("statement",x))
        .chain(statement => {
            let stream = compose(observableToStream,run(this.runner))(statement)
            stream = stream.map(toNative);
            return stream
        })
        .recoverWith(e => {
            handleError(emitError(this, e))
            return $.empty()
        })
        .observe(x => this.push(x))
        .then(() => this.push(null))

    //     if ("neo4j" !== this.options.returnType) {
    //       stream = stream.map(toNative);
    //     }

    //     if (statement.callback) {
    //       statement.callback(stream.observe());
    //     }
  }

  _read() {}
}

//module.exports = CypherStream;

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "password1")
);
var getDomainPaths = `MATCH (d: Domain {name: 'guhdi.vi'}) 
   WITH d 
   MATCH (i: IP )
   WITH d,i
   MATCH p = (d)-[*1..100]-(i)
   Return d, length(p) as length,  i, p`;
const cdm =
  "MATCH (d:Domain) WITH d, rand() as rand ORDER BY rand LIMIT 10 WITH collect(d" +
  ") as ds UNWIND ds as d MATCH (d)-[:CONNECTED]-(i:IP) RETURN d.name as domain, co" +
  "llect(i.address) as ip";

const driverF = Future.try(driver.session)


// driverF.fork(console.error, console.log)
//const cs = new CypherStream(driverF,cdm)

//$.fromEvent("data", cs).forEach(x => console.log(x))
//$.fromEvent('error',cs).forEach(x => console.log('error', x))
// cs.on('error', e => console.log('E',e))
// cs.on('data', x => console.log(x))
//const js = new CypherStream(driver.session(),"CALL db.indexes()");
//$.fromEvent("data", js).filter(x => S.test(/Domain\(name\)/, x.description)).forEach(x => console.log(x));
const attempt = Future.fold(S.Left, S.Right);
// const sessionReject = e => Future.reject("Failed to load driver ",  e);
// const sessionOpen = m => Future.resolve(m)

Future.do(function*() {
  const e = yield driverF.fold(S.Left, S.Right)
  return S.either(e => `Oh no! ${e}`, x => `Yippee! ${x}`, e);
}).fork(console.error, console.log);


driverF
  .fold(S.Left, S.Right)
  .map(S.either(e => `Oh no! ${e}`, x => `Yippee! ${x}`))
  .fork(console.log, console.log);

  process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });