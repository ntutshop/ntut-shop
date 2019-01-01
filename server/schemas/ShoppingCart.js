/**
 * Define a SHOPPING_CART model.
 * This function is used for sequelize.import.
 * @param {Sequelize} sequelize A sequelize from sequelize.
 * @param {DataType} DataTypes Data types defined by sequelize.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('SHOPPING_CART', {
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
    quantity: {
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
    }
  }, {
    tableName: 'SHOPPING_CART'
  })
}
