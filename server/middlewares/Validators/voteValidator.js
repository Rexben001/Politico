const voteValidator = (req, res, next) => {
    let {
        office, createdBy, candidate
    } = req.body;
    if (!office || typeof (office) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid office' });
    }
    if (!createdBy || typeof (createdBy) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid createdBy' });
    }
    if (!candidate || typeof (candidate) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid candidate' });
    }

    next();
}

export default voteValidator;