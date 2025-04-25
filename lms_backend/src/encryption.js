import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); 
const EMAIL_IV = Buffer.from(process.env.EMAIL_IV, 'hex'); 

// Encrypt function
export const encryptData = (text) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, EMAIL_IV); 
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted; 
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);  
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
export const decryptData = (text) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, EMAIL_IV); 
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const encryptDataWithRandomIV = (text) => {
  const iv = crypto.randomBytes(16); 
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv); 
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ":" + encrypted;  
};

export const decryptDataWithRandomIV = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts[0], 'hex'); 
  const encryptedText = Buffer.from(textParts[1], 'hex');  
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv); 
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

