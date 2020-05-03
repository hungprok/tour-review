const Tour = require('../models/Tour');

exports.createTour = async (req, res) => {
    const { title, cate, tourguide } = req.body;

    // const tourguideId = await tourguide.findById(tourguide);
    // const cateArray = cate.map(async el => await cate.findById(el))
    // const cateResult = await Promise.all(cateArray)


    const tour = new Tour ({
        tourguide: tourguide,
        cate: cate,
        title: title,
        owner: {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email
        }
    })
    await tour.save();
    return res.status(200).json({ status: "ok", data: tour })
};



exports.readTour = async (req, res) => {

  try {
    const Tours = await Tour.find({ "owner._id": req.user._id });
    res.json({ status: "success", data: Tours });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  };
};

exports.updateTour = async (req, res) => {

    try {
      const Tour = await Tour.findById(req.body.id);
      const fields = Object.keys(req.body);

      // eliminate id field, actually, it's okay if u leave it there 'cause it's the same id
      const newFields = fields.filter(el => el !== 'id')
      newFields.map(field => Tour[field] = req.body[field]);
      await Tour.save();
      res.status(200).json({ status: "success", data: Tour });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    };
  };