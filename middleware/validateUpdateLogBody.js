
module.exports = () => (req, res, next) => {
  console.log('validating log update body')
  const {wake_time, wake_score, day_score, bedtime_score} = req.body;
  if (!wake_time && !wake_score && !day_score && !bedtime_score) {
    res.status(400).json({message: "no data supplied"});
  } else {
    next();
  }
}
