const crypto = require("crypto");
const secretkey = "canvasconfig";
encrypt = password => {
    hmac = crypto
        .createHmac("sha256", secretkey)
        .update(password)
        .digest("hex");
    return hmac;
};

module.exports = encrypt;
