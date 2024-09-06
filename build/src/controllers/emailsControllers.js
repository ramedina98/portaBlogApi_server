"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllEmailsResponse = void 0;
const emailsServices_1 = require("../services/emailsServices");
// All emails controller...
const AllEmailsResponse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emails = yield (0, emailsServices_1.AllEmails)();
        res.status(200).json({ message: 'Successfully obtained', emails });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.AllEmailsResponse = AllEmailsResponse;
