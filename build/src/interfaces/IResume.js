"use strict";
/**
 * In this file we have all the necessary interfaces to work with the models, controllers and
 * services of the endpoint related to the resume...
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeExpe = exports.Position = void 0;
// experience interface...
// elemtns of this iinterface...
var Position;
(function (Position) {
    Position["Front"] = "front";
    Position["Back"] = "back";
    Position["Full"] = "full";
})(Position || (exports.Position = Position = {}));
var TypeExpe;
(function (TypeExpe) {
    TypeExpe["Work"] = "work";
    TypeExpe["Project"] = "project";
})(TypeExpe || (exports.TypeExpe = TypeExpe = {}));
