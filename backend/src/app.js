import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
// schemas
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import ReplySchema from "./models/Reply.js";
// additional packages
import cors from "cors";
import rateLimit from "express-rate-limit";

// initialization
const port = process.env.PORT || 3000;
const app = express();

const CORS_URL = process.env.CORS_ALLOW_FETCH || /https?:\/\/([a-z0-9]+[.])*hottake[.]gg/;
// middleware
app.use(express.json());
app.use(
	cors({
		origin: CORS_URL,
	})
);
const createPostLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 1000 is a second
	max: 1,
	message: "Only allowed 1 posts per 10 min.",
});

const fetchPostLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1000 is a second
	max: 100,
	message: "Only allowed to fetch up to 100 posts an hour.",
});

const voteLimiter = rateLimit({
	windowMs: 1000, // 1000 is a second
	max: 1,
	message: "Only allowed to vote on up to 1 posts every second.",
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

// fetch posts // fetchPostLimiter,
app.get("/posts", async (req, res) => {
	// sorts collection so most interacted with posts are first
	let postsLists = {};
	try {
		const limit = req.query.limit || 10; // default to 20
		const offset = req.query.offset || 0;
		const method = req.query.method;

		// catch invalid values
		if (limit < 0 || offset < 0) {
			res.status(400).send("***REMOVED***");
			return;
		}

		switch (method) {
			case "new":
				postsLists = { date: -1 };
				break;
			case "popular":
				postsLists = { interactions: -1 };
				break;
			case "old":
				postsLists = { date: 1 };
				break;
			case "random":
				const results = await Post.aggregate([{ $sample: { size: limit } }]);
				res.send(results);
				return;
			case "disagreed":
				postsLists = { votes: 1 };
				break;
			case "agreed":
				postsLists = { votes: -1 };
				break;
			default:
				// fallback to sorting by new
				postsLists = { date: -1 };
		}
		const results = await Post.find().sort(postsLists).skip(offset).limit(limit);
		res.send(results);
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
});

// agree function
app.post("/agree", voteLimiter, (req, res) => {
	// console.log(req.headers);
	try {
		const postID = req.body.postID;
		const user = req.body.userUUID;

		if (!postID) {
			res.status(400).send("Agreement failed, no post included.");
		} else if (!user) {
			res.status(400).send("Agreement failed, no user registered.");
		} else {
			Post.findById(postID, async (err, post) => {
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
					await post.save((err, result) => {
						if (err) handleError(err);
						else res.status(200).send(result);
					});
				}
			});
		}
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
});

// disagree function
app.post("/disagree", voteLimiter, (req, res) => {
	// console.log(req.headers);
	try {
		const postID = req.body.postID;
		const user = req.body.userUUID;

		if (!postID) {
			res.status(400).send("Disagreement failed, no post included.");
		} else if (!user) {
			res.status(400).send("Disagreement failed, no user registered.");
		} else {
			Post.findById(postID, async (err, post) => {
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
					await post.save((err, result) => {
						if (err) handleError(err);
						else res.status(200).send(result);
					});
				}
			});
		}
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
});

// app.post("/reply", async (req, res) => {
// 	//we need content
// 	//we need commentID

// 	try {
// 		if (req.body.content.length == 0) {
// 			res.status(400).send("Missing reply content");
// 		} else if (req.body.commentID.length == 0) {
// 			res.status(400).send("Missing parent comment ID");
// 		} else {
// 			// const reply = new Reply({
// 			// 	content:req.body.content,
// 			// 	commentID:req.body.commentID
// 			// })
// 			//const createdReply = await reply.save();
// 			//creating the reply and saving it to the reply collection in the database

// 			//createdReply = JSON.stringify(createdReply)
// 			const parentComment = await Comment.findOne({ _id: req.body.commentID });
// 			//finding the parentComment in the database using provided parent comment ID

// 			parentComment.replies.push({ date: Date(), content: req.body.content });
// 			const savedComment = await parentComment.save();
// 			res.status(200).send(savedComment);
// 		}
// 	} catch (error) {
// 		res.status(400).send(error);
// 	}
// });

app.get("/comment", async (req, res) => {
	try {
		if (req.query.postID.length == 0) {
			res.status(400).send("Please provide an id");
		} else {

			const comments = await Comment.find({ postID: req.query.postID });
			res.status(200).send(comments);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

app.post("/comment", async (req, res) => {
	try {
		if (req.body.content.length == 0) {
			res.status(400).send("comment content is missing");
		} else if(req.body.content.length > 140){
			res.status(400).send("Post is above 140 characters")
			//we need to send the actual errors 
		}
		else if (req.body.postID.length == 0) {
			res.status(400).send("parent post id is missing");
		}
		// } else if (req.body.children.length == 0){
		// 	res.status(400).send("children reply array is missing")
		// }
		else {
			const newComment = new Comment({
				content: req.body.content,
				postID: req.body.postID,
				date: Date(),
			});
			const createdComment = await newComment.save();

			res.status(200).send(createdComment);
		}
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
});

// create a post :) 😁
// TODO: check if post exists already? (May be unnecessary...)
app.post("/post", createPostLimiter, async (req, res) => {
	// console.log(req.headers);
	try {
		if (req.body.title.length == 0) {
			res.status(400).send("Post content is missing");
		} else if (req.body.title.length <= 5) {
			res.status(400).send("Post must be longer than 5 characters");
		} else if (req.body.title.length > 140) {
			res.status(400).send("Post must be less than 140 characters");
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
	} catch (error) {
		console.error(error);
		res.status(400).send(error);
	}
});

mongoose.set("strictQuery", false); // resolving some deprecation warning
mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		// console.log(`Example app listening at > localhost:${port}/`);
	});
});
