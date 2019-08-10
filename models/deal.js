/**
 * @swagger
 * definitions:
 *  Deal:
 *   type: object
 *   required:
 *   - created_by
 *   - price
 *   properties:
 *     id:
 *       type: integer
 *       example: 3420116506
 *     created_by:
 *       type: string
 *       example: escrowbob111
 *     description:
 *       type: string
 *     price:
 *       type: object
 *       properties:
 *        quantity: string
 *        contract: string
 *       example:
 *        quantity: 0.1000 VOID
 *        contract: onessusblock
 *     buyer:
 *       type: string
 *     seller:
 *       type: string
 *     arbiter:
 *       type: string
 *     days:
 *       type: integer
 *     funded:
 *       type: string
 *       format: date-time
 *     expires:
 *       type: string
 *       format: date-time
 *     flags:
 *       type: integer
 *     delivery_memo:
 *       type: string
 */
module.exports = (sequelize, DataTypes) => {
  const Deal = sequelize.define('deal', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    created_by: DataTypes.STRING(13),
    description: DataTypes.STRING,
    price: DataTypes.JSON,
    buyer: DataTypes.STRING(13),
    seller: DataTypes.STRING(13),
    arbiter: DataTypes.STRING(13),
    days: DataTypes.INTEGER,
    funded: DataTypes.DATE,
    expires: DataTypes.DATE,
    flags: DataTypes.INTEGER,
    delivery_memo: DataTypes.STRING,
  }, {});

  return Deal;
};
