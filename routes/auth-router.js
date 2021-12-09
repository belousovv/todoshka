const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const authMiddleware = require("../middlewares/auth-middleware");

// register

router.post("/register", async (req, res) => {
  try {
    //1. destructuring req.body

    const { name, email, password } = req.body;

    //2. check if email already exist (error if exist)

    const checkUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (checkUser.rows.length > 0) {
      return res
        .status(401)
        .json({ code: 1, message: "email already exist" });
    }

    //3. create new user

    //a. generate bcrypted password

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashPassword]
    );

    //4. generate and return jwt_token

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ code: 0, token });
  } catch (e) {
    return res.json({ code: 1, message: e.message });
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    //1. destructuring req.body

    const { email, password } = req.body;

    //2. check email (generate error if not exist)

    const checkUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (checkUser.rows.length === 0) {
      return res.status(401).json({ code: 1, message: "email or password incorrect" });
    }

    //3. check password (generate error if not compare)

    const compare = await bcrypt.compare(
      password,
      checkUser.rows[0].user_password
    );
    if (!compare) {
      return res.status(401).json({ code: 1, message: "email or password incorrent" });
    }

    //4. generate and return jwt_token

    const token = jwtGenerator(checkUser.rows[0].user_id);
    res.json({ code: 0, token });
  } catch (e) {
    return res.json({ code: 1, message: e.message });
  }
});

// verify

router.get("/verify", authMiddleware, (req, res) => {
  try {
    res.json({ verify: true });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

module.exports = router;
