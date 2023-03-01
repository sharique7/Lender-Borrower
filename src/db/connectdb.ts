import { connect, ConnectOptions } from "mongoose";

export const connectDB = async (DATABASE_URL: string, DB_OPTIONS: ConnectOptions) => {
    try {
        await connect(DATABASE_URL, DB_OPTIONS);
        console.log("Connected Successfully..");
    }
    catch (err) {
        console.log(err);
    }
}
