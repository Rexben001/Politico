const contestValidator = (req, res, next) => {
  const {
    office, party
  } = req.body;
  if (!office || typeof (office) !== 'number') {
    return res.status(422).json({ status: 422, error: 'Enter a valid office' });
  }
  if (!party || typeof (party) !== 'number') {
    return res.status(422).json({ status: 422, error: 'Enter a valid party' });
  }

  // req.body.office = office.replace(/\s+/g, ' ').trim();
  // req.body.party = party.replace(/\s+/g, ' ').trim();
  next();
};

export default contestValidator;
