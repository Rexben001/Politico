const petitionValidator = (req, res, next) => {
    let {
        office, bodyValue, evidence
    } = req.body;
    if (bodyValue && typeof (bodyValue) === 'string') {
        bodyValue = bodyValue.trim();
    }
    if (evidence && typeof (evidence) === 'string') {
        evidence = evidence.trim();
    }
    if (!office || typeof (office) !== 'number') {
        return res.status(422).json({ status: 422, error: 'Enter a valid office' });
    }
    if (!bodyValue || typeof (bodyValue) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid bodyValue' });
    }

    if (!evidence || typeof (evidence) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid evidence' });
    }
    req.body.bodyValue = bodyValue.replace(/\s+/g, ' ');
    req.body.evidence = evidence.replace(/\s+/g, ' ');
    next();
}

export default petitionValidator;