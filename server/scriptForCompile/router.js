import {signup, signin} from "./controllers/authentication";
import passportService from "./services/passport";
import passport from "passport";

const requireAuth = passport.authenticate("jwt", { session: false});
const requreSignin = passport.authenticate("local", {session: false});

export default(app) => {
	app.get("/", requireAuth, (req, res)=> {
		res.send({hi: "there"});
	});
	app.post("/signin", requreSignin, signin);
	app.post("/signup", signup);
};
