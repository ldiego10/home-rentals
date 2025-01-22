'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio.';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido.';
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
      valid = false;
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/propiedades');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 bg-blend-overlay bg-cover bg-center"
     style={{ backgroundImage: "url('/images/login-bg.jpg')" }}>

      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 bg-opacity-90">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold shadow-md hover:bg-blue-600 transition duration-300"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

