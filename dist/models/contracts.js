"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractModel = exports.ContractStatus = void 0;
const mongoose_1 = require("mongoose");
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["Active"] = "active";
    ContractStatus["Completed"] = "completed";
})(ContractStatus = exports.ContractStatus || (exports.ContractStatus = {}));
// Define the Contract schema
const ContractSchema = new mongoose_1.Schema({
    lender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    borrower: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    principle: {
        type: Number,
        required: true,
        min: 1,
        max: 1000000,
    },
    interest: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    status: {
        type: String,
        required: true,
        enum: ContractStatus
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Export the Contract model
exports.ContractModel = (0, mongoose_1.model)('contract', ContractSchema);
