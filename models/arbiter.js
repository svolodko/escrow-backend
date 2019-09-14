

/**
 * @swagger
 * definitions:
 *  Arbiter:
 *   type: object
 *   required:
 *   - account
 *   - contact_name
 *   - email
 *   properties:
 *     account:
 *       type: string
 *       example: escrowchris1
 *     network:
 *       type: string
 *       example: eos
 *     contact_name:
 *       type: string
 *       example: Chris
 *     email:
 *       type: string
 *       example: email@domain.com
 *     description:
 *       type: string
 *       example: Blah blah
 *     website:
 *       type: string
 *       example: https://www.example.com
 *     phone:
 *       type: string
 *       example: +123456789334
 *     iso_country:
 *       type: string
 *       example: US
 *     processed_deals:
 *       type: integer
 *       example: 2
 *     is_active:
 *       type: number
 *       example: 1
 */
module.exports = (sequelize, DataTypes) => {
  const Arbiter = sequelize.define('arbiter', {
    account: {
      type: DataTypes.STRING(13),
      primaryKey: true,
    },
    network: DataTypes.STRING,
    contact_name: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    website: DataTypes.STRING,
    phone: DataTypes.STRING,
    iso_country: DataTypes.STRING,
    processed_deals: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER(1),
  }, {});
  Arbiter.associate = () => {
    // associations can be defined here
  };
  Arbiter.removeAttribute('id');
  return Arbiter;
};
