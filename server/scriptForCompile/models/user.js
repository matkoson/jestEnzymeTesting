import mongoose, {Schema} from "mongoose";

//DEFINING A MODEL
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

//CRT A MODEL class
const modelClass = mongoose.model("user", userSchema);

//export THE MODEL
export default modelClass;
