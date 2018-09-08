export default (app)=> {
  app.get("/", (req, res, next)=> {
    console.log("got it");
    return res.send(["lolololo"]);
  })
};
