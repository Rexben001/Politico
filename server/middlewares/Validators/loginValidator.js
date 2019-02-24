const loginValidator = (req, res, next) => {
  let {
    email, password
  } = req.body;
  if (email && typeof (email) === 'string') {
    email = email.trim().toLowerCase();
  }
  if (password && typeof (password) === 'string') {
    password = password.trim();
  }
  const check = /\S+@\S+\.\S+/;
  if (!email || typeof (email) !== 'string' || check.test(email) === false) {
    return res.status(422).json({ status: 422, error: 'Enter a valid email' });
  }
  if (!password || typeof (password) !== 'string') {
    return res.status(422).json({ status: 422, error: 'Enter a valid password' });
  }

  req.body.email = email.replace(/\s+/g, ' ');
  req.body.password = password.replace(/\s+/g, ' ');
  return next();
};

export default loginValidator;
