import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/domain/entities/Product";
import { useCartStore } from "@/infrastructure/store/useCartStore";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CardProductsProps {
  product: Product;
}


export const CardProducts = ({product}: CardProductsProps) => {
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success("Producto añadido al carrito");
  };

  return (
    <Card className="amazon-card ">
      <CardHeader>
        <img
          src={product.imagenes[0]?.imagen}
          alt={product.nombre}
          className="w-full h-48 object-cover mb-4 rounded-lg "
        />
        <CardTitle>{product.nombre}</CardTitle>
        <CardDescription>{product.precio} </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between mt-auto">
      <Button variant="outline" asChild>
          <Link to={`/products/${product.id}`}>Ver detalles</Link>
        </Button>
        <Button onClick={() => handleAddToCart(product)}>
          <FaShoppingCart className="mr-2" />
          Añadir
        </Button>
      </CardFooter>
    </Card>
  );
};
