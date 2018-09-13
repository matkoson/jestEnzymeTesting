import passport from "passport";
import User from "../models/user";
import config from "../config";
import {Strategy as JwTStrategy, ExtractJwt} from "passport-jwt";
import LocalStrategy from "passport-local";


//CREATE LOCAL STRATEGY
const localOptions = {usernameField: "email"};
const localLogin = new LocalStrategy(localOptions,
	(email, password, done)=> {
		//VERIFY THIS USERNAME AND PASSWORD, CALL done WITH THE
		//USER  IF THE CREDENTIALS CHECKS OUT
		//OTHERWISE, CALLING done WITH false
		User.findOne({email}, (err, user)=> {
			if(err) {return done(err);}
			if(!user) {return done(null, false);}
			//COMPARING PASSWORDS=> IS "password" EQUAL
			//TO user.password?
			user.comparePassword(password,
				function matcher(err, isMatch) {
					if(err) {return done(err);}
					if(!isMatch) {return done(null, false);}
					return done(null, user);
				});
		});

	});

//SETUP OPTIONS FOR JWT STRATEGY
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: config.secret
};

//CREATE JWT Strategy
const jwtLogin = new JwTStrategy(jwtOptions, (payload, done)=> {
	//SEE IF THE USER id IN THE payload EXISTS IN MY DB
	//IF IT DOES, CALL done WITH THAT USR, OTHERWISE,
	//CALL done WITHOUT A USER{}
	User.findById(payload.sub, (err, user)=> {
		if(err) {return done(err, false);}

		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});
//TELL PASSPORT TO USE THIS STRATEGY
passport.use(jwtLogin);
passport.use(localLogin);
