import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addBrand, deleteBrand } from '@/store/slices/productsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import FormInput from '@/components/forms/FormInput';
import { nameSchema, type NameFormInputs } from '@/schemas/validationSchemas';
import { productSubmenuItems } from '@/constants/submenuItems';

const Brand = () => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.products.brands);

  const form = useForm<NameFormInputs>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (data: NameFormInputs) => {
    const newBrand = { id: Date.now(), ...data, description: '' };
    dispatch(addBrand(newBrand));
    form.reset();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this brand?')) {
      dispatch(deleteBrand(id));
    }
  };

  return (
    <div className="p-6">
      <PageSubmenu items={productSubmenuItems} />

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Brands</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Add Brand</h2>
            </div>
            <div className="p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                  label="Brand Name"
                  name="name"
                  type="text"
                  placeholder="Enter brand name"
                  form={form}
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
                >
                  Add Brand
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {brands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-indigo-600 hover:text-white transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-900 group-hover:text-white">{brand.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-white">{brand.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 group-hover:text-white">{brand.description}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button className="text-white bg-indigo-600 hover:bg-indigo-500 font-medium mr-3 px-3 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(brand.id)} className="text-white font-medium bg-red-600 group-hover:bg-red-700 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
