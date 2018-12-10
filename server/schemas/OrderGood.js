/**
 * Define a ORDER_GOOD model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('ORDER_GOOD', {
    good_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'GOOD',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ORDERS',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'ORDER_GOOD'
  })
}
