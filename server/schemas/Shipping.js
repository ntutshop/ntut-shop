/**
 * Define a SHIPPING model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('SHIPPING', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    service: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    fee: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    good_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'GOOD',
        key: 'id'
      }
    }
  }, {
    tableName: 'SHIPPING'
  })
}
