let followController = module.exports;
const Definer = require("../lib/mistakes");
const assert = require("assert");
const Follow = require("../models/Follow");
followController.subscribe = async (req, res) => {
  try {
    console.log("POST: cont/subscribe");
    assert.ok(req.member, Definer.auth_err5);
    const follow = new Follow(),
      result = await follow.subscribeData(rq.member, req.body);
    res.json({ state: "success", data: "subscribed" });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
