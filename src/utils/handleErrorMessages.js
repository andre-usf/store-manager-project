const typeErrorReplace = (error) => error.details[0].type.toUpperCase().replace('.', '_');

const errorMessage = (error) => error.details[0].message;

module.exports = {
  typeErrorReplace,
  errorMessage,
};
