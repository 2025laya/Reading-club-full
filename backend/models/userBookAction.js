const mongoose = require('mongoose');

const userBookActionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  actionType: {
    type: String,
    enum: ['save', 'favorite', 'read'],
    required: true
  }
}, { timestamps: true });

// فهرس مركب لمنع تكرار نفس الإجراء لنفس المستخدم على نفس الكتاب
userBookActionSchema.index(
  { userId: 1, bookId: 1, actionType: 1 },
  { unique: true }
);

module.exports = mongoose.model('UserBookAction', userBookActionSchema);