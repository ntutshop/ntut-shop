/**
 * Define a Member model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('MEMBER', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    authority: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    certificated: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    permission: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    register_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'MEMBER'
  })
}
