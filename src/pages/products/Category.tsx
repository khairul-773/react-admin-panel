import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addCategory, deleteCategory } from '@/store/slices/productsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import { productSubmenuItems } from '@/constants/submenuItems';

const Category = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.products.categories);

  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory = { id: Date.now(), ...formData };
    dispatch(addCategory(newCategory));
    setFormData({ name: '', description: '' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="p-6">
      <PageSubmenu items={productSubmenuItems} />

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-gray-900"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors"
              >
                Add Category
              </button>
            </form>
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
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-[#4361ee] hover:text-white transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-900 group-hover:text-white">{category.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-white">{category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 group-hover:text-white">{category.description}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button className="text-white bg-[#4361ee] hover:bg-[#3651de] font-medium mr-3 px-3 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(category.id)} className="text-white font-medium bg-red-600 group-hover:bg-red-700 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
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

export default Category;
