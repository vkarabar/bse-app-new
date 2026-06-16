import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react';
import Link from 'next/link';
import { PRODUCT_NAV_LINKS } from '@/lib/product-nav-links';

export function NavDropdown() {
  const [allProducts, ...productLinks] = PRODUCT_NAV_LINKS;

  return (
    <Dropdown
      theme={{ floating: { target: 'w-full' } }}
      label="Производи"
      dismissOnClick={true}
    >
      <Link href={allProducts.href}>
        <DropdownItem>
          <span className="font-semibold">{allProducts.label}</span>
        </DropdownItem>
      </Link>
      <div className="border-b-2 border-slate-200 my-1"></div>
      {productLinks.map((item, index) => (
        <div key={item.href}>
          <Link href={item.href}>
            <DropdownItem>{item.label}</DropdownItem>
          </Link>
          {index < productLinks.length - 1 && <DropdownDivider />}
        </div>
      ))}
    </Dropdown>
  );
}
