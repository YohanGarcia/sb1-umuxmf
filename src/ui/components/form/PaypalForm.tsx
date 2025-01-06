import { Producto } from "@/domain/entities/Product";
import api from "@/infrastructure/api/Api";
import { useExchangeStore } from "@/infrastructure/store/useExchangeStore";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useState } from "react";
import toast from "react-hot-toast";
import AlertaPago from "../AlertaPago";

interface OrderData {
  id: string;
  details?: Array<{
    issue: string;
    description: string;
  }>;
  debug_id?: string;
}

interface CartItem {
  product: Producto;
  quantity: number; // Cantidad de ese producto
  totalUSD: number; // Precio en USD
}

interface PayPalFormProps {
  cartItems: Array<CartItem>;
}

const API_URL = import.meta.env.VITE_API_URL;

// Renders errors or successfull transactions on the screen.
function Message({ content }: { content: string }) {
  return <p>{content}</p>;
}

const PayPalForm: React.FC<PayPalFormProps> = ({ cartItems }) => {
  const [isPagoExitoso, setIsPagoExitoso] = useState(false);

  const { rates } = useExchangeStore();

  const [message, setMessage] = useState("");

  const conversionRate = rates["DOP"];
  if (!conversionRate) {
    toast.error("No se pudo obtener la tasa de cambio. Intente nuevamente.");
    return;
  }

  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }

  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "rect",
    layout: "vertical",
    borderRadius: 5,
    label: "paypal",
    color: "silver",
    height: 45,
  };

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    const items = cartItems.map((item) => {
      const priceDOP = item.product.precio; // Precio en DOP
      const rate = conversionRate; // Tasa de conversión
      const priceUSD = priceDOP / rate; // Precio convertido

      return {
        name: item.product.nombre,
        description: item.product.descripcion,
        unit_amount: {
          currency_code: "USD",
          value: priceUSD,
        },
        quantity: item.quantity.toString(),
        category: "PHYSICAL_GOODS",
        producto: { ...item.product },
      };
    });

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          items,
          amount: {
            currency_code: "USD",
            value: cartItems[0].totalUSD * 1.0,
          },
        },
      ],
    };

    try {
      const response = await api.post(`${API_URL}/orders/`, orderPayload);

      const orderData: OrderData = response.data;

      if (!orderData.id) {
        const errorDetail = orderData.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      return orderData.id;
    } catch (error) {
      console.error(error);
      setMessage(`No se pudo iniciar el pago con PayPal: ${error}`);
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    try {
      const response = await api.post(`${API_URL}/orders/capture/`, {
        orderID: data.orderID,
      });

      const orderData = await response.data;
      console.log(orderData);

      if (orderData.status !== "COMPLETED") {
        toast.error("La transacción no se ha completado correctamente");
        throw new Error("La transacción no se ha completado correctamente");
      }
      // Show success message to buyer
      setIsPagoExitoso(true);
      toast.success(
        `Tranferecia completada exitosamente por ${orderData.payer.name.given_name}`
      );
    } catch (error) {
      console.error(error);
      setMessage(`No se pudo completar la transacción: ${error}`);
      throw error;
    }
  };

  const [{ isPending }] = usePayPalScriptReducer();

  const displayOndly: PayPalButtonsComponentProps["displayOnly"] = [
    "vaultable",
  ];

  return (
    <div className="App">
      {isPending && <div className="spinner">Processing your payment...</div>}
      <div className="z-10">
        <PayPalButtons
          style={styles}
          createOrder={createOrder}
          onApprove={onApprove}
          displayOnly={displayOndly}
          //   onError={(err) => {
          //     // redirect to your specific error page
          //     window.location.assign("/your-error-page-here");
          // }}
        />
        <Message content={message} />
      </div>

      {/* Renderiza AlertaPago cuando el pago es exitoso */}
      {/* {isPagoExitoso && ( */}
      <div className="z-20">
        <AlertaPago
          isOpen={isPagoExitoso}
          onClose={() => setIsPagoExitoso(false)}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default PayPalForm;
