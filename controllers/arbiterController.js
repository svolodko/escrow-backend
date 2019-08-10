import models from '../models';

const { Op } = models.Sequelize;

class ArbiterController {
  /**
     *
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @return {Object} res The response object
     */
  static async index(req, res, next) {
    const where = {};
    where[Op.or] = [];
    if (req.query.searchString) {
      where[Op.or].push({
        account: {
          [Op.like]: `%${req.query.searchString}%`,
        },
      });
      where[Op.or].push({
        contact_name: {
          [Op.like]: `%${req.query.searchString}%`,
        },
      });
      where[Op.or].push({
        description: {
          [Op.like]: `%${req.query.searchString}%`,
        },
      });
      where[Op.or].push({
        phone: {
          [Op.like]: `%${req.query.searchString}%`,
        },
      });
      where[Op.or].push({
        iso_country: {
          [Op.like]: `%${req.query.searchString}%`,
        },
      });
    }
    if (!where[Op.or].length) {
      delete where[Op.or];
    }

    const limit = req.query.limit ? req.query.limit : 20;
    const offset = req.query.skip ? req.query.skip : 0;
    const order = ['account'];
    try {
      const result = await models.arbiter
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
    if (!req.body || !req.body.account || !req.body.contact_name || !req.body.email) {
      return res.status(400).json({
        success: false,
        message: 'account, contact_name and email are required.',
      });
    }
    const data = req.body;
    try {
      await models.arbiter.create({
        account: data.account,
        contact_name: data.contact_name,
        email: data.email,
        description: data.description,
        website: data.website,
        phone: data.phone,
        iso_country: data.iso_country,
        processed_deals: data.processed_deals || 0,
        is_active: data.is_active || 1,
      });
      return res.send({ success: true });
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
    if (!req.params || !req.params.account) {
      return res.status(400).json({
        success: false,
        message: 'Account is required.',
      });
    }
    try {
      const arbiter = await models.arbiter.findOne({
        where: {
          account: req.params.account,
        },
      });
      if (!arbiter) {
        return res.status(404).json({
          success: false,
          message: 'Arbiter not found.',
        });
      }
      const updateFields = ['contact_name', 'email', 'description',
        'website', 'phone', 'iso_country', 'processed_deals', 'is_active'];
      updateFields.forEach((field) => {
        if (field in req.body) {
          arbiter.set(field, req.body[field]);
        }
      });
      await arbiter.save();
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default ArbiterController;
