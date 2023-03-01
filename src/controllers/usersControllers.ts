import { Request, Response } from 'express';
import { UserModel } from '../models/users';

export const getUser = async (req: Request, res: Response) => {
    console.log("Get User");

    const type = req.query.type;
    console.log(type);

    try {
        // Retrieve user from db depending on type and send it back
        const docs = await UserModel.find({ type: type });

        console.log('Data from Db -> ', docs);

        res.status(200).json({ results: docs });
    } catch (error) {
        console.log(error);

        res.status(500).json(error);
    }
}

export const createUser = async (req: Request, res: Response) => {
    console.log("Creating User");

    console.log("Request Body -> ", req.body);
    const { name, mobile, type } = req.body;

    try {
        // Save the user in the db
        const doc = new UserModel({
            name: name,
            mobile: mobile,
            type: type,
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
