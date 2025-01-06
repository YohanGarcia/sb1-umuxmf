import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/infrastructure/store/useCartStore";

interface AlertaPagoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertaPago({ isOpen, onClose }: AlertaPagoProps) {
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  const handleContinueShopping = () => {
    onClose()
    clearCart();
    navigate("/products");
  };

  const handleViewOrders = () => {
    onClose();
    clearCart();
    navigate("/profile");
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />          
            Pago Procesado con Éxito
          </DialogTitle>
          <DialogDescription>
            Tu pago ha sido procesado correctamente. ¿Qué te gustaría hacer
            ahora?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleContinueShopping}>Seguir Comprando</Button>
          <Button variant="secondary" onClick={handleViewOrders}>
            Ver Mis Órdenes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
