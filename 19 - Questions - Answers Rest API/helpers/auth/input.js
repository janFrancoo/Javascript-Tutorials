const bcrypt = require('bcrypt');

const validateUserInput = (email, pwd) => {
    return email && pwd;
};

const comparePwds = (pwd1, pwd2) => {
    return bcrypt.compareSync(pwd1, pwd2);
}

module.exports = {
    validateUserInput,
    comparePwds
}