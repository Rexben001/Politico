const voteValidator = (req, res, next) => {
    let {
        office, candidate
    } = req.body;
    if (!office || typeof (office) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid office' });
    }
    if (!candidate || typeof (candidate) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid candidate' });
    }

    next();
}

export default voteValidator;