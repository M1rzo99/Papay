const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistakes");
const FollowModel = require("../schema/follow.model");
const Member = require("./Member");

class Follow {
  constructor() {
    this.follow.model = FollowModel;
  }
  async subscribeData(member, data) {
    try {
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Follow;
