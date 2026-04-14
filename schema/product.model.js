const mongoose = require("mongoose");
const {
  product_collection_enums,
  product_status_enums,
  product_size_enums,
  product_volume_enums,
} = require("../lib/config");

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_collection: {
      type: String,
      required: true,
      enum: {
        values: product_collection_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_status: {
      type: String,
      required: false,
      default: "PAUSED",
      enum: {
        values: product_status_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_discount: {
      type: Number,
      required: false,
      default: 0,
    },
    product_left_cnt: {
      type: Number,
      required: true,
    },
    product_size: {
      type: String,
      required: function () {
        const sized_list = ["dish", "salad", "dessert"];
        return sized_list.includes(this.product_collection);
      },
      default: "normal",
      enum: {
        values: product_size_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_volume: {
      type: Number, // volume ichimliklarni litrlarda olchash un kerak
      default: 1,
      required: function () {
        return this.product_collection === "drink";
      },
      enum: {
        values: product_volume_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_description: {
      type: String, // pr_description doimo bo'lishi shart
      required: true,
    },
    product_images: { type: Array, required: false, default: [] },
    product_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    product_views: {
      type: Number,
      required: false,
      default: 0,
    },
    restaurant_mb_id: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: false,
    },
  },
  { timestamps: true } // createdAt, updateAt larni MongoDb ni o'zi avto qo'yib beradi, oxirgi ozgartirga vaqtni
);

productSchema.index(
  { restaurant_mb_id: 1, product_name: 1, product_size: 1, product_volume: 1 }, // restNomi - cola -null-2 o'qilishi kodimizni
  { unique: true }
);
// uniqness un, bir xil nomdagi,bir xil sizedagi malumotlarni yozmasin

module.exports = mongoose.model("Product", productSchema);
