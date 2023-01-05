import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import Post from "./models/Post.js";
import cors from "cors";
import rateLimit from "express-rate-limit";

// initialization
const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(
	cors({
		// origin: process.env.CORS_ALLOW_FETCH || "https://*.hottake.gg",
		origin: /https?:\/\/([a-z0-9]+[.])*hottake[.]gg/,
	})
);
const createPostLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1000 is a second
	max: 20,
	message: "Only allowed 20 posts per hour.",
});

const fetchPostLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1000 is a second
	max: 100,
	message: "Only allowed to fetch up to 100 posts an hour.",
});

const voteLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 1000 is a second
	max: 200,
	message: "Only allowed to vote on up to 200 posts every 10 minutes.",
});

// HELPER FUNCTIONS
// error handling
const handleError = (err) => {
	console.error(err);
	return;
};

// remove element from array
const remove = (value, array) => {
	return array.filter((item) => {
		return item !== value;
	});
};

// fetch posts
app.get("/posts", fetchPostLimiter, async (req, res) => {
	// sorts collection so most interacted with posts are first
	const postsLists = await Post.find().sort({ date: -1 });
	res.send(postsLists);
});

// agree function
app.post("/agree", voteLimiter, async (req, res) => {
	// console.log(req.headers);

	const postID = req.body.postID;
	const user = req.body.userUUID;

	if (!postID) {
		res.status(400).send("Agreement failed, no post included.");
	} else if (!user) {
		res.status(400).send("Agreement failed, no user registered.");
	} else {
		Post.findById(postID, (err, post) => {
			if (err) handleError(err); // error handle
			else {
				// check if includes....
				if (post.agree.includes(user)) {
					post.agree = remove(user, post.agree);
				} else if (post.disagree.includes(user)) {
					post.disagree = remove(user, post.disagree);
					post.agree.push(user);
				} else {
					post.agree.push(user);
				}
				post.save((err, result) => {
					if (err) handleError(err);
					else res.status(200).send(result);
				});
			}
		});
	}
});

// disagree function
app.post("/disagree", voteLimiter, async (req, res) => {
	// console.log(req.headers);

	const postID = req.body.postID;
	const user = req.body.userUUID;

	if (!postID) {
		res.status(400).send("Disagreement failed, no post included.");
	} else if (!user) {
		res.status(400).send("Disagreement failed, no user registered.");
	} else {
		Post.findById(postID, (err, post) => {
			if (err) handleError(err); // error handle
			else {
				// check if includes....
				if (post.agree.includes(user)) {
					post.agree = remove(user, post.agree);
					post.disagree.push(user);
				} else if (post.disagree.includes(user)) {
					post.disagree = remove(user, post.disagree);
				} else {
					post.disagree.push(user);
				}
				post.save((err, result) => {
					if (err) handleError(err);
					else res.status(200).send(result);
				});
			}
		});
	}
});

// create a post :) 😁
// TODO: implement rate limiting
// TODO: check if post exists already? (May be unnecessary...)
app.post("/post", createPostLimiter, async (req, res) => {
	// console.log(req.headers);
	if (req.body.title.length == 0) {
		res.status(400).send("Post content is missing");
	} else if (req.body.title.length <= 5) {
		res.status(400).send("Post must be longer than 5 characters");
	} else {
		const newPost = new Post({
			title: req.body.title,
			agree: [],
			disagree: [],
			votes: 0,
			interactions: 0,
			date: new Date(),
		});
		const createdPost = await newPost.save();
		res.status(200).send(createdPost);
	}
});

mongoose.set("strictQuery", false); // resolving some deprecation warning
mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		// console.log(`Example app listening at > localhost:${port}/`);
	});
});
