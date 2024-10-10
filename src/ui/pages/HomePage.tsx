import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { motion } from "framer-motion";
import { CardProducts } from "../components/CardProducts";
import { ProductApi } from "@/infrastructure/api/ProductApi";
import { Product } from "@/domain/entities/Product";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const featuredProducts = [
    {
      id: "1",
      name: "Smartphone XYZ",
      price: 599.99,
      imageUrl:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      name: "Laptop Pro",
      price: 1299.99,
      imageUrl:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      name: "Auriculares Inalámbricos",
      price: 199.99,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const productRepository = new ProductApi();
      setProducts(await productRepository.getAll());
    };

    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="container mx-auto py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section className="mb-12" variants={itemVariants}>
        <h2 className="text-4xl font-bold mb-6">Bienvenido a TechStore</h2>
        <p className="text-xl mb-8">
          Descubre los mejores productos tecnológicos al mejor precio.
        </p>
        <Button asChild className="amazon-button">
          <Link to="/products">Ver todos los productos</Link>
        </Button>
      </motion.section>

      <motion.section className="mb-12" variants={itemVariants}>
        <h3 className="text-3xl font-bold mb-6">Productos Destacados</h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {/* maximo de tres productos */}
          {products.slice(0, 3).map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <CardProducts product={product} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="mb-12" variants={itemVariants}>
        <h3 className="text-3xl font-bold mb-6">¿Por qué elegir TechStore?</h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Calidad Garantizada</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Todos nuestros productos son seleccionados cuidadosamente para
                  asegurar la mejor calidad.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Envío Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Entregamos tu pedido en tiempo récord para que disfrutes de tu
                  nueva tecnología lo antes posible.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Atención al Cliente 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Nuestro equipo de soporte está disponible en todo momento para
                  resolver tus dudas.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;
