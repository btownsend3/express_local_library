// Book instance represents a specific copy of a book that somebody might borrow

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    imprint: { type: String, required: true },
    status: { type: String, required: true, enum: ['Available', 'Maintenanced', 'Loaned', 'Reserved'], default: 'Maintenanced' },
    due_back: { type: Date, default: Date.now() }
  }
)

// Virtual for bookinstance's url 
BookInstanceSchema.virtual('url').get(() => {
  return '/catalog/bookinstance' + this.id
})

module.exports = mongoose.model('BookInstance', BookInstanceSchema)