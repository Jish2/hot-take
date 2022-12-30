import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import Post from "./models/Post";

// initialization
const port = process.env.PORT || 3000;
const app = express();
const db = "";

// middleware
app.use(express.json());

// REAL SHIT DOWN HERE
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// create a post :) 😁
app.post("/post", async (req, res) => {
	const newPost = new Post({
		title: "First post",
		upvoteUsers: ["1", "2"],
	});
});

mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		// console.log(`Example app listening at > localhost:${port}/`);
	});
});
