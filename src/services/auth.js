const { User, Book, findOne } = require("../db/conn"); //Database Model
const { v4: uuidv4 } = require("uuid");
const { MSG } = require("../helper/constant");
const CustomErrorHandler = require("../helper/CustomErrorHandler");
const { generateAuthToken } = require("../helper/helper");
const DBService = require("../helper/DBService");
const userDBService = new DBService(User);

class AuthService {
  async signup(body) {
    const { firstName, lastName, phone, email, password } = body;

    // check user already exist
    const userData = await userDBService.findOne("email", "==", email);

    if (userData) throw CustomErrorHandler.alreadyExist(MSG.EMAIL_TAKEN);

    // create user
    const newUser = await userDBService.create({
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    // const uid = uuidv4();
    // const userDoc = User.doc(uid);
    // const newUser = await userDoc.set({
    //   _id: uid,
    //   firstName,
    //   lastName,
    //   phone,
    //   email,
    //   password,
    // });

    return newUser;
  }

  async login(body) {
    const { email, password } = body;
    let userData = await userDBService.findOne("email", "==", email);

    // check auth
    if (!userData || userData.password !== password)
      throw CustomErrorHandler.wrongCredentials();

    const token = await generateAuthToken(userData._id);
    userData.token = token;

    return userData;
  }

  async getMe(user) {
    return user;
  }
}

module.exports = AuthService;
