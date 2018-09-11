import User from "../models/user";
import jwt from "jwt-simple";
import config from "../config";

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({}, config.secret);
}

export function signup(req, res, next) {
	//SEE IF A USR WITH THE GIVEN EMAIL EXISTS
	const {email, password} = req.body;
	//IF A USR WITH email DOES EXIST, return AN ERROR
	if(!email || !password) {
		return res.status(422).send({error: "You must provide email and password."});
	}
	const user = new User({
		email: email,
		password: password
	});
	User.findOne({email: email})
		.then((existingUser)=> {
			if(existingUser) {throw new Error("email in use!");}
			return user.save();
		})
		//RESPOND TO THE REQ INDICATING THE USR WAS CRTD
		.then(()=> res.json({token: tokenForUser(user)}))

		.catch((err)=> {
			if(err.message === "email in use") {
				return res.status(422).send({error: err.message});
			}
			return next(err);
		});
}
