const jwt = require('jsonwebtoken')
const { models } = require('mongoose')

// Authentication middleware
const auth = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if(token == null) {
		return res.status(401).send("Unauthorized access");
	}

	// Veify the token of the user
	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		if(err) {
			console.error(err);
			return res.status(403).send("Session expired");
		}
		req.currentUserName = user.name;
		next();
	})
};

module.exports = auth