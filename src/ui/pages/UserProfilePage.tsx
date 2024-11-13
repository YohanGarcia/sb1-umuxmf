import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { userProfileStore } from "@/infrastructure/store/userProfileStore";

import { ChevronDown, ChevronUp, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UserProfilePage = () => {
  const { userProfile, fecthUserProfile, isLoading, error } =
    userProfileStore();

  useEffect(() => {
    fecthUserProfile();
  }, [fecthUserProfile]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Mi Perfil</h2>

      <Card className="mb-8">
        <CardContent>
          {isLoading ? (
            <div className="container mx-auto p-4 max-w-4xl flex items-center justify-center h-screen">
              <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Cargando datos del usuario...
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : error ? (
            <div className="container mx-auto p-4 max-w-4xl">
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-red-500 font-medium">{error}</p>
                  <Button
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Intentar de nuevo
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : userProfile ? (
            <>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${userProfile.username}`}
                      alt={userProfile.username}
                    />
                    <AvatarFallback>
                      {userProfile.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center sm:text-left">
                    <CardTitle className="text-2xl">
                      {userProfile.username}
                    </CardTitle>
                    <CardDescription>{userProfile.email}</CardDescription>
                  </div>
                </div>

                {/* Otros datos de perfil */}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      ID de Usuario
                    </p>
                    <p>{userProfile.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Fecha de Registro
                    </p>
                    <p>
                      {new Date(userProfile.date_joined).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Estado de la Cuenta
                    </p>
                    <Badge
                      variant={
                        userProfile.is_active ? "default" : "destructive"
                      }
                    >
                      {userProfile.is_active ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Tipo de Usuario
                    </p>
                    <Badge
                      variant={
                        userProfile.is_superuser ? "default" : "secondary"
                      }
                    >
                      {userProfile.is_superuser
                        ? "Administrador"
                        : userProfile.is_staff
                        ? "Staff"
                        : "Usuario Regular"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="container mx-auto p-4 max-w-4xl">
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    No se encontraron datos del usuario.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mis Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userProfile?.ordenes.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {order.items.slice(0, 1).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <img
                          src={item.producto.imagenes[0].imagen}
                          alt={item.producto.nombre}
                          className="h-12 w-15 rounded-sm"
                        />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <span>{order.items[0].producto.nombre}</span>
                  </TableCell>
                  <TableCell>
                    {new Date(order.fecha_creacion).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
