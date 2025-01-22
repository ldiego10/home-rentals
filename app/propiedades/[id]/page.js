'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

const propiedades = [
  {
    id: 1,
    name: 'Casa Montañas de Monteverde',
    address: 'Monteverde, Puntarenas',
    description: 'Un retiro rodeado de bosques en las montañas.',
    price: 81000, 
    image: '/images/monteverde.jpg',
    lat: 10.3007,
    lon: -84.8152,
  },
  {
    id: 2,
    name: 'Resort Frente al Mar',
    address: 'Tamarindo, Guanacaste',
    description: 'Una impresionante propiedad frente al mar.',
    price: 135000,
    image: '/images/tamarindo.jpg',
    lat: 10.2993,
    lon: -85.8371,
  },
  {
    id: 3,
    name: 'Apartamento en Manuel Antonio',
    address: 'Manuel Antonio, Puntarenas',
    description: 'Un apartamento cerca del famoso parque nacional.',
    price: 97000,
    image: '/images/manuel-antonio.jpg',
    lat: 9.3896,
    lon: -84.1385,
  },
  {
    id: 4,
    name: 'Villa Lujosa en Papagayo',
    address: 'Península Papagayo, Guanacaste',
    description: 'Una villa lujosa con vistas al oceano.',
    price: 270000,
    image: '/images/papagayo.jpg',
    lat: 10.6308,
    lon: -85.6488,
  },
  {
    id: 5,
    name: 'Apartamento con Vista al Volcán',
    address: 'La Fortuna, Alajuela',
    description: 'Un apartamento con vistas al Volcán Arenal.',
    price: 108000,
    image: '/images/la-fortuna.jpg',
    lat: 10.4678,
    lon: -84.6453,
  },
  {
    id: 6,
    name: 'Apartamento Puerto Viejo',
    address: 'Puerto Viejo, Limón',
    description: 'Una relajante casa en Puerto Viejo, cerca de la playa.',
    price: 91800,
    image: '/images/puerto-viejo.jpg',
    lat: 9.656,
    lon: -82.753,
  },
];


export default function DetallesPropiedad({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [propiedad, setPropiedad] = useState(null);
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (resolvedParams && resolvedParams.id) {
      const propiedadId = Number(resolvedParams.id);
      const propiedadSeleccionada = propiedades.find((p) => p.id === propiedadId);

      if (propiedadSeleccionada) {
        setPropiedad(propiedadSeleccionada);
        obtenerClima(propiedadSeleccionada.lat, propiedadSeleccionada.lon);
      } else {
        router.push('/propiedades');
      }
    }
  }, [resolvedParams, router]);

  const obtenerClima = async (lat, lon) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=es&aqi=no`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener los datos del clima');

      const data = await response.json();
      setClima(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (!propiedad) return <p className="text-center text-lg mt-10 text-gray-600">Cargando detalles de la propiedad...</p>;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/id-bg.jpg')" }}
    >

      <div className="max-w-3xl w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">{propiedad.name}</h1>
        <img
          src={propiedad.image}
          alt={propiedad.name}
          className="w-full max-h-96 object-cover rounded-lg shadow-md"
        />
        <div className="mt-6 space-y-4 text-gray-700">
          <p className="text-lg"><strong>Dirección:</strong> {propiedad.address}</p>
          <p className="text-lg"><strong>Descripción:</strong> {propiedad.description}</p>
          <p className="text-lg font-semibold"><strong>Precio:</strong> ₡{propiedad.price.toLocaleString()} por noche</p>
        </div>

        <h2 className="text-2xl font-bold mt-8 text-gray-800">Información del Clima</h2>
        {cargando ? (
          <p className="mt-4 text-gray-600">Cargando clima...</p>
        ) : error ? (
          <p className="mt-4 text-red-500">{error}</p>
        ) : (
          <div className="mt-4 text-gray-800 bg-gray-200 p-4 rounded-lg shadow-md">
            <p className="text-lg"><strong>Temperatura:</strong> {clima.current.temp_c} °C</p>
            <p className="text-lg"><strong>Condición:</strong> {clima.current.condition.text}</p>
            <img className="w-16 mx-auto" src={clima.current.condition.icon} alt="Icono del clima" />
            <p className="text-lg"><strong>Humedad:</strong> {clima.current.humidity}%</p>
          </div>
        )}

        <button
          onClick={() => router.push('/propiedades')}
          className="mt-8 w-full py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Volver a Propiedades
        </button>
      </div>
    </div>
  );
}
