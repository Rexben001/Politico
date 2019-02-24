

const partyValidator = (req, res, next) => {
    let {
        name, hqAddress, logoUrl
    } = req.body;
    if (name && typeof (name) === 'string') {
        name = name.trim();
    }
    if (hqAddress && typeof (hqAddress) === 'string') {
        hqAddress = hqAddress.trim();
    }
    if (logoUrl && typeof (logoUrl) === 'string') {
        logoUrl = logoUrl.trim();
    }

    if (!name || typeof (name) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid name' });
    }
    if (!hqAddress || typeof (hqAddress) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid hqAddress' });
    }
    if (!logoUrl || typeof (logoUrl) !== 'string') {
        return res.status(422).json({ status: 422, error: 'Enter a valid logoUrl' });
    }
    req.body.name = name.replace(/\s+/g, ' ');
    req.body.hqAddress = hqAddress.replace(/\s+/g, ' ');
    req.body.logoUrl = logoUrl;
    next();
}


export default partyValidator;