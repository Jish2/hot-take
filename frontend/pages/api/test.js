// import connect from "../../db/connect";
import mongoose from "mongoose";

export default async function handler(req, res) {
	const { method } = req;

	// await connect();
	mongoose.set("strictQuery", true);
	mongoose.connect(process.env.MONGO_URL).then((response) => {
		res.status(200).json({ success: true, data: "MOMs111231!" });
	});

	switch (method) {
		case "GET":
			res.status(200).json({ success: true, data: "MOMs!" });
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
