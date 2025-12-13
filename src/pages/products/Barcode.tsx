import { useState } from 'react';
import PageSubmenu from '@/components/ui/PageSubmenu';
import Table, { type Column } from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';
import { productSubmenuItems } from '@/constants/submenuItems';
import { MdAdd } from 'react-icons/md';

interface BarcodeItem {
  id: number;
  productName: string;
  barcode: string;
  generatedDate: string;
}

const Barcode = () => {
  const [barcodes, setBarcodes] = useState<BarcodeItem[]>([
    { id: 1, productName: 'Laptop', barcode: '123456789012', generatedDate: '2024-01-15' },
    { id: 2, productName: 'T-Shirt', barcode: '987654321098', generatedDate: '2024-01-16' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this barcode?')) {
      setBarcodes(barcodes.filter(item => item.id !== id));
    }
  };

  const columns: Column<BarcodeItem>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Product Name', accessor: 'productName', className: 'font-semibold text-gray-900 group-hover:text-white' },
    { header: 'Barcode', accessor: 'barcode', className: 'text-gray-700 group-hover:text-white font-mono' },
    { header: 'Date', accessor: 'generatedDate', className: 'text-gray-700 group-hover:text-white' },
  ];

  return (
    <div className="mt-2">
      <PageSubmenu items={productSubmenuItems} />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Barcode Management</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">Generate and manage product barcodes</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-semibold tracking-wide"
          >
            <MdAdd className="text-lg" />
            Add Barcode
          </button>
        </div>
        <Table
          columns={columns}
          data={barcodes}
          onDelete={handleDelete}
          emptyMessage="No barcodes found."
          enableSearch={true}
          enableSort={true}
          enableDateFilter={false}
          dateColumns={[]}
        />
      </div>

      {/* Add Barcode Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({ productName: '', barcode: '' });
        }}
        title="Generate New Barcode"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wide">Product Name *</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2 tracking-wide">Barcode *</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 text-sm font-mono"
                required
              />
              <button
                type="button"
                onClick={generateBarcode}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold tracking-wide"
              >
                Generate
              </button>
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setFormData({ productName: '', barcode: '' });
              }}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold tracking-wide"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-semibold tracking-wide"
            >
              Save Barcode
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Barcode;
