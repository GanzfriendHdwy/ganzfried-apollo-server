const db = require("./models");
const { Link } = db;

const generateSlug = () => {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
  var slug = "";
  const randIdx = () => Math.floor(Math.random() * chars.length);
  for (var i = 0; i < 4; i++) {
    slug += chars[randIdx()];
  }
  return slug;
};

const isNewSlug = async (slug) => {
  const isUsed = await Link.findOne({
    where: { slug }
  });
  console.log(isUsed);
  return isUsed ? false : true;
};

const verifySlug = (slug) => {
  /* TODO: if slug is valid but not new, append a random mini-slug and check again for uniqueness */
  const regexExp = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/g;
  const generatedSlug = generateSlug();
  return regexExp.test(slug) && isNewSlug(slug)
    ? slug
    : verifySlug(generatedSlug);
};

/* I could build modifyUrl out more if we wanted to make the urls more unique */
// const modifyUrl = (url, slug) => {
//   // ex: https://sequelize.org/master/class/lib/model.js~Model.html
//   // modified ex: https://hdwy.link/slug
//   return `https://hdwy.link/${slug}`;
// };

module.exports = { generateSlug, isNewSlug, verifySlug };
