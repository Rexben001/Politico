const officeValidator = (req, res, next) => {
    let {
        name, type
    } = req.body;
    if (!name || typeof (name) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid name' });
    }
    if (!type || typeof (type) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid type' });
    }

    req.body.name = name.replace(/\s+/g, ' ').trim();
    req.body.type = type.replace(/\s+/g, ' ').trim();
    next();
}

export default officeValidator;