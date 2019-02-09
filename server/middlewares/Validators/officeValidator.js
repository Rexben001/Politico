const officeValidator = (req, res, next) => {
    let {
        name, type
    } = req.body;
    if (name) {
        name = name.trim().toLowerCase();
    }
    if (type) {
        type = type.trim().toLowerCase();
    }
    if (!name || typeof (name) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid name' });
    }
    if (!type || typeof (type) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid type' });
    }

    req.body.name = name.replace(/\s+/g, ' ');
    req.body.type = type.replace(/\s+/g, ' ');
    next();
}

export default officeValidator;