const Result = require('../models/result-model')

class CountController {
  async increment(req, res, next) {
    try {
      const {unchanged, changed} = req.body;
      const stat = await Result.find({}, {unchanged: 1, changed: 1, _id: 1}).lean();
      if (unchanged) {
        const newUnchanged = stat.unchanged + 1;
        await Result.updateOne({_id: stat._id}, {unchanged: newUnchanged});
        return res.json({status: 'ACCESS'});
      } else if (changed) {
        const newChanged = stat.changed + 1;
        await Result.updateOne({_id: stat._id}, {changed: newChanged});
        return res.json({status: 'ACCESS'});
      } else {
        return res.json({status: 'UNKNOWN ERROR'});
      }
    } catch (e) {
      console.log(e);
    }
  }

  async statistic(req, res, next) {
    const stat = await Result.find({}, {unchanged: 1, changed: 1, _id: 0}).lean();
    return res.json(stat);
  }
}

module.exports = new CountController();