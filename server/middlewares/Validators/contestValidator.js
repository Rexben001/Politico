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
  next();
};

export default contestValidator;
