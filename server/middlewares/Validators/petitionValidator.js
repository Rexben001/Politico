const petitionValidator = (req, res, next) => {
    let {
        office, body, evidence
    } = req.body;
    if (body) {
        body = body.trim();
    }
    if (evidence) {
        evidence = evidence.trim();
    }
    if (!office || typeof (office) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid office' });
    }
    if (!body || typeof (body) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid type' });
    }

    if (!evidence || typeof (evidence) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid evidence' });
    }
    req.body.body = body.replace(/\s+/g, ' ');
    req.body.evidence = evidence.replace(/\s+/g, ' ');
    next();
}

export default petitionValidator;