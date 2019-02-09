import database from '../../models/database';


const partyValidator = (req, res, next) => {
    let {
        name, hqAddress, logoUrl
    } = req.body;
    if (name) {

        name = name.trim();
    }
    if (hqAddress) {
        hqAddress = hqAddress.trim();
    }
    if (logoUrl) {
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
    req.body.logoUrl = logoUrl.replace(/\s+/g, ' ');
    next();
}


export default partyValidator;