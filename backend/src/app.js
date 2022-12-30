import * as dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
dotenv.config();
import Post from "../models/Post.js";

// initialization
const port = process.env.PORT || 3000;
const app = express();
const db = "";

// middleware
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// create a post :) 😁
// TODO: implement rate limiting
app.post("/post", async (req, res) => {
	const newPost = new Post({
		title: req.body.title || "Missing Field",
		upvote: [],
		downvote: [],
		date: new Date(),
	});
	const createdPost = await newPost.save();
	res.send(createdPost);
	res.sendStatus(200); // no body needed?
});

mongoose.set("strictQuery", false); // resolving some deprecation warning
mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		// console.log(`Example app listening at > localhost:${port}/`);
	});
});
