const Definer = require("../lib/mistakes");
const MemberSchema = require("../schema/member.control");
const assert = require("assert");
const bcrypt = require("bcryptjs");

class Member {
  constructor() {
    this.memberModel = MemberSchema;
  }

  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input);
      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }
      const lengthPassword = result.mb_password.length;
      let secret_password = "";
      for (let i = 0; i < lengthPassword; i++) {
        secret_password += "x";
      }
      result.mb_password = secret_password;
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      console.log("POST: const/login");
      const member = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        .exec();
      assert.ok(member, Definer.auth_err3);

      const isMatch = await bcrypt.compare(
        input.mb_password,
        member.mb_password
      ); // Corrected the arguments
      assert.ok(isMatch, Definer.auth_err4);
      console.log("member:::", member);
      return await this.memberModel.findOne({ mb_nick: input.mb_nick });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
