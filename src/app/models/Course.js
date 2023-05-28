const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;
const Course = new Schema({
  name: { type: String, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  videoid: { type: String },
  level: { type: String },
  slug: { type: String, slug: 'name', unique: true },
  deleted: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Course', Course);
