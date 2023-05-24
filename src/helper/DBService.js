const { v4: uuidv4 } = require("uuid");

class DBService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const _id = uuidv4();
    const docRef = this.model.doc(_id);
    await docRef.set({
      _id,
      ...data,
    });

    const doc = this.findOne("_id", "==", _id);
    return doc;
  }

  async findOne(field, op, val) {
    const arr = [];
    const { docs } = await this.model.where(field, op, val).get();

    if (docs.length) {
      for (const e of docs) {
        arr.push(e.data());
      }
    }
    return arr[0];
  }

  async findByWhere(field, op, val) {
    const arr = [];

    const { docs } = await this.model.where(field, op, val).get();

    if (docs.length) {
      for (const e of docs) {
        arr.push(e.data());
      }
    }
    return arr;
  }

  async find() {
    const arr = [];

    const { docs } = await this.model.get();

    if (docs.length) {
      for (const e of docs) {
        arr.push(e.data());
      }
    }
    return arr;
  }
}

module.exports = DBService;
