import connect from "../../db/connect";
import Post from "../../db/models/Post";
import mongoose from "mongoose";

export const config = {
	api: {
		externalResolver: true,
	},
};

export default async function handler(req, res) {
	const { method, query } = req;

	const limit = query.limit || 10; // default to 20
	const offset = query.offset || 0;
	const sort = req.query.sort;

	// await connect();
	mongoose.set("strictQuery", true);
	mongoose.connect(process.env.MONGO_URL, () => {
		console.log("...ok");
	});

	let postsLists = {};

	switch (method) {
		case "GET":
			try {
				// const pets = await Pet.find({}); /* find all the data in our database */
				// res.status(200).json({ success: true, data: pets });

				if (limit < 0 || offset < 0) {
					res.status(400).json({ message: "***REMOVED***" });
					return;
				}

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
					case "random":
						const results = await Post.aggregate([{ $sample: { size: limit } }]);
						res.status(200).json(results);
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
				res.status(200).json(results);
			} catch (error) {
				console.error("error", error);
				res.status(400).json({ message: error, case: "hm" });
				// res.status(400).json({ success: false });
			}
			break;
		default:
			// res.status(400).json({ success: false });
			res.status(400).json({ message: "wack method" });

			break;
	}
}
