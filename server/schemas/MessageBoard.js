/**
 * Define a MESSAGE_BOARD model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('MESSAGE_BOARD', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    source_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'MEMBER',
        key: 'id'
      }
    },
    good_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'GOOD',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.STRING(800),
      allowNull: false
    }
  }, {
    tableName: 'MESSAGE_BOARD'
  })
}
