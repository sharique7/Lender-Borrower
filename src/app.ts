import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import mongoose from 'mongoose';
import web from './routes/web';
import { connectDB } from './db/connectdb';

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT!;
const DATABASE_URL = process.env.DATABASE_URL!;
const DATABASE_NAME = process.env.DATABASE_NAME!;
const DATABASE_USER = process.env.DATABASE_USER!;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD!;
const DATABASE_AUTH_SOURCE = process.env.DATABASE_AUTH_SOURCE!;


// Create a new express application instance
const app = express();

// JSON middleware
app.use(express.json());

// Connect to database
mongoose.set('strictQuery', true); // https://mongoosejs.com/docs/guide.html#strictQuery
const DB_OPTIONS: mongoose.ConnectOptions = {
    user: DATABASE_USER,
    pass: DATABASE_PASSWORD,
    dbName: DATABASE_NAME,
    authSource: DATABASE_AUTH_SOURCE,
}
connectDB(DATABASE_URL, DB_OPTIONS);

// Routes
app.use("/api", web);


// Start the server
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
