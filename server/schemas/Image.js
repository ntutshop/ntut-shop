/**
 * Define a IMAGE model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('IMAGE', {
    good_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'GOOD',
        key: 'id'
      }
    },
    path: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'IMAGE'
  })
}
