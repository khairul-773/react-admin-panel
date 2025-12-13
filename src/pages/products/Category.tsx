import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addCategory, deleteCategory } from '@/store/slices/productsSlice';
import type { Category } from '@/types';
import PageSubmenu from '@/components/ui/PageSubmenu';
import Table, { type Column } from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';
import FormInput from '@/components/forms/FormInput';
import { nameSchema, type NameFormInputs } from '@/schemas/validationSchemas';
import { productSubmenuItems } from '@/constants/submenuItems';
import { MdAdd } from 'react-icons/md';

const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.products.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<NameFormInputs>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (data: NameFormInputs) => {
    const newCategory = { id: Date.now(), ...data, description: '' };
    dispatch(addCategory(newCategory));
    form.reset();
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  const columns: Column<Category>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name', className: 'font-semibold text-gray-900 group-hover:text-white' },
    { header: 'Description', accessor: 'description', className: 'text-gray-700 group-hover:text-white' },
  ];

  return (
    <div className="mt-2">
      <PageSubmenu items={productSubmenuItems} />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Product Categories</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">Manage product categories</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-semibold tracking-wide"
          >
            <MdAdd className="text-lg" />
            Add Category
          </button>
        </div>
        <Table
          columns={columns}
          data={categories}
          onDelete={handleDelete}
          emptyMessage="No categories found."
          enableSearch={true}
          enableSort={true}
          enableDateFilter={false}
          dateColumns={[]}
        />
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          form.reset();
        }}
        title="Add New Category"
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            label="Category Name"
            name="name"
            type="text"
            placeholder="Enter category name"
            form={form}
            required
          />
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                form.reset();
              }}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold tracking-wide"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-semibold tracking-wide"
            >
              Add Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Category;
