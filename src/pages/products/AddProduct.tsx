import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProduct } from '@/store/slices/productsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import FormInput from '@/components/forms/FormInput';
import { productSchema, type ProductFormInputs } from '@/schemas/validationSchemas';
import { productSubmenuItems } from '@/constants/submenuItems';

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.products.categories);
  const brands = useAppSelector((state) => state.products.brands);
  const units = useAppSelector((state) => state.products.units);

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
      description: '',
    },
  });

  const onSubmit = (data: ProductFormInputs) => {
    const newProduct = {
      id: Date.now(),
      name: data.name,
      category: data.category,
      brand: data.brand || '',
      unit: data.unit,
      barcode: data.barcode || '',
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      createdAt: new Date().toISOString(),
    };
    dispatch(addProduct(newProduct));
    form.reset();
    navigate('/products/all');
  };

  const categoryOptions = categories.map(cat => ({ value: cat.name, label: cat.name }));
  const brandOptions = brands.map(brand => ({ value: brand.name, label: brand.name }));
  const unitOptions = units.map(unit => ({ 
    value: unit.shortName, 
    label: `${unit.name} (${unit.shortName})` 
  }));

  return (
    <div className="mt-2">
      <PageSubmenu items={productSubmenuItems} />
      
      {/* Main Card with Header and Form */}
      <div className="mt-3 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Add Product</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">Fill in the details to add a new product</p>
        </div>
        
        {/* Form Section */}
        <div className="p-4 sm:p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <FormInput
                label="Product Name"
                name="name"
                type="text"
                placeholder="Enter product name"
                form={form}
                required
              />

              <FormInput
                label="Category"
                name="category"
                type="select"
                options={categoryOptions}
                form={form}
                required
              />

              <FormInput
                label="Brand"
                name="brand"
                type="select"
                options={brandOptions}
                form={form}
              />

              <FormInput
                label="Unit"
                name="unit"
                type="select"
                options={unitOptions}
                form={form}
                required
              />

              <FormInput
                label="Barcode"
                name="barcode"
                type="text"
                placeholder="Enter barcode"
                form={form}
              />

              <FormInput
                label="Price"
                name="price"
                type="number"
                placeholder="0.00"
                form={form}
                required
              />

              <FormInput
                label="Stock Quantity"
                name="stock"
                type="number"
                placeholder="0"
                form={form}
                required
              />

              <FormInput
                label="Description"
                name="description"
                type="textarea"
                placeholder="Product description (optional)"
                rows={4}
                className="md:col-span-2"
                form={form}
              />
            </div>

            {/* Footer Section */}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-semibold tracking-wide"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => form.reset()}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold tracking-wide"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
