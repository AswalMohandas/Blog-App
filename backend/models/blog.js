const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
 
  category: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
   src: {
  type: String,
  required: true
},
userid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",

}
 
}, { timestamps: true });

module.exports =
  mongoose.models.Blog || mongoose.model('Blog', blogSchema);