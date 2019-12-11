const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  projectTitle: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String
  },
  createdBy: {
    type: String
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  posts: [
    {
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      createdDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Project = mongoose.model("project", ProjectSchema);
