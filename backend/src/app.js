import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import Post from "./models/Post.js";
import cors from "cors";
// initialization
const port = process.env.PORT || 3000;
const app = express();

// restrict hostname requests through CORS?
const db = "";

// middleware
app.use(express.json());
app.use(
	cors({
		origin: process.env.CORS_ALLOW_FETCH || "https://*.hottake.gg/",
	})
);

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
app.get("/posts", async (req, res) => {
	// sorts collection so newest posts are first
	const postsLists = await Post.find().sort({ date: -1 });
	res.send(postsLists);
});

// agree function
app.post("/agree", async (req, res) => {
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
app.post("/disagree", async (req, res) => {
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
app.post("/post", async (req, res) => {
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
