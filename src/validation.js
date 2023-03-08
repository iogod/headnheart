const Joi = require("joi");
export const validateComment = (objComment) => {
  const JoiSchema = Joi.object({
    commentText: Joi.string().min(1).max(250).required(),

    companyName: Joi.string().min(1).max(50).required(),
    priority: Joi.boolean().optional(),
    userID: Joi.string().min(1).max(50).required(),
    time: Joi.any().optional(),
  }).options({ abortEarly: false });
  const { error } = JoiSchema.validate(objComment);
  return error;
};

export const validateInquiry = (objComment) => {
  const JoiSchema = Joi.object({
    package: Joi.string().min(1).max(2).required(),

    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().max(40).required(),
  }).options({ abortEarly: false });
  const { error } = JoiSchema.validate(objComment);
  return error;
};

export const validateUpdate = (objComment) => {
  const JoiSchema = Joi.object({
    postID: Joi.string().min(1).max(50).required(),
    priority: Joi.boolean().required(),
  }).options({ abortEarly: false });
  const { error } = JoiSchema.validate(objComment);
  return error;
};

export const validateSignUp = (objComment) => {
  const JoiSchema = Joi.object({
    first: Joi.string().min(1).max(30).required(),
    last: Joi.string().min(1).max(30).required(),
    email: Joi.string().max(50).required(),
  }).options({ abortEarly: false });
  const { error } = JoiSchema.validate(objComment);
  return error;
};

export const verifyToken = async (req, res, next) => {
  //Auth header value = > send token into header
  const bearerHeader = req.headers.authorization;
  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //split the space at the bearer
    const bearer = bearerHeader.split(" ");
    //Get token from string
    const bearerToken = bearer[1];
    //set the token

    // const validate = await admin
    //   .auth()
    //   .verifyIdToken(bearerToken)
    //   .then((decodedToken) => {
    //     req.id = decodedToken.uid;
    //   })
    //   .catch((error) => {
    //     res.status(403).send("Invalid User-Request Denied");
    //   });

    next();
  }
};

// module.exports = {
//   validateComment,
//   verifyToken,
//   validateInquiry,
//   validateSignUp,
//   validateUpdate,
// };
