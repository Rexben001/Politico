const petitionValidator = (req, res, next) => {
    let {
        office, body, evidence
    } = req.body;
    body = body.trim();
    evidence = evidence.trim();
    if (!office || typeof (office) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid office' });
    }
    if (!body || typeof (body) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid type' });
    }

    if (!evidence || typeof (evidence) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid evidence' });
    }
    req.body.body = body.replace(/\s+/g, ' ').trim();
    req.body.evidence = evidence.replace(/\s+/g, ' ').trim();
    next();
}

export default petitionValidator;