import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';
import ShowcaseFrame from '~/components/ShowcaseFrame';
import Checkout from '~/examples/showcase/ShowcaseCheckout';
import checkoutCode from '~/examples/showcase/ShowcaseCheckout?raw';
import Profile from '~/examples/showcase/ShowcaseProfile';
import profileCode from '~/examples/showcase/ShowcaseProfile?raw';
import Orders from '~/examples/showcase/ShowcaseOrders';
import ordersCode from '~/examples/showcase/ShowcaseOrders?raw';
import Booking from '~/examples/showcase/ShowcaseBooking';
import bookingCode from '~/examples/showcase/ShowcaseBooking?raw';

// The showcases with their source code. Created once: the markdown overrides must be stable,
// otherwise the showcases are remounted and lose their state
const ShowcaseCheckout: React.FC = () => (
  <ShowcaseFrame code={checkoutCode}>
    <Checkout />
  </ShowcaseFrame>
);

const ShowcaseProfile: React.FC = () => (
  <ShowcaseFrame code={profileCode}>
    <Profile />
  </ShowcaseFrame>
);

const ShowcaseOrders: React.FC = () => (
  <ShowcaseFrame code={ordersCode}>
    <Orders />
  </ShowcaseFrame>
);

const ShowcaseBooking: React.FC = () => (
  <ShowcaseFrame code={bookingCode}>
    <Booking />
  </ShowcaseFrame>
);

const overrides = { ShowcaseCheckout, ShowcaseProfile, ShowcaseOrders, ShowcaseBooking };

const Showcase: React.FC<DocPageProps> = props => <DocPage {...props} overrides={overrides} />;

export default Showcase;
