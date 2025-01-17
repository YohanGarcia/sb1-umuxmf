import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

import PayPalForm from "../components/form/PaypalForm";
import FormatPrecio from "@/lib/FormtPrecio";
import { useExchangeStore } from "@/infrastructure/store/useExchangeStore";

const shippingLocations = ["Ciudad A", "Ciudad B", "Ciudad C", "Ciudad D"];

const storeAddress = "Calle Principal 123, Ciudad Central";

const CheckoutPage = () => {
  const { items, clearCart } = useCartStore();
  const { baseCurrency, rates, isLoading, fetchRates } =
    useExchangeStore();


  useEffect(() => {

    fetchRates(baseCurrency);
  }, [items]);


  if (items.length === 0) {
    return <div className="container mx-auto py-8 flex justify-center">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Tu carrito está vacío.</h2>
        <Button asChild>
          <Link to="/products">Ver todos los productos</Link>
        </Button>
      </div>  
    </div>
  }

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [shippingLocation, setShippingLocation] = useState("");

  // total en DOP
  const totalPrice = items.reduce(
    (total, item) => total + Number(item.product.precio) * item.quantity,
    0
  );

  if (isLoading ) {
    return <div>Cargando...</div>;
  }

  // conversion a USD (tasa desde el store)
  const conversionRate = rates["DOP"];
  const totalInUSD = totalPrice / conversionRate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago

    clearCart();
  };

  const cartItens = items.map((items) => ({
    product: items.product,
    quantity: items.quantity,
    totalUSD: totalInUSD,
  }));

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Finalizar Compra</h2>
      <p>precio del dolar</p>
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
                        <FormatPrecio precio={item.product.precio} />
                      </td>
                      <td className="text-right py-2">
                        <FormatPrecio
                          precio={item.product.precio * item.quantity}
                        />
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
                      <FormatPrecio precio={totalPrice} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="text-right font-bold py-2">
                      Total (USD):
                    </td>
                    <td className="text-right font-bold py-2">
                      <FormatPrecio precio={totalInUSD} />
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
                <Select onValueChange={setShippingLocation}       >
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
                  <CardFooter className="space-y-2 col-span-3 ">
                    <div className="w-full ">
                      <span className="text-2xl font-bold mb-4">
                        Total a Pagar:{" "}
                        <p className="text-xl font-bold text-primary">
                          <FormatPrecio precio={totalPrice} />
                        </p>
                      </span>
                      <Button
                        onClick={handleSubmit}
                        className="w-full amazon-button"
                      >
                        Realizar Pago
                      </Button>
                    </div>
                  </CardFooter>
              </div>
            )}

            {paymentMethod === "paypal" && (
              // cargar el componente de paypal
              <div className="w-full pt-5">
                <p className="text-2xl font-bold mb-4 flex items-center gap-2">
                  Total a Pagar:{" "}
                  <span className="text-xl font-bold text-primary">
                    <FormatPrecio precio={totalPrice} />
                  </span>
                </p>
                <PayPalForm cartItems={cartItens} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
