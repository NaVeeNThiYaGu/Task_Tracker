import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: String,
  place: String
});

const Person = mongoose.model('Person', personSchema);
export default Person;