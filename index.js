import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import ConnectingToDB from "./src/Config/DB-Config.js";
import TaskRouter from "./src/Route/TaskRoute.js";
import ErrorHandler from "./src/Middleware/ErrorHandling.js";

dotenv.config();

const port=process.env.PORT;

const app=express();

//  middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/tasks",TaskRouter);

// Error Handling middleware
app.use(ErrorHandler);

app.listen(port,async()=>{
    try {
        console.log(`server is listening on port ${port}`);
        await ConnectingToDB();
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
})
