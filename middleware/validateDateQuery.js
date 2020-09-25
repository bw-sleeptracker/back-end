
module.exports = () => (req, res, next) => {
  console.log('validating date query')
  const {date} = req.query;
  if (date.length === 10) {
    next();
  } else {
    res.status(400).json({message: "no valid date supplied"});
  }
}
