import FormField from './FormField';

interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  unit: string;
  barcode: string;
  price: string;
  stock: string;
  description?: string;
}

interface ProductFormProps {
  formData: ProductFormData;
  onFormDataChange: (data: ProductFormData) => void;
  categories: { id: number; name: string }[];
  brands: { id: number; name: string }[];
  units: { id: number; name: string; shortName: string }[];
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText?: string;
  showReset?: boolean;
  onReset?: () => void;
}

const ProductForm = ({
  formData,
  onFormDataChange,
  categories,
  brands,
  units,
  onSubmit,
  submitButtonText = 'Submit',
  showReset = false,
  onReset,
}: ProductFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onFormDataChange({ ...formData, [e.target.name]: e.target.value });
  };

  const categoryOptions = categories.map(cat => ({ value: cat.name, label: cat.name }));
  const brandOptions = brands.map(brand => ({ value: brand.name, label: brand.name }));
  const unitOptions = units.map(unit => ({ 
    value: unit.shortName, 
    label: `${unit.name} (${unit.shortName})` 
  }));

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Product Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormField
          label="Category"
          name="category"
          type="select"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          required
        />

        <FormField
          label="Brand"
          name="brand"
          type="select"
          value={formData.brand}
          onChange={handleChange}
          options={brandOptions}
        />

        <FormField
          label="Unit"
          name="unit"
          type="select"
          value={formData.unit}
          onChange={handleChange}
          options={unitOptions}
          required
        />

        <FormField
          label="Barcode"
          name="barcode"
          type="text"
          value={formData.barcode}
          onChange={handleChange}
        />

        <FormField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <FormField
          label="Stock Quantity"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        {formData.description !== undefined && (
          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            className="md:col-span-2"
            rows={4}
          />
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
        >
          {submitButtonText}
        </button>
        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
export type { ProductFormData };
