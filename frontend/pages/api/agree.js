import Post from "../../db/models/Post";
import remove from "../../db/helpers";
import connect from "../../db/connect";

export default async function handler(req, res) {
	const { method } = req;

	await connect();

	switch (method) {
		case "POST":
			try {
				const postID = req.body.postID;
				const user = req.body.userUUID;

				if (!postID) {
					res.status(400).json({ message: "Agreement failed, no post included." });
				} else if (!user) {
					res.status(400).json({ message: "Agreement failed, no user registered." });
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
								if (err) {
									handleError(err);
								} else {
									res.status(200).json(result);
								}
							});
						}
					});
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
