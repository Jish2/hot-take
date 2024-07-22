import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
import Reply from "./Reply.js";

// the post should contain:
// Title (or post content)
// Timestamp
// agree and disagree
// identification (auto generated)

const CommentSchema = new Schema({
  date: { type: Date, required: true },
  content: { type: String, required: true },
  postID: { type: String, required: true },
  replies: [
    {
      date: Date,
      content: String,
    },
  ],
});

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
