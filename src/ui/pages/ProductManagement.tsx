import { useState, useEffect } from 'react';
import { Product } from '../../domain/entities/Product';
import { ProductApi } from '../../infrastructure/api/ProductApi';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    nombre: '',
    description: '',
    precio: 0,
    categoria: '',
    imageUrl: '',
  });

  const productApi = new ProductApi();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await productApi.getAll();
    setProducts(fetchedProducts);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddProduct = async () => {
    if (newProduct.nombre && newProduct.precio && newProduct.categoria) {
      await productApi.add(newProduct as Product);
      fetchProducts();
      setNewProduct({
        nombre: '',
        description: '',
        precio: 0,
        categoria: '',
        imageUrl: '',
      });
    } else {
      alert(
        'Por favor, complete al menos el nombre, precio y categoría del producto.'
      );
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await productApi.delete(id);
    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Gestión de Productos</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Añadir Nuevo Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="nombre"
              value={newProduct.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del producto"
              required
            />
            <Input
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Descripción"
            />
            <Input
              name="price"
              type="number"
              value={newProduct.precio}
              onChange={handleInputChange}
              placeholder="Precio"
              required
              min="0"
              step="0.01"
            />
            <Input
              name="category"
              value={newProduct.categoria}
              onChange={handleInputChange}
              placeholder="Categoría"
              required
            />
            <Input
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
              placeholder="URL de la imagen"
            />
          </div>
          <Button onClick={handleAddProduct} className="mt-4">
            Añadir Producto
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>imagen</TableHead>

                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img src={product.imageUrl} className="h-20 w-20" />
                  </TableCell>

                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {typeof product.price === 'number'
                      ? product.price.toFixed(2)
                      : '0.00'}{' '}
                    €
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
