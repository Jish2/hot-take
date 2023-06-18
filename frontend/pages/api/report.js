import Post from "../../db/models/Post";
import remove from "../../db/helpers";

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "POST":
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
								else res.status(200).json(result);
							});
						}
					});
				}
			} catch (error) {
				console.error(error);
				res.status(400).send(error);
			}
			break;
		default:
			res.status(400).send(error);
			break;
	}
}
