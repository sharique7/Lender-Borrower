import { model, Schema } from "mongoose";

export enum ContractStatus {
    Active = "active",
    Completed = "completed",
}

// Define the Contract schema
const ContractSchema = new Schema({
    lender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    borrower: {
        type: Schema.Types.ObjectId,
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
export const ContractModel = model('contract', ContractSchema);