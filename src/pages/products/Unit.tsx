import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUnit, deleteUnit } from '@/store/slices/productsSlice';
import PageSubmenu from '@/components/ui/PageSubmenu';
import { productSubmenuItems } from '@/constants/submenuItems';

const Unit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const units = useAppSelector((state) => state.products.units);

  const [formData, setFormData] = useState({ name: '', shortName: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUnit = { id: Date.now(), ...formData };
    dispatch(addUnit(newUnit));
    setFormData({ name: '', shortName: '' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this unit?')) {
      dispatch(deleteUnit(id));
    }
  };

  return (
    <div className="p-6">
      <PageSubmenu items={productSubmenuItems} />

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Units</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Unit</h2>
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
                <label className="block text-sm font-medium text-gray-900 mb-2">Short Name *</label>
                <input
                  type="text"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-gray-900"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors"
              >
                Add Unit
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Short Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {units.map((unit) => (
                  <tr key={unit.id} className="hover:bg-[#4361ee] hover:text-white transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-900 group-hover:text-white">{unit.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-white">{unit.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 group-hover:text-white">{unit.shortName}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button className="text-white bg-[#4361ee] hover:bg-[#3651de] font-medium mr-3 px-3 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(unit.id)} className="text-white font-medium bg-red-600 group-hover:bg-red-700 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
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

export default Unit;
