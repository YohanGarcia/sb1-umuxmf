import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Producto } from "@/domain/entities/Product";
import { useCartStore } from "@/infrastructure/store/useCartStore";
import FormatPrecio from "@/lib/FormtPrecio";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CardProductsProps {
  product: Producto;
}

export const CardProducts = ({ product }: CardProductsProps) => {
  const { addItem, items } = useCartStore();

  const handleAddToCart = (product: Producto) => {
    const item = {
      product, // El producto completo
      quantity: 1, // Cantidad inicial
    };
    addItem(item); // Pasa un CartItem a la store
    toast.success("Producto añadido al carrito");
  };

  // Busca si el producto ya está en el carrito y suma sus cantidades
  const currentCartQuantity =
    items.find((item) => item.product.id === product.id)?.quantity || 0;

  return (
    <Card className="amazon-card ">
      <CardHeader>
        <img
          src={product.imagenes[0]?.imagen}
          alt={product.nombre}
          className="w-full h-48 object-cover mb-4 rounded-lg "
        />
        <CardTitle>{product.nombre}</CardTitle>
        <CardDescription>
        <span className="text-xl font-bold text-primary">
          <FormatPrecio precio={product.precio} />
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between mt-auto">
        <Button variant="outline" asChild>
          <Link to={`/products/${product.id}`}>Ver detalles</Link>
        </Button>
        <Button
          onClick={() => handleAddToCart(product)}
          disabled={currentCartQuantity >= product.stock}
        >
          <FaShoppingCart className="mr-2" />
          {currentCartQuantity >= product.stock ? "Agotado" : "Añadir"}
        </Button>
      </CardFooter>
    </Card>
  );
};
