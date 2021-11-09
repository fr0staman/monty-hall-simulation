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
          const newChanged = stat[0].changed + 1;
          await Result.updateOne({_id: stat[0]._id}, {changed: newChanged});
          return res.json({status: 'SUCCESS 1'});
        } else {
          const newUnchanged = stat[0].unchanged + 1;
          await Result.updateOne({_id: stat[0]._id}, {unchanged: newUnchanged});
          return res.json({status: 'SUCCESS 2'});
        }
      } else {
        if (status) {
          await Result.create({unchanged: 0, changed: 1});
          return res.json({status: 'SUCCESS 3'});
        } else {
          await Result.create({unchanged: 1, changed: 0});
          return res.json({status: 'SUCCESS 4'});
        }
      }
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