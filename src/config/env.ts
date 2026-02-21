import 'dotenv/config';

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const env = {
  baseUrl: required('OHRM_BASE_URL'),
  username: required('OHRM_USERNAME'),
  password: required('OHRM_PASSWORD'),
  headless: (process.env.OHRM_HEADLESS ?? 'true').toLowerCase() === 'true',
};