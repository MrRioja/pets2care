const jwt = require("jsonwebtoken");
const authconfig = require("../config/auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (!(parts.length === 2)) {
    return res.status(401).send({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformatted" });
  }

  jwt.verify(token, authconfig.secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({ error: "Token invalid" });
    }

    req.params.userId = decoded.id;

    return next();
  });
};
