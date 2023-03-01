import { Request, Response } from 'express';
import { ContractModel, ContractStatus } from '../models/contracts';
import { UserModel } from '../models/users';
// import { ContractModel } from '../models/contracts';

export const getLenderLoanAmount = async (req: Request, res: Response) => {
    console.log("Get Lender Loan Amount");

    const n = req.params.n;

    // find all lenders who have given loans to at least n borrowers and the total amount of loans given by them
    try {
        const lenders = await ContractModel.aggregate([
            // Group the contracts by lender
            {
                $group: {
                    _id: "$lender",
                    count: { $sum: 1 }, // Count the number of contracts
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
                    _id: 0, // Exclude the _id field
                    lenderName: "$lender.name", // Include the lender's name
                    total: 1 // Include the total field
                }
            }
        ]);

        console.log('Lenders -> ', lenders);

        res.status(200).json({ results: lenders });
    } catch (error) {
        console.log(error);

        res.status(500).json(error);
    }
}

export const getLenderLoanCount = async (req: Request, res: Response) => {
    console.log("Get Lender Loan Count");

    const n = req.params.n;

    // find all lenders who have given loans in ascending order
    try {
        const lenders = await ContractModel.aggregate([
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
                    _id: 0, // Exclude the _id field
                    lenderName: "$lender.name", // Include the lender's name
                    total: 1 // Include the total field
                }
            }
        ]);

        console.log('Lenders -> ', lenders);

        res.status(200).json({ results: lenders });
    } catch (error) {
        console.log(error);

        res.status(500).json(error);
    }
}

export const createContracts = async (req: Request, res: Response) => {
    console.log("Creating Contracts");

    console.log("Request Body -> ", req.body);
    const { lenderId, borrowerId, principle, interest } = req.body;

    try {
        // Retrieve lender and borrower from db
        const lender = await UserModel.findById({ _id: lenderId });
        const borrower = await UserModel.findById({ _id: borrowerId });

        console.log('Lender -> ', lender);
        console.log('Borrower -> ', borrower);

        // Save contract in the db
        const doc = new ContractModel({
            lender: lender,
            borrower: borrower,
            principle: principle,
            interest: interest,
            status: ContractStatus.Active,
        });


        const result = await doc.save();
        console.log('Data Store in Db -> ', result);

        res.status(201).json(result);
    } catch (error) {
        console.log(error);

        // TODO: Pass only the validation errors and not the whole error object and also handle 500 error
        res.status(400).json(error);
    }
}
