import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageSubmenu from '@/components/ui/PageSubmenu';
import { productSubmenuItems } from '@/constants/submenuItems';

interface BarcodeItem {
  id: number;
  productName: string;
  barcode: string;
  generatedDate: string;
}

const Barcode = () => {
  const navigate = useNavigate();
  const [barcodes, setBarcodes] = useState<BarcodeItem[]>([
    { id: 1, productName: 'Laptop', barcode: '123456789012', generatedDate: '2024-01-15' },
    { id: 2, productName: 'T-Shirt', barcode: '987654321098', generatedDate: '2024-01-16' },
  ]);

  const [formData, setFormData] = useState({ productName: '', barcode: '' });

  const generateBarcode = () => {
    const randomBarcode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setFormData({ ...formData, barcode: randomBarcode });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBarcode: BarcodeItem = {
      id: barcodes.length + 1,
      ...formData,
      generatedDate: new Date().toISOString().split('T')[0],
    };
    setBarcodes([...barcodes, newBarcode]);
    setFormData({ productName: '', barcode: '' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this barcode?')) {
      setBarcodes(barcodes.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-6">
      <PageSubmenu items={productSubmenuItems} />

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Barcode Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Barcode</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Barcode *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white text-gray-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateBarcode}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#4361ee] text-white rounded-lg hover:bg-[#3651de] transition-colors"
              >
                Save Barcode
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Barcode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {barcodes.map((item) => (
                  <tr key={item.id} className="hover:bg-[#4361ee] hover:text-white transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-900 group-hover:text-white">{item.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-white">{item.productName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 group-hover:text-white font-mono">{item.barcode}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 group-hover:text-white">{item.generatedDate}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button className="text-white bg-[#4361ee] hover:bg-[#3651de] font-medium mr-3 px-3 py-1 rounded">Print</button>
                      <button onClick={() => handleDelete(item.id)} className="text-white font-medium bg-red-600 group-hover:bg-red-700 hover:bg-red-700 px-2 py-1 rounded">Delete</button>
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

export default Barcode;
