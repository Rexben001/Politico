const signupValidator = (req, res, next) => {
    let {
        firstname, lastname, othernames, username, email, phonenumber, password, passportUrl
    } = req.body;
    const check = /\S+@\S+\.\S+/;
    if (!firstname || typeof (firstname) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid firstname' });
    }
    if (!lastname || typeof (lastname) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid lastname' });
    }
    if (!othernames || typeof (othernames) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid othernames' });
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
    if (!passportUrl || typeof (passportUrl) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid passportUrl' });
    }

    req.body.firstname = firstname.replace(/\s+/g, ' ').trim();
    req.body.lastname = lastname.replace(/\s+/g, ' ').trim();
    req.body.othernames = othernames.replace(/\s+/g, ' ').trim();
    req.body.username = username.replace(/\s+/g, ' ').trim();
    req.body.email = email.replace(/\s+/g, ' ').trim();
    req.body.phonenumber = phonenumber.replace(/\s+/g, ' ').trim();
    req.body.password = password.replace(/\s+/g, ' ').trim();
    req.body.passportUrl = passportUrl.replace(/\s+/g, ' ').trim();
    next();
}

export default signupValidator;