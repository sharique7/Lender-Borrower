import { model, Schema } from "mongoose";

export enum UserType {
    Lender = "lender",
    Borrower = "borrower",
}

// Define the User schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    mobile: {
        type: String,
        required: true,
        //  validate number is 10 digits
        validator: {
            validator: (v: string) => {
                return /\d{10}/.test(v);
            },
            message: (props: any) => `${props.value} is not a valid mobile number!`
        }
    },
    type: {
        type: String,
        required: true,
        enum: UserType,
    },
});


// Export the User model
export const UserModel = model("user", UserSchema);