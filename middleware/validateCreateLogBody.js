
module.exports = () => (req, res, next) => {
  console.log('validating log creation')
  const {bedtime} = req.body;
  if (bedtime) {
    next();
  } else {
    res.status(400).json({message: "no bedtime supplied"});
  }
}
