import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// the post should contain:
// Title (or post content)
// Timestamp
// agree and disagree
// identification (auto generated)

const PostSchema = new Schema({
	title: String,
	agree: [String],
	disagree: [String],
	date: Date,
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
