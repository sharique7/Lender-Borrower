"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const web_1 = __importDefault(require("./routes/web"));
const connectdb_1 = require("./db/connectdb");
// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_AUTH_SOURCE = process.env.DATABASE_AUTH_SOURCE;
// Create a new express application instance
const app = (0, express_1.default)();
// JSON middleware
app.use(express_1.default.json());
// Connect to database
mongoose_1.default.set('strictQuery', true); // https://mongoosejs.com/docs/guide.html#strictQuery
const DB_OPTIONS = {
    user: DATABASE_USER,
    pass: DATABASE_PASSWORD,
    dbName: DATABASE_NAME,
    authSource: DATABASE_AUTH_SOURCE,
};
(0, connectdb_1.connectDB)(DATABASE_URL, DB_OPTIONS);
// Routes
app.use("/api", web_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
