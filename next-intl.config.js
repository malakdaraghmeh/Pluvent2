import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  if (!locale) locale = 'en';
  const messages = (await import(`./src/messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
