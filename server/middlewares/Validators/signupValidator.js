const signupValidator = (req, res, next) => {
  let {
    firstname, lastname, username, email, phonenumber, password, passportUrl
  } = req.body;
  if (firstname && typeof (firstname) === 'string') {
    firstname = firstname.trim();
  }
  if (lastname && typeof (lastname) === 'string') {
    lastname = lastname.trim();
  }
  if (username && typeof (username) === 'string') {
    username = username.trim();
  }
  if (email && typeof (email) === 'string') {
    email = email.trim();
  }
  if (phonenumber && typeof (phonenumber) === 'string') {
    phonenumber = phonenumber.trim();
  }
  if (password && typeof (password) === 'string') {
    password = password.trim();
  }

  const check = /\S+@\S+\.\S+/;
  if (!firstname || typeof (firstname) !== 'string') {
    return res.status(422).json({ status: 422, error: 'Enter a valid firstname' });
  }
  if (!lastname || typeof (lastname) !== 'string') {
    return res.status(422).json({ status: 422, error: 'Enter a valid lastname' });
  }
  if (!username || typeof (username) !== 'string') {
    return res.status(422).json({ status: 422, error: 'Enter a valid username' });
  }
  if (!email || typeof (email) !== 'string' || check.test(email) === false) {
    return res.status(422).json({ status: 422, error: 'Enter a valid email' });
  }
  if (!password || typeof (password) !== 'string') {
    return res.status(422).json({ status: 422, error: 'Enter a valid password' });
  }
  if (!phonenumber || typeof (phonenumber) !== 'string') {
    return res.status(422).json({ status: 422, error: 'Enter a valid phonenumber' });
  }
  if (!passportUrl) {
    return res.status(422).json({ status: 422, error: 'Enter a valid passportUrl' });
  }

  req.body.firstname = firstname.replace(/\s+/g, ' ');
  req.body.lastname = lastname.replace(/\s+/g, ' ');
  req.body.username = username.replace(/\s+/g, ' ');
  req.body.email = email.replace(/\s+/g, ' ');
  req.body.phonenumber = phonenumber.replace(/\s+/g, ' ');
  req.body.password = password.replace(/\s+/g, ' ');
  req.body.passportUrl = passportUrl;
  next();
};

export default signupValidator;