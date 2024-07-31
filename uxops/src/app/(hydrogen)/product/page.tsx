import Product from '@/app/shared/product';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CartTemplate from '@/app/shared/ecommerce/cart';
// import { metaObject } from '@/config/site.config';

// export const metadata = {
//   ...metaObject('Cart'),
// };

const pageHeader = {
  title: 'Product',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      href: routes.product,
      name: 'Product',
    },
  ],
};

export default function ProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Product />
    </>
  );
}
