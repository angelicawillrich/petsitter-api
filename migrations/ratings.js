const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    description: String,
    reviewedByPetSitter: Boolean
  });

const RatingModel = mongoose.model('Rating', RatingSchema);

module.exports = RatingModel;
