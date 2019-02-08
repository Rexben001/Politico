const loginValidator = (req, res, next) => {
    let {
        email, password
    } = req.body;
    email = email.trim();
    password = password.trim();
    const check = /\S+@\S+\.\S+/;
    if (!email || typeof (email) !== 'string' || check.test(email) === false) {
        return res.status(422).json({ status: 422, error: 'Enter a valid email' });
    }
    if (!password || typeof (password) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid password' });
    }

    req.body.email = email.replace(/\s+/g, ' ').trim();
    req.body.password = password.replace(/\s+/g, ' ').trim();
    next();
}

export default loginValidator;