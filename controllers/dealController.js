import models from '../models';

const { Op } = models.Sequelize;

class DealController {
  /**
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @return {Object} res The response object
     */
  static async index(req, res, next) {
    const where = {};
    where[Op.and] = [];
    if (req.query.created_by) {
      where[Op.and].push({
        created_by: req.query.created_by,
      });
    }
    if (req.query.buyer) {
      where[Op.and].push({
        buyer: req.query.buyer,
      });
    }
    if (req.query.seller) {
      where[Op.and].push({
        seller: req.query.seller,
      });
    }
    if (req.query.arbiter) {
      where[Op.and].push({
        arbiter: req.query.arbiter,
      });
    }
    if (req.query.flags) {
      where[Op.and].push({
        flags: req.query.flags,
      });
    }
    if (!where[Op.and].length) {
      delete where[Op.and];
    }

    const limit = req.query.limit ? req.query.limit : 20;
    const offset = req.query.skip ? req.query.skip : 0;
    const order = ['id'];
    try {
      const result = await models.deal
        .findAll({
          where,
          order,
          limit,
          offset,
        });
      res.send(result);
    } catch (err) {
      next(err);
    }
  }

  /**
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @return {Object} res The response object
     */
  static async store(req, res, next) {
    if (!req.body || !req.body.created_by || !req.body.price) {
      return res.status(400).json({
        success: false,
        message: 'created_by price are required.',
      });
    }
    const data = req.body;
    try {
      const result = await models.deal.create({
        created_by: data.created_by,
        description: data.contact_name,
        price: data.price,
        buyer: data.buyer,
        seller: data.seller,
        arbiter: data.arbiter,
        days: data.days,
        funded: data.funded,
        expires: data.expires,
        flags: data.flags,
        delivery_memo: data.delivery_memo,
      });
      return res.send({ success: true, id: result.id });
    } catch (err) {
      return next(err);
    }
  }

  /**
   *
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  static async update(req, res, next) {
    if (!req.params || !req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id is required.',
      });
    }
    try {
      const deal = await models.deal.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!deal) {
        return res.status(404).json({
          success: false,
          message: 'Deal not found.',
        });
      }
      const updateFields = ['created_by', 'description', 'price', 'buyer',
        'seller', 'arbiter', 'days', 'funded', 'expires', 'flags', 'delivery_memo'];
      updateFields.forEach((field) => {
        if (field in req.body) {
          deal.set(field, req.body[field]);
        }
      });
      await deal.save();
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default DealController;
