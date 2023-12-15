const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistakes");
const FollowModel = require("../schema/follow.model");
const MemberModel = require("../schema/member.model");
const { query } = require("express");

class Follow {
  constructor() {
    this.followModel = FollowModel;
    this.memberModel = MemberModel;
  }

  async subscribeData(member, data) {
    try {
      assert.ok(member._id !== data.mb_id, Definer.follow_err1);

      const subscriber_id = shapeIntoMongooseObjectId(member._id);
      const follow_id = shapeIntoMongooseObjectId(data.mb_id);

      const mb_data = await this.memberModel
        .findById({ _id: follow_id })
        .exec();
      assert.ok(mb_data, Definer.general_err2);

      const result = await this.createSubscriptionData(
        follow_id,
        subscriber_id
      );
      assert.ok(result, Definer.general_err1);

      await this.modifyMemberFollowCount(follow_id, "subscriber_change", 1);
      await this.modifyMemberFollowCount(subscriber_id, "follow_change", 1);
      return true;
    } catch (err) {
      throw err;
    }
  }

  async createSubscriptionData(follow_id, subscriber_id) {
    try {
      const new_follow = this.followModel({
        follow_id: follow_id,
        subscriber_id: subscriber_id,
      });

      return await new_follow.save();
    } catch (mongo_err) {
      console.log(mongo_err);
      throw new Error(Definer.follow_err2);
    }
  }

  async modifyMemberFollowCount(mb_id, type, modifier) {
    try {
      if (type === "follow_change") {
        await this.memberModel
          .findByIdAndUpdate(
            { _id: mb_id },
            { $inc: { mb_follow_cnt: modifier } }
          )
          .exec();
      } else if (type === "subscriber_change") {
        await this.memberModel
          .findByIdAndUpdate(
            { _id: mb_id },
            { $inc: { mb_subscriber_cnt: modifier } }
          )
          .exec();
      }
      return true;
    } catch (err) {
      throw err;
    }
  }

  async unSubscribeData(member, data) {
    try {
      const subscriber_id = shapeIntoMongooseObjectId(member._id);
      const follow_id = shapeIntoMongooseObjectId(data.mb_id);
      const result = await this.followModel.findByIdAndDelete({
        follow_id: follow_id,
        subscriber_id: subscriber_id,
      });

      assert.ok(result, Definer.general_err1);
      await this.modifyMemberFollowCount(follow_id, "subscriber_change", -1);
      await this.modifyMemberFollowCount(subscriber_id, "follow_change", -1);
      return true;
    } catch (err) {
      throw err;
    }
  }

  async getMemberFollowingsData(inquiry) {
    try {
      console.log("query::", inquiry);
      const subscriber_id = shapeIntoMongooseObjectId(inquiry.mb_id),
        page = inquiry.page * 1,
        limit = inquiry.limit * 1;
      const result = await this.followModel
        .aggregate([
          { $match: { subscriber_id: subscriber_id } },
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ])
        .exec();
      assert.ok(result, Definer.follow_err3);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Follow;
