import { useCartStore } from "../../infrastructure/store/useCartStore";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, Trash2 } from "lucide-react";
import FormatPrecio from "@/lib/FormtPrecio";

const CartPage = () => {
  const { items, removeItem, clearCart, decreaseQuantity, increaseQuantity } =
    useCartStore();

  const totalPrice = items.reduce(
    (total, item) => total + Number(item.product.precio) * item.quantity,
    0
  );

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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="container mx-auto py-8 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 className="text-3xl font-bold mb-6" variants={itemVariants}>
        Tu Carrito
      </motion.h2>
      {items.length === 0 ? (
        <motion.p variants={itemVariants}>Tu carrito está vacío.</motion.p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Resumen del carrito</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Producto</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="w-[50px]">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell>
                        <motion.div
                          className="flex items-center gap-4"
                          variants={itemVariants}
                        >
                          <img
                            src={item.product.imagenes[0]?.imagen}
                            alt={item.product.nombre}
                            className="w-16 h-16 object-contain rounded-lg bg-muted"
                          />
                          <div>
                            <h3 className="font-medium">
                              {item.product.nombre}
                            </h3>
                            <div className="text-sm text-muted-foreground">
                              <span>{item.product.categoria.nombre}</span>
                            </div>
                          </div>
                        </motion.div>
                      </TableCell>
                      <TableCell>
                        <FormatPrecio precio={item.product.precio} />
                      </TableCell>

                      <TableCell>
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center gap-2"
                        >
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => decreaseQuantity(item.product.id)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-12 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => increaseQuantity(item.product.id)}
                            disabled={item.product.stock <= item.quantity}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </motion.div>
                      </TableCell>

                      <TableCell>
                        <FormatPrecio precio={(item.product.precio * item.quantity)} />
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                Total: <FormatPrecio precio={totalPrice} />
              </h3>
            </div>
            <div>
              <Button variant="outline" onClick={clearCart} className="mr-2">
                Vaciar carrito
              </Button>
              <Button>
                <Link to="/checkout" className="amazon-button">
                  Proceder al pago
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  );
};

export default CartPage;
