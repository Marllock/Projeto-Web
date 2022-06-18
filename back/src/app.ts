import mongoose from "mongoose";
import express from "express";
import {Request, Response, NextFunction} from 'express'
import userRouter from "./routes/userRouter";

async function main() {
  mongoose.connect(
    "mongodb+srv:<marllock>:<w6SZr2PDKpOSsBz4>@monster-hunter-api.dcpbt.mongodb.net/?retryWrites=true&w=majority"
  );
}

const app = express();

app.use(express.json());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: "Error",
      message: error.message,
    });
  }
);

app.use('/users', userRouter)

app.listen("8080", () => {
  console.log("http://localhost:8080");
});
