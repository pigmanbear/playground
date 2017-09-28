"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
// tslint:disable
var neo4j_driver_1 = require("neo4j-driver");
var ramda_1 = require("ramda");
var R = require("ramda");
var chance_1 = require("chance");
var domains_1 = require("./domains");
var ip_1 = require("./ip");
exports.chance = new chance_1.Chance(Math.random() * 100);
exports.driver = neo4j_driver_1
    .v1
    .driver('bolt://localhost', neo4j_driver_1.v1.auth.basic('neo4j', 'password1'));
/**
 *
 * Helper Functions
 *
 */
exports.log = function (o, notes) {
    if (notes === void 0) {
        notes = '';
    }
    return console.log(notes, o);
};
exports.logValue = function (v, k, o) {
    return console.info(o);
};

//Unnecessary Ramda Adjunct? Compose, Monads (Maybe, Just, Either etc Better)
exports.isEmptyOrUndefined = function (x) {
    return R.or(R.isNil(x), R.isEmpty(x));
};
exports.notEmptyOrUndefined = function (x) {
    return R.not(exports.isEmptyOrUndefined(x));
};

////////////////////////////////////////////////////////////////////////
//chance = new c.Chance(Math.random() * 100);
//const unique = number => func => chance.unique(func, number);
//unique(10)(chance.domain) ... 
exports.createDomains = function (num) {
    return exports
        .chance
        .unique(exports.chance.domain, num);
};
exports.createIPs = function (num) {
    return exports
        .chance
        .unique(exports.chance.ip, num);
};
////////////////////////////////////////////////////////////////////////

//product for 'dice-roll' better zip(x,x), mapObjIndexed
exports.vectorMulitply = function (a, b) {
    return R.map(R.product, R.xprod(a, b));
};

//Conert Monoids 
exports.sumValues = function (dict) {
    return R.sum(R.values(dict));
};

//compose
exports.keysToInt = function (keys) {
    return R.map(function (k) {
        return parseInt(k, 10);
    }, keys);
};

//Next 3 Completely Unneccessary
exports.ltge = function (x) {
    return R.gte(x);
};
exports.llistKeys = function (k) {
    return R.keys(k);
};
exports.llstValues = function (l) {
    return R.values(l);
};
/////////////////

////adjusted in testy
exports.listScan = function (list) {
    return R.filter(function (x) {
        return x > 0;
    }, R.scan(R.add, 0, list));
};


//Unecessary
exports.freq = function (list) {
    return R.countBy(Math.floor, list);
};

//zipObj unnecessary with freq  . . . list [g] -> zipObj([g],[g]) need uniq
exports.degreeDist = function (list) {
    return R.zipObj(R.keys(exports.freq(list)), exports.keysToInt(R.keys(exports.freq(list))));
    // degreeDist = list =>           countBy(Math.floor))
};
exports.normalize = function (dict) {
    //using mapObjIndexed
    return R.map(R.flip(R.divide)(exports.sumValues(dict)), (dict));
    //const selfZip = x => zipObj(x,x)
    //const addUp = compose(sum, values)
    //const degreeDistDivisor = x =>  map(divideLeft(addUp(x)),x)
    //compose(degreeDistDivisor,converge(zipObj, [values, values]))
};
exports.normal = function (list) {
    return exports.normalize(exports.freq(list));
};
exports.invertNormal = function (list) {
    return exports.normalize(R.map(R.divide(1), exports.freq(list)));
};

//compose(degreeDistDivisor,map(divide(1)),converge(zipObj, [values, values]))

exports.randomValue = function (weights) {
    return exports.chooseRandomValue(weights);
};
exports.chooseRandomIndex = function (list) {
    return R.length(R.filter(function (x) {
        return x === true;
    }, R.map(exports.ltge(Math.random()), exports.listScan(exports.llstValues(list)))));
};
exports.chooseRandomValue = function (list) {
    return exports.llistKeys(list)[exports.chooseRandomIndex(list)];
};

//For Initial Creation - unnecessary if zip upping 1-1
exports.createRandomWeights = function (list, size) {
    return R.times(function () {
        return parseInt(exports.chooseRandomValue(list), 10);
    }, size);
};

///can use equals
exports.compare = function (w, value) {
    return w === parseInt(value, 10)
        ? true
        : false;
};

/// compare = w => value => w === parseInt(value, 10) ? true : false;

// check with point-free
exports.ipExists = R.curry(function (domainIPList, ip) {
    return R.tap(exports.log, R.any(function (x) {
        return x === ip;
    }, domainIPList));
});

//choice unnecessary, just matching with equals
exports.choice = function (domains, value) {
    return R.filter(function (d) {
        return exports.compare(d.weight, value);
    }, domains);
};

// const choice  = domains => value => filter()
exports.pickDomain = function (domains) {
    return exports
        .chance
        .pickone(domains);
};
// const randomIndex = compose(Math.floor, multiply(Math.random()) , length) *
// const pickRandom = list => chance.pickone(list)
exports.randomizeEdges = function (domains, weights, ipc, edges) {
    return R.times(function () {
        return exports.addIP(exports.pickDomain(exports.choice(domains, exports.randomValue(weights))), ipc);
    }, edges);
};

///unnecesssary if mapping, folding, composing properly
exports.createConnectionList = function (domains) {
    return R.unnest(R.filter(function (a) {
        return R.not(R.isEmpty(a));
    }, (R.map(function (d) {
        return exports.createPairsNeo(d.name, d.ips);
    }, domains))));
};

//unnecessary, convert to type or Immutable?
exports.addIP = function (d, i) {
    return d.addIP(i);
};

//unused without classes/unneecessary
exports.constructIPs = function (a, ips) {
    return ips.push(new ip_1.IP(a));
};

//change in daggy, tcomb, etc. do all?, immutable-ext?
exports.prepareDomains = function (list) {
    return R.map(function (l) {
        return R.set(R.lensProp('staged'), [], R.assoc('weight', R.length(l['ip']), l));
    }, list);
};

//change to daggy, typescript, stop with the dependencies 
exports.constructDomains = function (a, f, domains) {
    return domains.push(new domains_1.DomainSpec(f, a));
};

//probably unnecessary? 
exports.getIPList = function (domains) {
    return R.uniq(R.flatten(R.pluck('_ips', domains)));
};
//______________________________________________________________________________
//______________________________________________________________________________
//__

//possibly unnecessary, could send entire lists to Neo, seems there is an  easier way
exports.createPairsNeo = function (a, b) {
    return R.map(function (i) {
        return R.pair(a, i);
    }, b);
};
//______________________________________________________________________________
//______________________________________________________________________________
//__

//starting with preparing without classes, makes more sense
exports.mapConstructDomains = function (a, f, c) {
    return new domains_1.DomainSpec(f, a, c);
};

//should consolidate
exports.mapCreateConnectionList = function (domains) {
    return R.unnest(R.filter(function (a) {
        return R.not(R.isEmpty(a));
    }, (R.map(function (d) {
        return exports.createPairsNeo(d['domain'], d['staged']);
    }, R.unnest(domains)))));
};

// unnecessary - compose
exports.mapWeight = function (domains) {
    return (R.pluck('weight', domains));
};

//unnecessary compose
exports.mapCompare = function (w, value) {
    return w === parseInt(value, 10)
        ? true
        : false;
};

// compose
exports.mapGetIPList = function (domains) {
    return R.uniq(R.flatten(R.pluck('ip', domains)));
};

// compose 
exports.mapChoice = function (domains, value) {
    return R.filter(function (w) {
        return exports.mapCompare(w['weight'], value);
    }, domains);
};

//Pick Domain use compose
exports.mapPickDomain = function (domains) {
    return exports
        .chance
        .pickone(domains);
};

//Maybe Type
exports.mapDeleteIP = function (domain) {
    return R.either(exports.isEmptyOrUndefined, R.gt(1))(R.length(domain.ip))
        ? domain
        : R.over(R.lensProp('staged'), R.append(domain.ip[Math.floor(Math.random() * domain.ip.length)]), domain);
};

//Maybe Type
exports.mapAddIP = function (domain, ip) {
    return R.either(exports.isEmptyOrUndefined, exports.ipExists(ip))(domain.ip)
        ? domain
        : R.tap(exports.log, R.over(R.lensProp('staged'), R.append(ip), domain));
};
// export const mapRandomizeEdges = (domains, edge) => R.map(o =>
// mapAddIP(mapPickDomain(mapChoice(domains,
// randomValue(normal(mapWeight(domains))))), o), mapGetIPList(domains)); export
// const mapRandomizeDeleteExistingPair = (domains) =>  R.map(o =>
// mapDeleteIP(mapPickDomain(mapChoice(domains,
// randomValue(degreeDist(mapWeight(domains)))))), domains);
exports.mapRandomizeAddExistingPair = function (domains) {
    return R.map(function (o) {
        return exports.mapAddIP(exports.mapPickDomain(exports.mapChoice(domains, exports.randomValue(exports.normalize(exports.degreeDist(exports.mapWeight(domains)))))), o);
    }, exports.mapGetIPList(domains));
};
exports.mapDeleteRandomizeExistingPair = function (domains) {
    return R.map(function () {
        return exports.mapDeleteIP(exports.mapPickDomain(exports.mapChoice(domains, exports.randomValue(exports.normalize(exports.degreeDist(exports.mapWeight(domains)))))));
    }, domains);
};
