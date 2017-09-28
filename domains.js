"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var R = require("ramda");
var DomainSpec = (function () {
    function DomainSpec(name, weight, _ips) {
        if (_ips === void 0) {
            _ips = [];
        }
        this.name = name;
        this.weight = weight;
        this._ips = _ips;
        this._size = this._ips.length;
    }
    Object.defineProperty(DomainSpec.prototype, "ips", {
        get: function () {
            return this._ips;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomainSpec.prototype, "size", {
        get: function () {
            return this._ips.length;
        },
        enumerable: true,
        configurable: true
    });
    DomainSpec.prototype.addIPList = function (ipList) {
        R.concat(this._ips, ipList);
    };
    DomainSpec.prototype.addIP = function (ip) {
        var _this = this;
        R.cond([
            [
                R
                    .any(function (x) {
                        return x === ip;
                    }),
                function () {
                    return R.__;
                }
            ],
            [
                R.T,
                function () {
                    return _this
                        ._ips
                        .push(ip);
                }
            ]
        ])(this._ips);
        this._size = this._ips.length;
    };
    return DomainSpec;
}());
exports.DomainSpec = DomainSpec;
