const Result = require('../models/result-model')

class CountController {
  async increment(req, res, next) {
    try {
      const {status} = req.body;
      // const stat = await Result.find({}, {unchanged: 1, changed: 1, _id: 1}).lean();
      // return res.json(stat);
      const count = await Result.countDocuments();
      if (count) {
        const stat = await Result.find({}, {unchanged: 1, changed: 1, _id: 1}).lean();
        if (status) {
          const newUnchanged = stat[0].changed + 1;
          await Result.updateOne({_id: stat[0]._id}, {unchanged: newUnchanged});
        } else {
          const newChanged = stat[0].changed + 1;
          await Result.updateOne({_id: stat[0]._id}, {changed: newChanged});
        }
      } else {
        if (status) {
          await Result.create({unchanged: 0, changed: 1});
        } else {
          await Result.create({unchanged: 1, changed: 0});
        }
      }
      return res.json({status: 'ACCESS'});
    } catch (e) {
      console.log(e);
    }
  }

  async statistic(req, res, next) {
    const stat = await Result.find({}, {unchanged: 1, changed: 1, _id: 0}).lean();
    return res.json({changed: stat[0].changed, unchanged: stat[0].unchanged});
  }
}

module.exports = new CountController();