import type { SubmenuItem } from '@/components/ui/PageSubmenu';

export const productSubmenuItems: SubmenuItem[] = [
  { label: 'All Products', path: '/products/all' },
  { label: 'Add Category', path: '/products/category' },
  { label: 'Add Brand', path: '/products/brand' },
  { label: 'Add Unit', path: '/products/unit' },
  { label: 'Barcode', path: '/products/barcode' },
];

export const postSubmenuItems: SubmenuItem[] = [
  { label: 'Add Post', path: '/posts/add' },
  { label: 'All Posts', path: '/posts/all' },
];
