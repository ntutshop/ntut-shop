/**
 * Define a RATE model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('RATE', {
    source_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'MEMBER',
        key: 'id'
      }
    },
    target_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'MEMBER',
        key: 'id'
      }
    },
    stars: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'RATE'
  })
}
