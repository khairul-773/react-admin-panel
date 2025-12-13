import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addProduct } from '@/store/slices/productsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import PageHeader from '@/components/ui/PageHeader';
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
    <div className="p-6">
      <PageSubmenu items={productSubmenuItems} />
      <PageHeader title="Add Product" />
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={() => form.reset()}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
