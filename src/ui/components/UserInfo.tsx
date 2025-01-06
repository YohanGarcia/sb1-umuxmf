import { useState } from 'react';
import { User } from '../../domain/entities/User';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

interface UserInfoProps {
  user: User;
  onUpdate: (userData: Partial<User>) => void;
}

const UserInfo = ({ user, onUpdate }: UserInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <p className="mt-1">{user.name}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="mt-1">{user.email}</p>
            </div>
            <div>
              <Label>Teléfono</Label>
              <p className="mt-1">{user.phone || 'No especificado'}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(true)}>Editar</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInfo;