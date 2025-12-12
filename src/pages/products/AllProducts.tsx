import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteProduct, updateProduct } from '@/store/slices/productsSlice';
import type { Product } from '@/types';
import Modal from '@/components/ui/Modal';
import PageSubmenu from '@/components/ui/PageSubmenu';
import PageHeader from '@/components/ui/PageHeader';
import Table, { type Column } from '@/components/ui/Table';
import ProductForm, { type ProductFormData } from '@/components/forms/ProductForm';
import { productSubmenuItems } from '@/constants/submenuItems';

const AllProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const categories = useAppSelector((state) => state.products.categories);
  const brands = useAppSelector((state) => state.products.brands);
  const units = useAppSelector((state) => state.products.units);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    brand: '',
    unit: '',
    barcode: '',
    price: '',
    stock: '',
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
    setFormData({
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

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    
    const updatedProduct: Product = {
      ...currentProduct,
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      unit: formData.unit,
      barcode: formData.barcode,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
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
          }}
          title="Edit Product"
        >
          <ProductForm
            formData={formData}
            onFormDataChange={setFormData}
            categories={categories}
            brands={brands}
            units={units}
            onSubmit={handleUpdate}
            submitButtonText="Update Product"
          />
        </Modal>
      )}
    </div>
  );
};

export default AllProducts;


