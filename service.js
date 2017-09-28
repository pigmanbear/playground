"use strict";
var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) 
            if (Object.prototype.hasOwnProperty.call(s, p)) 
                t[p] = s[p];
            }
        return t;
};
Object.defineProperty(exports, "__esModule", {value: true});
// tslint:disable
var neo4j_driver_1 = require("neo4j-driver");
var R = require("ramda");
var chance_1 = require("chance");
var Rx = require("rxjs");
var _ = require("./utilities");
var chance = new chance_1.Chance(Math.random() * 100);
var driver = neo4j_driver_1
    .v1
    .driver('bolt://localhost', neo4j_driver_1.v1.auth.basic('neo4j', 'password1'));
// TODO: CREATE INDEX AFTER INITIAL RUN
var currentDomainMatches = "MATCH (d:Domain) WITH d, rand() as rand ORDER BY rand LIMIT 10000 WITH collect(d" +
        ") as ds UNWIND ds as d MATCH (d)-[:CONNECTED]-(i:IP) RETURN d.name as domain, co" +
        "llect(i.address) as ip";
var currentIPMatches = "MATCH (i:IP)-[:CONNECTED]->(d:Domain) RETURN i.address AS address, collect(d.nam" +
        "e) AS Domain LIMIT 10";
var addNewToGraph = "UNWIND $connections as c MERGE (d:Domain {name:c[0]}) MERGE (i:IP {address:c[1]}" +
        ") MERGE (i)-[:CONNECTED]->(d) RETURN d.name as domain, i.address as ip";
var addExistingToGraph = "UNWIND $connections as c WITH c MATCH (d:Domain {name:c[0]}) MATCH (i:IP {addres" +
        "s:c[1]}) MERGE (i)-[:CONNECTED]->(d) RETURN d.name as domain, i.address as ip";
var getConnectionsCount = "MATCH (d:Domain)<-[:CONNECTED]-(i:IP) RETURN d.name, count(i) as Count ORDER by " +
        "Count DESC";
var sendPair = "MERGE $connections as c (d:Domain {name:c[0]}) MERGE (i:IP {v4:c[1]}) MERGE (i)-" +
        "[:CONNECTED]-(d)";
// let deleteIPs = `MATCH (i:IP) WITH i, rand() AS rand ORDER BY rand LIMIT 2
// DETACH DELETE i`; let deleteDomains = `MATCH (d:Domain) WITH d, rand() AS
// rand ORDER BY rand LIMIT 2 DETACH DELETE d`;
var deleteRelationships = "UNWIND $connections as c WITH c MATCH (d:Domain {name: c[0] })-[r:CONNECTED]-(i:" +
        "IP {address: c[1]}) DELETE r RETURN d.name as domain, i.address as ip";

//Swap for Cypher Stream or Neopreen? 
        var streamSession = driver.session();
// tslint:disable-next-line:no-inferrable-types

//DB, check existence (query complete), check for total Domains/IPs if less than 100K, seed with difference
var numInitialSeeds = Math.pow(10, 2);

//possibly replace with D3, but probably best is to create 1 connection per domain, then perform
//random connections based on normalization (try all three) 
//This is applicable to the next 4 methods/vars
var diceRoll = Math.floor(Math.log(numInitialSeeds) * Math.LOG10E) + 5; // total seeds
var probablilityDistribution = _.vectorMulitply(R.range(1, diceRoll), R.range(1, diceRoll)); //probability distribution based on pairwise dice roll
var weights = _.createRandomWeights(_.normal(probablilityDistribution), numInitialSeeds); // adding weights from PD 
var invertedWeights = _.createRandomWeights(_.normal(probablilityDistribution), numInitialSeeds); //inverted weights
var connectionsFromServer; //code smell, stinks unnecessary using cypherstream 
//unnecessary using cyperstream
var addRecordsStream = function (query, connections) {  
    return streamSession
        .run(query, {connections: connections})
        .subscribe({
            onNext: function (record) {
                console.log('From Record Stream', record);
                return;
            },
            // tslint:disable-next-line:object-literal-sort-keys
            onCompleted: function (results) {
                // streamSession.close();
                console.log('Adding ..............>>>.................>>......>>>>>>>>>>>>............');
                addRecordsStream(query, _.createConnectionList(domainsFactory(weights, numInitialSeeds, Math.floor(Math.random() * 3 + 1))));
                // console.log(results);
                try {
                    console.log(' Add Stream completed');
                } catch (e) {
                    console.log(e);
                }
            },
            onError: function (error) {
                console.log('THis is an error add');
                console.log(error);
            }
        });
};
//subjects probably not best practive here, switch to js-csp or generators or async waterfall or creed or  . . .  
var resume$ = new Rx.Subject();
var watcher$ = new Rx.Subject();
//unnecessary using cyperstream, or seraph, or any of the other implementations
var modifyRecordsStream = function (query, connections) {
    return streamSession
        .run(query, {connections: connections})
        .subscribe({
            onNext: function (record) {
                resume$.next(false);
                watcher$.next(R.zipObj(record['keys'], record['_fields']));
                //console.log(record);
            },
            onCompleted: function (results) {
                // streamSession.close();
                var stats = __assign({}, results.counters._stats);
               // process.send(stats);
                console.log('From Modify Stream Deleted', __assign({}, results.counters._stats));
                setTimeout(function () {
                    return resume$.next(true);
                }, 3000);
            },
            onError: function (error) {
                console.log('THis is an error modify');
                console.log(error);
            }
        });
};

// next three completely unnecessary, plus need to have checks first
// let connections = createConnectionList(domainsFactory(weights,
// numInitialSeeds, Math.floor(Math.random() * 3 + 1)));
// addRecordsStream(addNewToGraph, connections);
/**
 * 
 * @param {*} currenDomainMatches 
 */
var getRecordsStream = function (currenDomainMatches) {
    return streamSession
        .run(currentDomainMatches)
        .then(function (results) {
            return R.map(function (record) {
                return R.zipObj(record['keys'], record['_fields']);
            }, results.records);
        })
        .catch(function (error) {
            streamSession.close();
            throw error;
        })
}
// function domainsFactory(w, numInitialSeed, numEdges) {
//     if (numInitialSeed === void 0) {
//         numInitialSeed = 100;
//     }
//     if (numEdges === void 0) {
//         numEdges = 1;
//     }
//     var domainList = _.createDomains(numInitialSeeds);
//     var ipList = _.createIPs(numInitialSeeds);
//     var domains = [];
//     var pairUPDomains = R.fromPairs(R.zip(domainList, w));
//     R.forEachObjIndexed(function (a, f, o) {
//         return _.constructDomains(a, f, domains);
//     }, pairUPDomains);
//     R.forEach(function (i) {
//         return _.randomizeEdges(domains, _.normal(w), i, numEdges);
//     }, ipList);
//     return domains;
// }
// function fromExistingInvertNormal(domainsDict) {
//     var ipLens = R.lensProp('ip');
//     var ipList = R.uniq(R.flatten(R.pluck('ip', domainsDict)));
//     var domainList = [];
//     // console.log(domainsDict); console.log(R.map(R.over(ipLens, R.length),
//     // domainsDict));
//     var distribution = [].concat(R.pluck('ip', R.map(R.over(ipLens, R.length), domainsDict)));
//     R.mapObjIndexed(function (v, k, o) {
//         return _.mapConstructDomains(v['weight'], v['domain'], v['ip']);
//     }, _.prepareDomains(domainsDict));
//     R.forEach(function (i) {
//         return _.randomizeEdges(domainList, _.invertNormal(distribution), i, Math.floor(Math.random() * 3));
//     }, ipList);
//     return domainList;
// }
// // Make change IPs already included from return Also make change to include
// // running total of IP as addeded to list
// function fromExistingNormal(domainsDict) {
//     var ipLens = R.lensProp('ip');
//     var ipList = R.uniq(R.flatten(R.pluck('ip', domainsDict)));
//     var domainList = [];
//     // console.log(domainsDict); console.log(R.map(R.over(ipLens, R.length),
//     // domainsDict));
//     var distribution = [].concat(R.pluck('ip', R.map(R.over(ipLens, R.length), domainsDict)));
//     R.forEachObjIndexed(function (v, k, o) {
//         return _.constructDomains(v['ip'], v['domain'], domainList);
//     }, (R.map(R.over(ipLens, R.length), domainsDict)));
//     R.forEach(function (i) {
//         return _.randomizeEdges(domainList, _.normal(distribution), i, Math.floor(Math.random() * 2));
//     }, ipList);
//     return domainList;
// }
/**
 * 
 * @param {*} query , switch to cypher stream 
 */
function getDomains (query) {
    return streamSession
        .run(query)
        .then(function (results) {
            return R.map(function (record) {
                return R.zipObj(record['keys'], record['_fields']);
            }, results.records);
        });
};
/**
 * Background process switych to async,
 *  js-csp, generators, tasks, flutures, etc
 */
var res$ = resume$.switchMap(function (resume) {
    return resume
        ? Rx
            .Observable
            .interval(2000)
        : Rx
            .Observable
            .empty();
}).do 
    (function (x) {
        return console.log('request it! ' + x);
    }
)
    .switchMap(function (ev) {
        return Rx
            .Observable
            .defer(function () {
                return Rx
                    .Observable // def should be part of task, futures, etc
                    .fromPromise(getRecordsStream(currentDomainMatches));
            });
    })
    .map(function (domains) {
        watcher$.next(domains); //needs composed, delete, add, rich get richer, invert, neutral
        return _.mapCreateConnectionList(_.mapDeleteRandomizeExistingPair(_.prepareDomains(domains)));
    })
    .distinctUntilChanged(function (d, d1) {
        return R.equals(d, d1);
    });

//observe should be on return, from generator?    
res$.subscribe({
    complete: function () {
        return console.log('complete');
    },
    error: function (d) {
        return console.log('observerAerror: ' + d);
    },
    next: function (invert) {
        console.log('Agent Smith is deleting Relationships to the Matrix.', R.length(invert));
        resume$.next(false);
        // R.cond([ [R.gte(5)   , () => modifyRecordsStream(deleteRelationships,
        // invert)], [R.lt(5)   ,() => modifyRecordsStream(addExistingToGraph,
        // [invert])] ])(Math.floor(Math.random() * 10))
        //modifyRecordsStream(deleteRelationships, invert);
        //process.send(R.length(invert));
    }
});
resume$.next(true);
setInterval(function () {
    return resume$.next(true);
}, 5000);
/**
 * Watcher Prcocess process
 */
//const watch$ = watcher$.switchMapTo(Rx.Observable.from()
watcher$.subscribe({
    complete: function () {
        return console.log('complete');
    },
    error: function (d) {
        return console.log('observerAerror: ' + d);
    },
    next: function (record) {
        console.log('Architect has tracked deleteions to the Matrix.');
        // R.cond([ [R.gte(5)   , () => modifyRecordsStream(deleteRelationships,
        // invert)], [R.lt(5)   ,() => modifyRecordsStream(addExistingToGraph,
        // [invert])] ])(Math.floor(Math.random() * 10))
        var g = record;
        for (var key in g) {
            var value = g[key];
            process.send(value);
        }
    }
});


