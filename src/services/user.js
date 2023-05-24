const { User } = require("../db/conn"); //Database Model
const CustomErrorHandler = require("../helper/CustomErrorHandler");
const DBService = require("../helper/DBService");
const DBServiceInstance = new DBService(User);
const { FileStorage } = require("../helper/FileStorage");
const fileStorage = new FileStorage();

class UserService {
  async getAllUsers() {
    const users = await DBServiceInstance.find();

    return users;
  }

  async getSingleUser(id) {
    const user = await await DBServiceInstance.findOne("_id", "==", id);
    if (!user) throw CustomErrorHandler.userNotFound();

    return user;
  }

  async updateUser(id, body) {
    const { firstName, lastName, phone } = body;

    await User.doc(id).update({
      firstName,
      lastName,
      phone,
    });

    const user = await await DBServiceInstance.findOne("_id", "==", id);
    return user;
  }

  async deleteUser(id) {
    let res = await User.doc(id).delete();
    return res;
  }

  async uploadAvatar(id, file) {
    let result = await fileStorage.saveProfilePhoto(id, file);
    await User.doc(id).update({
      avatar: true,
    });

    return { url: result };
  }

  async getAvatar(id, res) {
    return fileStorage.getProfilePhoto(id, res);
  }
}

module.exports = UserService;
