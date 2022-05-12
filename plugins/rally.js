
import { Rally } from '@rallycommerce/swell';

export default async function ({ store }) {
  store.subscribe(({ payload }) => {
    if (payload?.key === 'cart') {
      const configuration = {
        redirect: true,
        cart: payload.value
      };
      Rally.init('clientId', configuration);
    }
  });
}