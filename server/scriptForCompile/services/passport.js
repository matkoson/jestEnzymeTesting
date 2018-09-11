import passport from "passport";
import User from "../models/user";
import config from "../config";
import {Strategy as JwTStrategy, ExtractJwt} from "passport-jtw";
