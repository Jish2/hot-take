import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// the post should contain:
// Title (or post content)
// Timestamp
// agree and disagree
// identification (auto generated)

const ReplySchema = new Schema(
	{
		content: { type: String, required: true },
		commentID: { type: String, required: true },
	},
	{ timestamps: true }
);

const ReplyModel = mongoose.model("Reply", ReplySchema);

export default ReplyModel;
