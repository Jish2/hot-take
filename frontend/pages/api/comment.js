import Comment from "../../db/models/Comment";
import connect from "../../db/connect";

export default async function handler(req, res) {
	const { method } = req;

	await connect();

	switch (method) {
		case "GET":
			try {
				if (req.query.postID.length == 0) {
					res.status(400).json({ message: "Please provide an id" });
				} else {
					const comments = await Comment.find({ postID: req.query.postID });
					res.status(200).json(comments);
				}
			} catch (error) {
				res.status(400).json({ message: error });
			}
			break;
		case "POST":
			try {
				if (req.body.content.length == 0) {
					res.status(400).json({ message: "comment content is missing" });
				} else if (req.body.content.length > 140) {
					res.status(400).json({ message: "Post is above 140 characters" });
					//we need to send the actual errors
				} else if (req.body.postID.length == 0) {
					res.status(400).json({ message: "parent post id is missing" });
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

					res.status(200).json(createdComment);
				}
			} catch (error) {
				console.error(error);
				res.status(400).json({ message: error });
			}
			break;
		default:
			res.status(400).json({ message: error });
			break;
	}
}
