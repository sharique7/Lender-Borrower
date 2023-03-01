"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserType = void 0;
const mongoose_1 = require("mongoose");
var UserType;
(function (UserType) {
    UserType["Lender"] = "lender";
    UserType["Borrower"] = "borrower";
})(UserType = exports.UserType || (exports.UserType = {}));
// Define the User schema
const UserSchema = new mongoose_1.Schema({
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
            validator: (v) => {
                return /\d{10}/.test(v);
            },
            message: (props) => `${props.value} is not a valid mobile number!`
        }
    },
    type: {
        type: String,
        required: true,
        enum: UserType,
    },
});
// Export the User model
exports.UserModel = (0, mongoose_1.model)("user", UserSchema);
