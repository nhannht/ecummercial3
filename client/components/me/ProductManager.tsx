
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


export default function Component() {
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
  ])
  const [showDialog, setShowDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const handleAddProduct = () => {
    setEditingProduct({
      id: Date.now(),
      name: "",
      description: "",
      price: 0,
      inventory: 0,
      image: "",
    })
    setShowDialog(true)
  }
  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowDialog(true)
  }
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }
  const handleSaveProduct = (product) => {
    if (editingProduct.id) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...product } : p)))
    } else {
      setProducts([...products, product])
    }
    setEditingProduct(null)
    setShowDialog(false)
  }
  return (
    <div className="flex flex-col h-full">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button onClick={handleAddProduct}>Add Product</Button>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src="/placeholder.svg"
                    alt={product.name}
                    width={64}
                    height={64}
                    className="aspect-square rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.inventory}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
                  e.preventDefault()
                  handleSaveProduct({
                    id: editingProduct.id,
                    name: e.target.name.value,
                    description: e.target.description.value,
                    price: parseFloat(e.target.price.value),
                    inventory: parseInt(e.target.inventory.value),
                    image: e.target.image.value,
                  })
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
                  <div>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </div>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}