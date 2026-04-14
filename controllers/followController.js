let followController = module.exports;
const assert = require("assert");
const Definer = require("../lib/mistakes");
const Follow = require("../models/Follow");
const { exec } = require("child_process");

followController.subscribe = async (req, res) => {
  try {
    console.log("POST: cont/subscribe");
    assert.ok(req.member, Definer.auth_err5);

    const follow = new Follow();
    await follow.subscribeData(req.member, req.body);

    res.json({ state: "success", data: "subscribed" });
  } catch (err) {
    console.log(`ERROR, cont/subscribe, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

followController.unSubscribe = async (req, res) => {
  try {
    console.log("POST: cont/unSubscribe");
    assert.ok(req.member, Definer.auth_err5); // auth bo'lganini tekshiradi.Bo'lmagan bo'lsa error beradi

    const follow = new Follow();
    await follow.unSubscribeData(req.member, req.body);

    res.json({ state: "success", data: "unsubscribed" });
  } catch (err) {
    console.log(`ERROR, cont/subscribe, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

followController.getMemberFollowings = async (req, res) => {
  try {
    console.log("POST: cont/getMemberFollowings");

    const follow = new Follow();
    const result = await follow.getMemberFollowingsData(req.query);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/subscribe, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

followController.getMemberFollowers = async (req, res) => {
  try {
    console.log("POST: cont/getMemberFollowers");

    const follow = new Follow();
    const result = await follow.getMemberFollowersData(req.member, req.query);

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/getMemberFollowers, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
