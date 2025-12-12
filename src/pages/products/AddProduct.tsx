import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProduct } from '@/store/slices/productsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import PageHeader from '@/components/ui/PageHeader';
import ProductForm, { type ProductFormData } from '@/components/forms/ProductForm';
import { productSubmenuItems } from '@/constants/submenuItems';

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.products.categories);
  const brands = useAppSelector((state) => state.products.brands);
  const units = useAppSelector((state) => state.products.units);

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    brand: '',
    unit: '',
    barcode: '',
    price: '',
    stock: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      unit: formData.unit,
      barcode: formData.barcode,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };
    dispatch(addProduct(newProduct));
    handleReset();
    navigate('/products/all');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      brand: '',
      unit: '',
      barcode: '',
      price: '',
      stock: '',
      description: '',
    });
  };

  return (
    <div className="p-6">
      <PageSubmenu items={productSubmenuItems} />
      <PageHeader title="Add Product" />
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <ProductForm
          formData={formData}
          onFormDataChange={setFormData}
          categories={categories}
          brands={brands}
          units={units}
          onSubmit={handleSubmit}
          submitButtonText="Add Product"
          showReset
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default AddProduct;
