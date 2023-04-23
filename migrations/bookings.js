const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    petSitterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    initialDate: Date,
    finalDate: Date,
    initialTime: String,
    finalTime: String,
    status: String
  });

  const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;