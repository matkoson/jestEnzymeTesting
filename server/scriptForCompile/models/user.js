import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

//DEFINING A MODEL
const userSchema = new mongoose.Schema({
	email: {type: String, unique: true, lowercase: true},
	password: String
});

//ON SAVE HOOK, ENCRYPT PASSWORD

userSchema.pre("save", function(next) {

	bcrypt.genSalt(10, (err, salt)=> {
		if(err) {return next(err);}

		bcrypt.hash(this.password, salt, null,
			(err, hash)=> {
				if (err) {return next(err);}
				console.log(hash, this.password);
				this.password = hash;
				next();
			});
	});
});

userSchema.methods.comparePassword =
function comparision(candidatePasswd, cb) {
	bcrypt.compare(candidatePasswd, this.password,
		function matcher(err, isMatch) {
			if(err) {return cb(err);}

			cb(null, isMatch); 
		});
};



//CRT A MODEL class
const ModelClass = mongoose.model.call(mongoose, "user", userSchema);

//export THE MODEL
export default ModelClass;
