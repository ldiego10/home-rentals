'use client';
import { useRouter } from 'next/navigation';

const propiedades = [
  { 
    id: 1, 
    name: 'Casa Montañas de Monteverde', 
    address: 'Monteverde, Puntarenas', 
    price: 81000, 
    image: '/images/monteverde.jpg' 
  },
  { 
    id: 2, 
    name: 'Resort Frente al Mar', 
    address: 'Tamarindo, Guanacaste', 
    price: 135000, 
    image: '/images/tamarindo.jpg' 
  },
  { 
    id: 3, 
    name: 'Apartamento en Manuel Antonio', 
    address: 'Manuel Antonio, Puntarenas', 
    price: 97000, 
    image: '/images/manuel-antonio.jpg' 
  },
  { 
    id: 4, 
    name: 'Villa Lujosa en Papagayo', 
    address: 'Península Papagayo, Guanacaste', 
    price: 270000, 
    image: '/images/papagayo.jpg' 
  },
  { 
    id: 5, 
    name: 'Apartamento con Vista al Volcán', 
    address: 'La Fortuna, Alajuela', 
    price: 108000, 
    image: '/images/la-fortuna.jpg' 
  },
  { 
    id: 6, 
    name: 'Apartamento Puerto Viejo', 
    address: 'Puerto Viejo, Limón', 
    price: 92000, 
    image: '/images/puerto-viejo.jpg' 
  },
];

export default function PaginaPropiedades() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-6"
      style={{ backgroundImage: "url('/images/propiedades-bg.jpg')" }}
    >

      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Propiedades Disponibles</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {propiedades.map((propiedad) => (
          <div
            key={propiedad.id}
            onClick={() => router.push(`/propiedades/${propiedad.id}`)}
            className="cursor-pointer rounded-lg shadow-md bg-white p-6 border border-gray-200 
                       hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <img 
              src={propiedad.image} 
              alt={propiedad.name} 
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{propiedad.name}</h3>
            <p className="text-gray-600">{propiedad.address}</p>
            <p className="text-gray-800 font-bold mt-2">
              Precio: ₡{propiedad.price.toLocaleString()} / noche
            </p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
