const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date }
  }
)

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(() => {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  const fullname = ''
  if (this.first_name && this.family_name) {
    fullname = this.first_name + ' ' + this.family_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = ''
  }
  return fullname
})

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(() => {
  const lifetime_string = ''
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getYear() + ' - '
  }
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear()
  }
  return lifetime_string
})

// Virtual for author's URL
AuthorSchema.virtual('url').get(() => {
  return '/catalog/author/' + this.id
})

module.exports = mongoose.model('Author', AuthorSchema)