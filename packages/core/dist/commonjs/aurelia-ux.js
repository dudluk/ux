"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var cordova_1 = require("./hosts/cordova");
var web_1 = require("./hosts/web");
var electron_1 = require("./hosts/electron");
var design_processor_1 = require("./designs/design-processor");
var AureliaUX = /** @class */ (function () {
    function AureliaUX(container, designProcessor) {
        this.designProcessor = designProcessor;
        this.availableHosts = [
            container.get(cordova_1.Cordova),
            container.get(electron_1.Electron),
            container.get(web_1.Web)
        ];
    }
    AureliaUX.prototype.start = function (config) {
        var _this = this;
        var found = this.availableHosts.find(function (x) { return x.isAvailable; });
        if (found === undefined) {
            throw new Error('Could not determine host environment');
        }
        this.host = found;
        return this.host.start(config).then(function (platform) {
            _this.platform = platform;
            _this.design = platform.design;
            _this.designProcessor.setSwatchVariables();
            _this.designProcessor.setDesignVariables(platform.design);
            _this.designProcessor.setDesignWatches(platform.design);
        });
    };
    AureliaUX = __decorate([
        aurelia_dependency_injection_1.inject(aurelia_dependency_injection_1.Container, design_processor_1.DesignProcessor)
    ], AureliaUX);
    return AureliaUX;
}());
exports.AureliaUX = AureliaUX;
