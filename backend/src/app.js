import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
// schemas
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import ReplySchema from "./models/Reply.js";
import Moderator from "./models/Moderator.js";
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
	windowMs: 1 * 60 * 1000, // 1000 is a second
	max: 1,
	message: "Only allowed 1 posts per minute.",
});

const fetchPostLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 1000 is a second
	max: 150,
	message: "Only allowed to fetch up to 150 posts every 10 minutes.",
});

const voteLimiter = rateLimit({
	windowMs: 500, // 1000 is a second
	max: 2,
	message: "You are voting too fast!.",
});

const adminLimiter = rateLimit({
	skip: async (request, response) => {
		try {
			return await checkUser(request.body.username, request.body.password); //request.body.username
		} catch (error) {
			console.error(error);
			return false;
		}
	},
	windowMs: 60 * 60 * 1000, // 1000 is a second
	max: 3,
	message: "You are blocked",
});

// HELPER FUNCTIONS
// error handling
const handleError = (err) => {
	console.error(err);
	return;
};

// remove element from array
function remove(value, array) {
	return array.filter((item) => {
		return item !== value;
	});
}

async function checkUser(username, password) {
	try {
		const user = await Moderator.findOne({ username });
		if (!user) {
			return false;
		}
		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			return false;
		}

		return true;
	} catch (e) {
		console.error(error);
		return false;
	}
}

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
			case "reported":
				postsLists = { reports: -1 };
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

app.get("/post", async (req, res) => {
	try {
		const postID = req.query.postID;

		// catch invalid postID
		if (mongoose.Types.ObjectId.isValid(postID) === false) {
			res.status(400).send("***REMOVED***");
			return;
		}

		// // catch invalid uuid
		// const validUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
		// if (!validUUID.test(postID)) {
		// 	res.status(400).send("***REMOVED***");
		// 	return;
		// }

		const results = await Post.findById(postID).limit(1);
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
		} else if (req.body.content.length > 140) {
			res.status(400).send("Post is above 140 characters");
			//we need to send the actual errors
		} else if (req.body.postID.length == 0) {
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
				reports: [],
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

app.post("/admin", adminLimiter, async (req, res) => {
	const { username, password } = req.body;
	const user = await Moderator.findOne({ username });

	if (!user) {
		res.status(400).send({ message: "Invalid username." });
		return;
	}

	const isMatch = await user.comparePassword(password);

	if (!isMatch) {
		res.status(400).send({ message: "Invalid password." });
		return;
	}

	res.status(200).send({ success: true });
});

app.post("/delete", adminLimiter, async (req, res) => {
	try {
		const { username, password, postID } = req.body;
		const user = await Moderator.findOne({ username });

		if (!user) {
			res.status(400).send({ message: "Invalid username." });
			return;
		}

		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			res.status(400).send({ message: "Invalid password." });
			return;
		}
		await Post.deleteOne({ _id: postID });
		res.status(200).send({ message: "Post deleted" });
	} catch (error) {
		console.error(error);
		res.status(400).send({ message: `Failed to delete: ${error}` });
	}
});

app.post("/report", voteLimiter, (req, res) => {
	// console.log(req.headers);
	try {
		const postID = req.body.postID;
		const user = req.body.userUUID;

		if (!postID) {
			res.status(400).send("Report failed, no post included.");
		} else if (!user) {
			res.status(400).send("Report failed, no user registered.");
		} else {
			Post.findById(postID, async (err, post) => {
				if (err) handleError(err); // error handle
				else {
					// check if includes....
					if (post.reports.includes(user)) {
						post.reports = remove(user, post.agree);
					} else {
						post.reports.push(user);
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

app.post("/search", async (req, res) => {
	try {
		const { username, password, query, sort, skip, limit } = req.body;

		const user = await Moderator.findOne({ username });
		if (!user) {
			res.status(400).send({ message: "Invalid username." });
			return;
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			res.status(400).send({ message: "Invalid password." });
			return;
		}

		let postsLists = { reports: -1 };
		switch (sort) {
			case "new":
				postsLists = { date: -1 };
				break;
			case "popular":
				postsLists = { interactions: -1 };
				break;
			case "old":
				postsLists = { date: 1 };
				break;
			case "disagreed":
				postsLists = { votes: 1 };
				break;
			case "agreed":
				postsLists = { votes: -1 };
				break;
			case "reported":
				postsLists = { reports: -1 };
				break;
			default:
				// fallback to sorting by reports
				postsLists = { reports: -1 };
		}

		const results = await Post.find({ $text: { $search: query } })
			.sort(postsLists)
			.skip(skip ?? 0)
			.limit(limit ?? 10);
		res.status(200).send(results);
	} catch (error) {
		console.error(error);
	}
});

app.get("/updateAll", async (req, res) => {
	// use this to purge DB
	// await Post.updateMany({}, { $set: { reports: [] } });
	res.status(200).send({ message: "all good" });
});

mongoose.set("strictQuery", false); // resolving some deprecation warning
mongoose.connect(process.env.MONGO_URL).then(() => {
	app.listen(port, () => {
		// console.log(`Example app listening at > localhost:${port}/`);
	});
});
