const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const Quiz = require("../../models/quiz");

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);

    const token = createJWT(user);

    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

const getQuizzes = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.userId });
    const quizzes = await Quiz.find({ user: user._id });
    res.status(200).json(quizzes);
    return quizzes;
  } catch (error) {}
};

const getScore = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.userId });
    const score = user.score;
    res.status(200).json(score);
    return score;
  } catch (error) {}
};

const getRank = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.userId });
    console.log("----------------------user Rank------------", user.rank);
    const rank = user.rank;
    res.status(200).json(rank);
    return rank;
  } catch (error) {}
};

module.exports = {
  create,
  login,
  checkToken,
  getQuizzes,
  getScore,
  getRank,
};
