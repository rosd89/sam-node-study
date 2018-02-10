module.exports = (obj, sequelize) => {
  const name = 'userConnection'
  const model = obj.sequelize.define(name,
    {
      userId: {
        type: sequelize.STRING(45),
        primaryKey: true,
        references: {
          model: this.user,
          key: 'id'
        }
      },
      accessToken: sequelize.CHAR(64),
      expiredTime: sequelize.DATE
    },
    {
      createdAt: false,
      updatedAt: false,
      indexes: [
        {fields: ['accessToken']}
      ]
    })

  obj[name] = model;
}
