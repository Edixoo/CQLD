const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

const decryptField = (combinedData, secretKey) => {
    // Extract IV and encrypted data
    const iv = Buffer.from(combinedData.slice(0, 32), 'hex');  // IV is 16 bytes, so 32 hex characters
    const encryptedData = combinedData.slice(32);
  
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    return decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8');
  };

const encryptField = (field, secretKey) => {
    const iv = crypto.randomBytes(16);  // Initialization vector of 16 bytes (128 bits)
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    const encryptedData = cipher.update(field, 'utf8', 'hex') + cipher.final('hex');
    return iv.toString('hex') + encryptedData;  // Prepend IV to encrypted data
  };

module.exports = {
    decryptField, 
    encryptField
}