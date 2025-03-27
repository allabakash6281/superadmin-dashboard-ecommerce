
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/ui/DataTable';
import { Edit, Plus, Trash2 } from 'lucide-react';
import DeleteProductDialog from '@/components/products/DeleteProductDialog';
import ProductEditForm from '@/components/products/ProductEditForm';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const initialProducts: Product[] = [
  { id: 'PRD001', name: 'Premium Wireless Headphones', category: 'Electronics', price: 199.99, stock: 45, status: 'in-stock' },
  { id: 'PRD002', name: 'Organic Cotton T-Shirt', category: 'Apparel', price: 29.99, stock: 120, status: 'in-stock' },
  { id: 'PRD003', name: 'Smart Home Hub', category: 'Electronics', price: 149.99, stock: 8, status: 'low-stock' },
  { id: 'PRD004', name: 'Ceramic Coffee Mug', category: 'Home Goods', price: 14.99, stock: 65, status: 'in-stock' },
  { id: 'PRD005', name: 'Fitness Tracker', category: 'Wearables', price: 89.99, stock: 0, status: 'out-of-stock' },
  { id: 'PRD006', name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, stock: 22, status: 'in-stock' },
  { id: 'PRD007', name: 'Leather Wallet', category: 'Accessories', price: 49.99, stock: 30, status: 'in-stock' },
  { id: 'PRD008', name: 'Stainless Steel Water Bottle', category: 'Home Goods', price: 24.99, stock: 5, status: 'low-stock' },
  { id: 'PRD009', name: 'Wireless Charging Pad', category: 'Electronics', price: 39.99, stock: 0, status: 'out-of-stock' },
  { id: 'PRD010', name: 'Yoga Mat', category: 'Fitness', price: 34.99, stock: 18, status: 'in-stock' },
];

const statusStyles = {
  'in-stock': "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  'low-stock': "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500",
  'out-of-stock': "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusText = {
  'in-stock': "In Stock",
  'low-stock': "Low Stock",
  'out-of-stock': "Out of Stock",
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const { toast } = useToast();

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditDrawerOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsAddingProduct(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Add new product
      setProducts([...products, product]);
    }
  };

  const columns = [
    {
      id: 'id',
      header: 'ID',
      cell: (product: Product) => <span className="text-xs font-mono text-muted-foreground">{product.id}</span>,
    },
    {
      id: 'name',
      header: 'Product',
      cell: (product: Product) => (
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-xs text-muted-foreground">{product.category}</p>
        </div>
      ),
    },
    {
      id: 'price',
      header: 'Price',
      cell: (product: Product) => <span className="font-medium">${product.price.toFixed(2)}</span>,
    },
    {
      id: 'stock',
      header: 'Stock',
      cell: (product: Product) => <span>{product.stock}</span>,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (product: Product) => (
        <Badge variant="outline" className={statusStyles[product.status]}>
          {statusText[product.status]}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (product: Product) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => handleEditProduct(product)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive"
            onClick={() => handleDeleteProduct(product)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog.</p>
        </div>
        <Button className="gap-1" onClick={handleAddProduct}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <DataTable data={products} columns={columns} />

      {/* Edit/Add product drawer */}
      <ProductEditForm
        isOpen={isEditDrawerOpen || isAddingProduct}
        onClose={() => {
          setIsEditDrawerOpen(false);
          setIsAddingProduct(false);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
        isNew={isAddingProduct}
      />

      {/* Delete product dialog */}
      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteProduct}
        productName={productToDelete?.name || ''}
      />
    </div>
  );
};

export default Products;
