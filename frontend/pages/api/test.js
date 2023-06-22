import connect from "../../db/connect";
import mongoose from "mongoose";

export const config = {
	api: {
		externalResolver: true,
	},
};

const mongo = process.env.MONGO_URL;

async function establish_connect() {
	// const connection = mongoose.connect(mongo);
	// await connection.asPromise();

	const conn = mongoose.createConnection(mongo, { serverSelectionTimeoutMS: 5000 });
	await conn.asPromise();
}

export default async function handler(req, res) {
	const { method } = req;

	await connect();

	switch (method) {
		case "GET":
			const results = await Post.findById("64711997ce441726e6aeb831").limit(1);
			res.status(200).json(results);

			// res.status(200).json({ success: true, data: "MOMs!1aa", other: mongoose.connection.readyState });
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
