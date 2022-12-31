import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// the post should contain:
// Title (or post content)
// Timestamp
// upvotes and downvotes
// identification (auto generated)

const PostSchema = new Schema({
	title: String,
	upvote: [String],
	downvote: [String],
	date: Date,
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
