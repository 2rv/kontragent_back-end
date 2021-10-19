import * as config from 'config';

const AWS_CONFIG = config.get('AWS');

export const AwsConfig = {
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY || AWS_CONFIG.SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || AWS_CONFIG.ACCESS_KEY_ID,
  region: process.env.AWS_REGION || AWS_CONFIG.REGION,
  bucket: process.env.AWS_BUCKET_NAME || AWS_CONFIG.BUCKET_NAME,
  acl: process.env.AWS_ACL || AWS_CONFIG.ACL,
};
