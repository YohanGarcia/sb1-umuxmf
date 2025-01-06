import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ProductApi } from "../../infrastructure/api/ProductApi";
import { useExchangeStore } from "@/infrastructure/store/useExchangeStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  const { baseCurrency, rates, error, isLoading, fetchRates } =
    useExchangeStore();

  const handleCurrencyChange = (value: string) => {
    fetchRates(value); // Cambia la moneda base
  };

  useEffect(() => {
    const fetchData = async () => {
      const productApi = new ProductApi();
      const products = await productApi.getAll();
      setTotalProducts(products.length);
      const categories = new Set(products.map((p) => p.categoria));
      setTotalCategories(categories.size);
    };
    fetchRates(baseCurrency);
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total de Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalCategories}</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversión de Monedas</CardTitle>
              <CardDescription>
                <p className="text-sm text-muted-foreground">
                  Monenda Base {baseCurrency}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <Select
                    value={baseCurrency}
                    onValueChange={handleCurrencyChange}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Selecciona una moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(rates).map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                      {/* Agrega más opciones según sea necesario */}
                    </SelectContent>
                  </Select>
                  <p className="text-ls font-bold pt-5">DOP: {rates["DOP"]}</p>
               
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
