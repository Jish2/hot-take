import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import Post from "./models/Post.js";

// initialization
const port = process.env.PORT || 3000;
const app = express();

// restrict hostname requests through CORS?
const db = "";

// middleware
app.use(express.json());

// fetch posts
app.get("/posts", async (req, res) => {
	// sorts collection so newest posts are first
	const postsLists = await Post.find().sort({ date: -1 });
	res.send(postsLists);
});

// upvote function

// create a post :) 😁
// TODO: implement rate limiting
app.post("/post", async (req, res) => {
	// console.log(req.headers);
	if (req.body.title.length == 0) {
		res.status(400).send("Post content is missing");
	} else if (req.body.title.length <= 5) {
		res.status(400).send("Post must be longer than 5 characters");
	} else {
		const newPost = new Post({
			title: req.body.title,
			upvote: [],
			downvote: [],
			date: new Date(),
		});
		const createdPost = await newPost.save();
		// res.send(created);
		res.sendStatus(200); // no body needed?
	}
});

mongoose.set("strictQuery", false); // resolving some deprecation warning
mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		// console.log(`Example app listening at > localhost:${port}/`);
	});
});
