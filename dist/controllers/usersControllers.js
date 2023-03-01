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
exports.createUser = exports.getUser = void 0;
const users_1 = require("../models/users");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get User");
    const type = req.query.type;
    console.log(type);
    try {
        // Retrieve user from db depending on type and send it back
        const docs = yield users_1.UserModel.find({ type: type });
        console.log('Data from Db -> ', docs);
        res.status(200).json({ results: docs });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating User");
    console.log("Request Body -> ", req.body);
    const { name, mobile, type } = req.body;
    try {
        // Save the user in the db
        const doc = new users_1.UserModel({
            name: name,
            mobile: mobile,
            type: type,
        });
        const result = yield doc.save();
        console.log('Data Store in Db -> ', result);
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        // TODO: Pass only the validation errors and not the whole error object and also handle 500 error
        res.status(400).json(error);
    }
});
exports.createUser = createUser;
