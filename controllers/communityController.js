const Member = require("../models/Member");
let communityController = module.exports;
const jwt = require("jsonwebtoken");
const assert = require("assert");
const Definer = require("../lib/mistakes");
const Community = require("../models/Community");

communityController.imageInsertion = async (req, res) => {
  try {
    console.log("POST: cont/ImageInseriton");
    assert.ok(req.file, Definer.general_err3);
    const image_url = req.file.path;
    res.json({ state: "success", data: image_url });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
communityController.createArticle = async (req, res) => {
  try {
    console.log("POST: cont/createArticle");
    // todo:community service model
    const community = new Community();
    const result = await community.createArticleData(req.member, req.body);
    assert.ok(result, Definer.general_err1);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
communityController.getMemberArticles = async (req, res) => {
  try {
    console.log("POST: cont/getMemberArticles");
    const community = new Community();

    const mb_id =
      req.query.mb_id !== "none" ? req.query.mb_id : req.member?._id;
    assert.ok(mb_id, Definer.article_err1);
    const result = await community.getMemberArticlesData(
      req.member,
      mb_id,
      req.query
    );

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};