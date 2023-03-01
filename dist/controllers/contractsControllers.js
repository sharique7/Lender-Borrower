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
exports.createContracts = exports.getLenderLoanCount = exports.getLenderLoanAmount = void 0;
const contracts_1 = require("../models/contracts");
const users_1 = require("../models/users");
// import { ContractModel } from '../models/contracts';
const getLenderLoanAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get Lender Loan Amount");
    const n = req.params.n;
    // find all lenders who have given loans to at least n borrowers and the total amount of loans given by them
    try {
        const lenders = yield contracts_1.ContractModel.aggregate([
            // Group the contracts by lender
            {
                $group: {
                    _id: "$lender",
                    count: { $sum: 1 },
                    total: { $sum: "$principle" } // Sum the principle field
                }
            },
            // Only include lenders who have given loans to at least n borrowers
            {
                $match: {
                    count: { $gte: parseInt(n) },
                }
            },
            // Perform a left outer join to the User collection
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "lender"
                }
            },
            // Unwind the lender array
            {
                $unwind: "$lender"
            },
            // Project the final result fields
            {
                $project: {
                    _id: 0,
                    lenderName: "$lender.name",
                    total: 1 // Include the total field
                }
            }
        ]);
        console.log('Lenders -> ', lenders);
        res.status(200).json({ results: lenders });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.getLenderLoanAmount = getLenderLoanAmount;
const getLenderLoanCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get Lender Loan Count");
    const n = req.params.n;
    // find all lenders who have given loans in ascending order
    try {
        const lenders = yield contracts_1.ContractModel.aggregate([
            // Group the contracts by lender
            {
                $group: {
                    _id: "$lender",
                    total: { $sum: 1 }, // Count the number of contracts
                }
            },
            // Perform a left outer join to the User collection
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "lender"
                }
            },
            // Unwind the lender array
            {
                $unwind: "$lender"
            },
            // Sort the results by the total field in ascending order
            {
                $sort: {
                    total: 1
                }
            },
            // Project the final result fields
            {
                $project: {
                    _id: 0,
                    lenderName: "$lender.name",
                    total: 1 // Include the total field
                }
            }
        ]);
        console.log('Lenders -> ', lenders);
        res.status(200).json({ results: lenders });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.getLenderLoanCount = getLenderLoanCount;
const createContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating Contracts");
    console.log("Request Body -> ", req.body);
    const { lenderId, borrowerId, principle, interest } = req.body;
    try {
        // Retrieve lender and borrower from db
        const lender = yield users_1.UserModel.findById({ _id: lenderId });
        const borrower = yield users_1.UserModel.findById({ _id: borrowerId });
        console.log('Lender -> ', lender);
        console.log('Borrower -> ', borrower);
        // Save contract in the db
        const doc = new contracts_1.ContractModel({
            lender: lender,
            borrower: borrower,
            principle: principle,
            interest: interest,
            status: contracts_1.ContractStatus.Active,
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
exports.createContracts = createContracts;
