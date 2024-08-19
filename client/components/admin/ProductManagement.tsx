//@ts-nocheck
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ProductManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gamer Gear Pro Controller",
      description: "High-performance gaming controller",
      price: 99.99,
      inventory: 50,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Ergonomic Desk Chair",
      description: "Comfortable and adjustable office chair",
      price: 249.99,
      inventory: 25,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Wireless Charging Pad",
      description: "Fast and efficient wireless charger",
      price: 49.99,
      inventory: 100,
      image: "/placeholder.svg",
    },
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filter, setFilter] = useState("");

  const handleAddProduct = () => {
    setEditingProduct({
      id: Date.now(),
      name: "",
      description: "",
      price: 0,
      inventory: 0,
      image: "",
    });
    setShowDialog(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowDialog(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSaveProduct = (product) => {
    if (editingProduct.id) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...product } : p)));
    } else {
      setProducts([...products, product]);
    }
    setEditingProduct(null);
    setShowDialog(false);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Filter products"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <Button onClick={handleAddProduct}>Add Product</Button>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <p className="text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mb-4">Inventory: {product.inventory}</p>
              <div className="flex gap-2 mt-auto">
                <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {showDialog && (
        <Dialog>
          <DialogTrigger asChild>
            <div />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingProduct.id ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProduct({
                    id: editingProduct.id,
                    name: e.target.name.value,
                    description: e.target.description.value,
                    price: parseFloat(e.target.price.value),
                    inventory: parseInt(e.target.inventory.value),
                    image: e.target.image.value,
                  });
                }}
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" defaultValue={editingProduct.name} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" defaultValue={editingProduct.description} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" step="0.01" defaultValue={editingProduct.price} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="inventory">Inventory</Label>
                      <Input id="inventory" type="number" defaultValue={editingProduct.inventory} required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" type="text" defaultValue={editingProduct.image} required />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}