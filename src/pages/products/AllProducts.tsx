import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteProduct, updateProduct } from '@/store/slices/productsSlice';
import type { Product } from '@/types';
import Modal from '@/components/ui/Modal';
import PageSubmenu from '@/components/ui/PageSubmenu';
import PageHeader from '@/components/ui/PageHeader';
import Table, { type Column } from '@/components/ui/Table';
import FormInput from '@/components/forms/FormInput';
import { productSchema, type ProductFormInputs } from '@/schemas/validationSchemas';
import { productSubmenuItems } from '@/constants/submenuItems';

const AllProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const categories = useAppSelector((state) => state.products.categories);
  const brands = useAppSelector((state) => state.products.brands);
  const units = useAppSelector((state) => state.products.units);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      brand: '',
      unit: '',
      barcode: '',
      price: '',
      stock: '',
    },
  });

  const columns: Column<Product>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name', className: 'font-medium text-gray-900 group-hover:text-white' },
    { header: 'Category', accessor: 'category', className: 'text-gray-700 group-hover:text-white' },
    { header: 'Brand', accessor: 'brand', className: 'text-gray-700 group-hover:text-white' },
    { header: 'Unit', accessor: 'unit', className: 'text-gray-700 group-hover:text-white' },
    { header: 'Barcode', accessor: 'barcode', className: 'text-gray-700 group-hover:text-white' },
    { header: 'Price', accessor: (product) => `৳${product.price}`, className: 'text-gray-900 group-hover:text-white' },
    { header: 'Stock', accessor: 'stock', className: 'text-gray-900 group-hover:text-white' },
  ];

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    form.reset({
      name: product.name,
      category: product.category,
      brand: product.brand,
      unit: product.unit,
      barcode: product.barcode,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsModalOpen(true);
  };

  const handleUpdate = (data: ProductFormInputs) => {
    if (!currentProduct) return;
    
    const updatedProduct: Product = {
      ...currentProduct,
      name: data.name,
      category: data.category,
      brand: data.brand || '',
      unit: data.unit,
      barcode: data.barcode || '',
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
    };
    
    dispatch(updateProduct(updatedProduct));
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="p-6">
      <PageSubmenu items={productSubmenuItems} />
      <PageHeader 
        title="All Products" 
        buttonText="+ Add New"
        buttonPath="/products/add"
      />

      <Table
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage='No products found. Click "+ Add New" to create one.'
      />

      {/* Edit Modal */}
      {isModalOpen && currentProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentProduct(null);
            form.reset();
          }}
          title="Edit Product"
        >
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Product Name"
                name="name"
                type="text"
                form={form}
                required
              />

              <FormInput
                label="Category"
                name="category"
                type="select"
                options={categories.map(cat => ({ value: cat.name, label: cat.name }))}
                form={form}
                required
              />

              <FormInput
                label="Brand"
                name="brand"
                type="select"
                options={brands.map(brand => ({ value: brand.name, label: brand.name }))}
                form={form}
              />

              <FormInput
                label="Unit"
                name="unit"
                type="select"
                options={units.map(unit => ({ value: unit.shortName, label: `${unit.name} (${unit.shortName})` }))}
                form={form}
                required
              />

              <FormInput
                label="Barcode"
                name="barcode"
                type="text"
                form={form}
              />

              <FormInput
                label="Price"
                name="price"
                type="number"
                form={form}
                required
              />

              <FormInput
                label="Stock Quantity"
                name="stock"
                type="number"
                form={form}
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentProduct(null);
                  form.reset();
                }}
                className="px-4 py-2 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors"
              >
                Update Product
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AllProducts;


