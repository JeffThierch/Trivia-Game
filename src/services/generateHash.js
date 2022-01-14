import md5 from 'crypto-js/md5';

const generateHash = (userEmail) => {
  const userEmailHash = md5(userEmail).toString();
  return userEmailHash;
};

export default generateHash;
