import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../infrastructure/store/useCartStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Banknote,
  CreditCard,
  MapPin,
  ShoppingCart,
  Truck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: "Producto 1", price: 19.99, quantity: 2 },
  { id: 2, name: "Producto 2", price: 29.99, quantity: 1 },
  { id: 3, name: "Producto 3", price: 39.99, quantity: 3 },
];

const shippingLocations = ["Ciudad A", "Ciudad B", "Ciudad C", "Ciudad D"];

const storeAddress = "Calle Principal 123, Ciudad Central";

const CheckoutPage = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate("/products");
    }
  }, [items]);

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [shippingLocation, setShippingLocation] = useState("");

  const totalPrice = items.reduce(
    (total, item) => total + Number(item.product.precio) * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago

    clearCart();
    navigate("/confirmation");
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Finalizar Compra</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Id</th>
                    <th className="text-left pb-2">Producto</th>
                    <th className="text-center pb-2">Cantidad</th>
                    <th className="text-right pb-2">Precio</th>
                    <th className="text-right pb-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.product.id} className="border-b">
                      <td className="py-2"># {item.product.id}</td>
                      <td className="py-2">{item.product.nombre}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-right py-2">
                        {(item.product.precio * item.quantity).toFixed(2)}{" "}
                      </td>
                      <td className="text-right py-2">
                        {(item.product.precio * item.quantity).toFixed(2)}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td colSpan={4} className="text-right font-bold py-2">
                      Total:
                    </td>
                    <td className="text-right font-bold py-2">
                      {totalPrice.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-3 md:col-span-1 ">
          <CardHeader>
            <CardTitle>Detalles de Envío</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Delivery Method */}
            <div className="space-y-4">
              <Label
                htmlFor="delivery-method"
                className="text-lg font-semibold text-gray-700"
              >
                Método de Entrega
              </Label>
              <RadioGroup
                id="delivery-method"
                defaultValue="pickup"
                onValueChange={setDeliveryMethod}
                className="grid grid-cols-1 md:grid-cols-1 gap-4"
              >
                <Label
                  htmlFor="pickup"
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                    deliveryMethod === "pickup"
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem value="pickup" id="pickup" />
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    Recogida en la Tienda
                  </span>
                </Label>
                <Label
                  htmlFor="shipping"
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                    deliveryMethod === "shipping"
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem value="shipping" id="shipping" />
                  <Truck className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    Enviar a Dirección
                  </span>
                </Label>
              </RadioGroup>
            </div>

            {/* Delivery Information */}
            {deliveryMethod === "pickup" ? (
              <div className="space-y-2 pt-5">
                <span className="text-gray-600">Dirección de la tienda::</span>
                <p className="text-gray-600">{storeAddress}</p>
              </div>
            ) : (
              <div className="space-y-4 pt-5">
                <Label
                  htmlFor="shipping-location"
                  className="text-sm font-medium text-gray-700"
                >
                  {/* Select Shipping Location */}
                  <span className="text-gray-600">
                    Seleccione una ubicación:
                  </span>
                </Label>
                <Select onValueChange={setShippingLocation}>
                  <SelectTrigger id="shipping-location">
                    <SelectValue placeholder="Choose a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {shippingLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-2 ">
          <CardHeader>
            <CardTitle>Detalles de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Payment Method */}
            <div className="space-y-4">
              <Label
                htmlFor="payment-method"
                className="text-lg font-semibold text-gray-700"
              >
                Método de Pago
              </Label>
              <RadioGroup
                id="payment-method"
                defaultValue="credit-card"
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  {
                    value: "credit-card",
                    label: "Tarjeta de Crédito",
                    icon: CreditCard,
                  },
                  { value: "paypal", label: "PayPal", icon: ShoppingCart },
                ].map(({ value, label, icon: Icon }) => (
                  <Label
                    key={value}
                    htmlFor={value}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === value
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <RadioGroupItem value={value} id={value} />
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Payment Details */}
            {paymentMethod === "credit-card" && (
              <div className="space-y-4 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="card-number"
                      className="text-sm font-medium text-gray-700"
                    >
                      Número de Tarjeta
                    </Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="card-name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nombre en la Tarjeta
                    </Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-1">
                    <Label
                      htmlFor="expiry-month"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mes de Vencimiento
                    </Label>
                    <Select>
                      <SelectTrigger id="expiry-month">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <SelectItem
                              key={month}
                              value={month.toString().padStart(2, "0")}
                            >
                              {month.toString().padStart(2, "0")}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-1">
                    <Label
                      htmlFor="expiry-year"
                      className="text-sm font-medium text-gray-700"
                    >
                      Año de Vencimiento
                    </Label>
                    <Select>
                      <SelectTrigger id="expiry-year">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          { length: 10 },
                          (_, i) => new Date().getFullYear() + i
                        ).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label
                      htmlFor="cvv"
                      className="text-sm font-medium text-gray-700"
                    >
                      CVV
                    </Label>
                    <Input id="cvv" placeholder="123" className="w-full" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="space-y-4">
                <p className="text-gray-600 pt-5">
                  Será redirigido a PayPal para completar su pago.
                </p>
                <div className="space-y-2">
                  <Label
                    htmlFor="paypal-email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Correo electrónico de PayPa
                  </Label>
                  <Input
                    id="paypal-email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <p className="text-2xl font-bold mb-4">
                Total a Pagar: {totalPrice.toFixed(2)} €
              </p>
              <Button onClick={handleSubmit} className="w-full amazon-button">
                Realizar Pago
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
