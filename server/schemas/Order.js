/**
 * Define a ORDERS model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('ORDER', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    member_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'MEMBER',
        key: 'id'
      }
    },
    shipping_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'SHIPPING',
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'PAYMENT',
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
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    transaction_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'ORDER'
  })
}
