const mongoose = require("mongoose");
const {
  member_type_enums,
  member_status_enums,
  ordenary_enums,
} = require("../lib/config");

const memberSchema = new mongoose.Schema(
  {
    mb_nick: {
      type: String,
      required: true,
      index: {
        unique: true,
        sparse: true,
      },
    },
    mb_phone: {
      type: String,
      required: true,
      index: {
        unique: true,
        sparse: true,
      },
    },
    mb_password: {
      type: String,
      required: true,
      select: false,
    },
    mb_type: {
      type: String,
      default: "USER",
      enum: {
        values: member_type_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    mb_status: {
      type: String,
      default: "ACTIVE",
      enum: {
        values: member_status_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    mb_adress: {
      type: String,
    },
    mb_description: {
      type: String,
    },
    mb_image: {
      type: String,
      required: false,
    },
    mb_point: {
      type: Number,
      default: 0,
    },
    mb_top: {
      type: String,
      default: "N",
      enum: {
        values: ordenary_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    mb_views: {
      type: Number,
      default: 0,
    },
    mb_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_follow_cnt: {
      type: Number,
      default: 0,
      require: false,
    },
    mb_subscriber_cnt: {
      type: Number,
      default: 0,
      require: false,
    },
  },
  { timestamps: true } //CreatedAt UpdatedAt
);

module.exports = mongoose.model("Members", memberSchema);
