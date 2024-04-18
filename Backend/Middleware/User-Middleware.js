// const jwt = require("jsonwebtoken");

// function authenticate(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token === null) {
//     // return res.json({ msg: "noToken" });
//     res.redirect("/user/login");
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       res.redirect("/user/login");
//       // return res.json({ msg: "invalid token" });
//     }
//     req.user = user;
//     next();
//   });
// }

// module.exports = { authenticate };

// Middleware to authenticate requests


const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    // Redirect to login page if no token
    return res.redirect("/user/login");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Redirect to login page if token is invalid
      return res.redirect("/user/login");
    }
    req.user = user;
    console.log("user authenticated")
    next();
  });
}

module.exports = { authenticate };
