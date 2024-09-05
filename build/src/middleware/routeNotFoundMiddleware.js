"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
const routeNotFound = (_req, res, _next) => {
    const error = new Error('Route not found');
    logging.error(error);
    return res.status(404).json({ error });
};
exports.routeNotFound = routeNotFound;
