const { Model } = require("sequelize");
const Link = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Link.init(
    {
      url: DataTypes.STRING,
      slug: DataTypes.STRING,
      modifiedUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Link"
    }
  );
  return Link;
};

module.exports = Link;
