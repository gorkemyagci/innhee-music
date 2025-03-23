import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['us', 'zh'],
  defaultLocale: 'zh',
  localePrefix: 'as-needed' as const
});

export type Locale = (typeof routing.locales)[number];