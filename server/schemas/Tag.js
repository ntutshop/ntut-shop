/**
 * Define a TAG model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('TAG', {
    good_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'GOOD',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'TAG'
  })
}
