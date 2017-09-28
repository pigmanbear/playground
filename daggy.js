import * as daggy from 'daggy';
import * as qjobs from 'qjobs';
import  {spawn} from 'threads'
import * as most from 'most'
import * as R from 'ramda'

const Link = daggy.tagged('Links', ['source', 'target']);

console.log(Link.toString());
console.log(Link('google.com', '1.2.3.4'));

// function * gg(x) {
//     var y = yield x;
//     yield y;
//     console.log('First', y, x);
//     yield y + x;
//     console.log(y, x);
//     yield y - x;
//     console.log(y, x);
// }

//var gen = gg(1);

// const myAsyncFunction = async function (x, y) {
//     return x + y;
// }
// console.log(myAsyncFunction(4, 3))
// console.log(gen.next());

// console.log(gen.next(5));

// console.log(gen.next());
// console.log(gen.next());

// setInterval(() => console.log('IN MAIN EVENT LOOP?'), 1000);

// // My non blocking main job var myjob = async function (args, next) {
// setTimeout(function () {         console.log('Do something interesting here',
// args);         var t = 0;         for( t; t < 1e10; t++) {             t =
// t+1;         }         var hh = t;         console.log(hh);         next();
//   }, 1000); } var q = new qjobs({maxConcurrency: 10}); // Let's add 30 job to
// the queue for (var i = 0; i < 30; i++) {     q.add(myjob, [         i, 'test
// ' + i     ]); } q     .on('start', function () {
// console.log('Starting ...');     }); q.on('end', function () {
// console.log('... All jobs done'); }); q.on('jobStart', function (args) {
// console.log('jobStart', args); }); q.on('jobEnd', function (args) {
// console.log('jobend', args);     // If i'm jobId 10, then make a pause of 5
// sec     if (args._jobId == 10) {         q.pause(true);
// setTimeout(function () {             q.pause(false);         }, 5000);     }
// }); q.on('pause', function (since) {     console.log('in pause since ' +
// since + ' milliseconds'); }); q.on('unpause', function () {
// console.log('pause end, continu ..'); }); q.run(); q.abort() will empty jobs
// list

// const thread = spawn(function (input, done, progress) {
//     while(true) {
//         input++
//         if(input % 100000000 === 0) progress(input)
//     }
// });

// thread.send(0)
// // The handlers come here: (none of them is mandatory)
//     .on('progress', function (progress) {
//         console.log(`Progress: ${progress}`);
//     })
//     .on('message', function (response) {
//         console.log('123 * 2 = ', response * 2);
//         thread.kill();
//     })
//     .on('error', function (error) {
//         console.error('Worker errored:', error);
//     })
//     .on('exit', function () {
//         console.log('Worker has been terminated.');
//     });

//const thread2 = spawn(function () {});

// thread2.run(function minmax(int, done) {
//     if (typeof this.min === 'undefined') {
//         this.min = int;
//         this.max = int;
//     } else {
//         this.min = Math.min(this.min, int);
//         this.max = Math.max(this.max, int);
//     }
//     done({min: this.min, max: this.max});
// })
//     .send(2)
//     .send(3)
//     .send(4)
//     .send(1)
//     .send(5)
//     .on('message', function (minmax) {
//         console.log('min:', minmax.min, ', max:', minmax.max);
//     })
//     .on('done', function () {
//         thread2.kill();
//     });

const {fork} = require('child_process');

const forked = fork('service.js');

// forked.on('message', (msg) => {
//    // console.log('Message from child', msg);
// });

// forked.send({hello: 'world'});


"use strict";

//
// Require all dependencies.
//
var express = require("express"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  http = require("http"),
  Primus = require("primus"),
  primusSession = require("./session"),
  requestId = require("request-id/express"),
  request = require("request"),
  StringStream = require("scramjet"),
  stringify = require("streaming-json-stringify"),
  fs = require("fs");

//
// Create an Express application.
//
var app = express();

//
// Configure and save a reference to the `cookie-parser` middleware so we can
// reuse it in Primus.
//
var secret = "shhhh, very secret",
  cookies = cookieParser(secret);

//
// Since this is only an example, we will use the `MemoryStore` to store the
// sessions. This is our session store instance.
//
var store = new expressSession.MemoryStore();

//
// Add the middleware needed for session support.
//
app.use(requestId());
app.use(cookies);
app.use(
  expressSession({
    saveUninitialized: true,
    secret: secret,
    resave: true,
    store: store,
    cookie: {
      maxAge: 600000
    }
  })
);

app.get("/", function index(req, res) {
  //
  // Every time that we visit the index page we update the session with a new
  // timestamp.
  //
  req.session.timestamp = Date.now();
  console.log(req.sessionID);
  //console.log(req.headers);
  console.log(req.requestId);
  req.sessionID = req.requestId;
  console.log("after ", req.sessionID);
  Object.assign(req, { apiRequest: req.sessionID });
  // res.sendFile(__dirname + '/index.html');
  //res.setHeader("Content-Type", "application/json; charset=utf-8");
  let columns = null;
  //const request = require("request");

  //var rs = fs.createReadStream(__dirname + "/index.html");
  //rs.pipe(res);
    res.sendFile(__dirname + "/index.html");
});

//
// Create an HTTP server and our Primus server.
//
var server = http.createServer(app),
  primus = new Primus(server);

//
// Here we add the `cookie-parser` middleware and our session middleware. The
// first will populate `req.signedCookies` and the second `req.session` for the
// requests captured by Primus.
//
function* numbers() {
	for(var i=0 ;; ++i) {
		yield i;
	}
}
var numb = numbers()
var num = most.from(numbers());

primus.use("cookies", cookies);
primus.use("session", primusSession, { store: store });

primus.on("connection", function connection(spark) {
  //
  // Our session data can now be read from `spark.request.session`.
  //
  // forked.on("message", data => {
  //   spark.write(JSON.stringify(data), null, " ");
  // });
var periodstream = most.periodic(5);
// Create an infinite stream of numbers

var stream = most.fromEvent("message", forked).map(d => JSON.stringify(d));
stream
  //.zip((s,n) => s, num.take(1))
  .zip((s, p) => s, periodstream)
  .observe(x => { spark.write(x, null, " "); /*console.log(numb.next())*/})

// var zipIt = most.zip(periodstream, stream, (p, s) => spark.write(x, null, " "));
// zipIt.observe(x => x);
  //spark.write(JSON.stringify(spark.request.session, null, "  "));
});
most
  .from([1, 2, 3, 4])
  .zip(v => v, most.periodic(10))
  .scan((result, y) => result + y, 0)
  .forEach(x => console.log(x));

//num.take(100).forEach(console.log.bind(console));
//
// Begin accepting connections.
//
server.listen(8080, function listening() {
  console.log("Open http://localhost:8080 in your browser");
});

let list2 = [1,1,1,1,1,1]
l(list2.reduce((x,y) => x+y))