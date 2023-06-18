// import connect from "../../db/connect";

export default async function handler(req, res) {
	const { method } = req;

	// await connect();

	switch (method) {
		case "GET":
			res.status(200).json({ success: true, data: "MOM", mng: global.mongoose });
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
