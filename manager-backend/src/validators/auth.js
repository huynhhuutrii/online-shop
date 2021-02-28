const { check, validationResult } = require('express-validator');
exports.validateRegister = [
  check('username').notEmpty().withMessage('Tên tài khoản bắt buộc'),
  check('email').isEmail().withMessage('Email bắt buộc'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải ít nhất 6 ký tự'),
];
exports.validateLogin = [
  check('email').isEmail().withMessage('Email bắt buộc'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải ít nhất 6 ký tự'),
];
exports.isValidated = (req, res, next) => {
  const err = validationResult(req);
  if (err.array().length > 0) {
    return res.status(400).json({
      errors: err.array()[0].msg,
    });
  }
  next();
};
