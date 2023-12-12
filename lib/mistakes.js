class Definer {
  // Geneeral errors
  static general_err1 = "att: something went wrong!";
  static general_err2 = "att: there is no data with that parmas!";
  static general_err3 = "att: file upload error!";

  // member auth related errors
  static auth_err1 = "att: MongoDB validation failed!";
  static auth_err2 = "att: jwt token creation error!";
  static auth_err3 = "att: There is no member with mb_nick name!";
  static auth_err4 = "att: Password is incorrect!";
  static auth_err5 = "att: You are not authintificated!";

  // Product auth related errors
  static product_err1 = "att: pproduct creatiin missinonn fail";

  // Product  related errors
  static order_err1 = "att: order creation is failed!";
  static order_err2 = "att: orderItem creation is failed!";
  static order_err3 = "att: no orders with that params exists!";
}

module.exports = Definer;
