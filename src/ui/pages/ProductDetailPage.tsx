import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Producto } from "../../domain/entities/Product";
import { ProductApi } from "../../infrastructure/api/ProductApi";
import { useCartStore } from "../../infrastructure/store/useCartStore";
import { Button } from "../../components/ui/button";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Minus, Plus, Star, StarHalf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import FormatPrecio from "@/lib/FormtPrecio";

const ProductDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Producto | null>(null);

  const { items, addItem, increaseQuantity, decreaseQuantity } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(product?.imagenes[0]);



  const maxQuantity = product?.stock || 0

  useEffect(() => {
    if (product) {
      const cartItem = items.find((item) => item.product.id === product.id);
      setQuantity(cartItem?.quantity || 0); // Actualiza la cantidad según el carrito
    }
  }, [product, items]);

  
  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productRepository = new ProductApi();
          const fetchedProduct = await productRepository.getById(id);
          setProduct(fetchedProduct);
        }
      } catch (error) {
        toast.error("Hubo un problema al cargar el producto.");
      }
    };
    fetchProduct();
  }, [id]);

  

  useEffect(() => {
    if (product && product.imagenes.length > 0) {
      setCurrentImage(product.imagenes[currentImageIndex]); // Establecer la primera imagen
    }
  }, [currentImageIndex, product]);
  if (!product) {
    return <div className="container mx-auto py-8">Cargando...</div>;
  }
  const handleAddToCart = () => {

    // if (product && quantity > 0) {
   
      const newQuantity = + 1;
      addItem({product, quantity:newQuantity });
      toast.success("Producto añadido al carrito");
      setQuantity(1)
    // }
  };

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };


  return (
    <motion.div
      className="container mx-auto px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 ">
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-xl shadow-lg border bg-white w-full h-96 flex justify-center items-center"
          >
            <img
              src={currentImage?.imagen}
              alt={product.nombre}
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            {product.imagenes.map((imagen, index) => (
              <button
                key={imagen.id}
                className={cn(
                  "relative h-20 w-20 overflow-hidden rounded-lg border hover:border-primary",
                  currentImageIndex === index && "border-primary border-2"
                )}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={imagen.imagen}
                  alt={`Imagen del producto ${product.nombre} - Miniatura ${
                    index + 1
                  }`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </motion.div>
        </div>
        <div className="space-y-6 ">
          <motion.div className="space-y-2" variants={itemVariants}>
            <h1 className="text-3xl font-bold">{product.nombre}</h1>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                <Star className="fill-current" size={20} />
                <Star className="fill-current" size={20} />
                <Star className="fill-current" size={20} />
                <Star className="fill-current" size={20} />
                <StarHalf className="fill-current" size={20} />
              </div>
              <span className="text-sm text-muted-foreground">
                (778 Reviews)
              </span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-primary">
                <FormatPrecio precio={product.precio} />
              </p>
              <span className="text-sm text-muted-foreground line-through">
                100.00
              </span>
              <Badge variant="secondary">50% off</Badge>
            </div>
          </motion.div>

          <motion.p variants={itemVariants}>{product.descripcion}</motion.p>

          <motion.div className="space-y-2" variants={itemVariants}>
            <div className="flex items-center justify-between">
              <span className="font-medium">Available:</span>
              <span className="text-green-500">In Stock</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Shipping:</span>
              <span className="text-green-500">Free</span>
            </div>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <span className="font-medium">Cantidad:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decreaseQuantity(product.id)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity  || 0}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => increaseQuantity(product.id)}
                disabled={quantity >= maxQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.stock} Piezas Disponibles
            </span>
          </motion.div>
          <motion.div variants={itemVariants} className="flex gap-4">
            <Button
              className="flex-1 amazon-button"
              size="lg"
            >
              <Link to="/checkout" className="">
                Proceder al pago
              </Link>
            </Button>
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1"
              size="lg"
              disabled={quantity >= maxQuantity}
            >
              Añadir al carrito
            </Button>
          </motion.div>
          <div className="space-y-2 pt-4">
            <div className="flex gap-2">
              <span className="font-medium">Category:</span>
              <Link to="#" className="text-primary hover:underline">
                {product.categoria.nombre}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
