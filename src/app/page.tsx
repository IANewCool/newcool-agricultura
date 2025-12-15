'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas INDAP por region
const OFICINAS = [
  { id: 1, nombre: 'INDAP Arica y Parinacota', region: 'Arica y Parinacota', ciudad: 'Arica', direccion: 'Arturo Prat 305, piso 3', telefono: '58 2254100', servicios: ['PRODESAL', 'Creditos', 'Riego'] },
  { id: 2, nombre: 'INDAP Tarapaca', region: 'Tarapaca', ciudad: 'Iquique', direccion: 'Serrano 145, piso 6', telefono: '57 2413300', servicios: ['PRODESAL', 'Creditos', 'Asesoria'] },
  { id: 3, nombre: 'INDAP Antofagasta', region: 'Antofagasta', ciudad: 'Antofagasta', direccion: 'Arturo Prat 461, piso 2', telefono: '55 2268100', servicios: ['PRODESAL', 'Creditos', 'Invernaderos'] },
  { id: 4, nombre: 'INDAP Atacama', region: 'Atacama', ciudad: 'Copiapo', direccion: 'Colipa 484', telefono: '52 2212030', servicios: ['PRODESAL', 'Creditos', 'Riego', 'Olivos'] },
  { id: 5, nombre: 'INDAP Coquimbo', region: 'Coquimbo', ciudad: 'La Serena', direccion: 'Cordovez 281', telefono: '51 2206400', servicios: ['PRODESAL', 'Creditos', 'Riego', 'Uva'] },
  { id: 6, nombre: 'INDAP Valparaiso', region: 'Valparaiso', ciudad: 'Valparaiso', direccion: 'Melgarejo 669, piso 7', telefono: '32 2252500', servicios: ['PRODESAL', 'Creditos', 'Frutales', 'Hortalizas'] },
  { id: 7, nombre: 'INDAP Metropolitana', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Agustinas 1465, piso 2', telefono: '2 26903000', servicios: ['PRODESAL', 'Creditos', 'Asesoria', 'Comercializacion'] },
  { id: 8, nombre: 'INDAP OHiggins', region: 'OHiggins', ciudad: 'Rancagua', direccion: 'Cuevas 480, piso 4', telefono: '72 2204600', servicios: ['PRODESAL', 'Creditos', 'Frutales', 'Vino'] },
  { id: 9, nombre: 'INDAP Maule', region: 'Maule', ciudad: 'Talca', direccion: '1 Sur 875, piso 3', telefono: '71 2515200', servicios: ['PRODESAL', 'Creditos', 'Berries', 'Cereales'] },
  { id: 10, nombre: 'INDAP Nuble', region: 'Nuble', ciudad: 'Chillan', direccion: 'Arauco 564', telefono: '42 2433000', servicios: ['PRODESAL', 'Creditos', 'Cereales', 'Ganaderia'] },
  { id: 11, nombre: 'INDAP Biobio', region: 'Biobio', ciudad: 'Concepcion', direccion: 'Caupolican 567, piso 4', telefono: '41 2861100', servicios: ['PRODESAL', 'Creditos', 'Forestal', 'Ganaderia'] },
  { id: 12, nombre: 'INDAP Araucania', region: 'Araucania', ciudad: 'Temuco', direccion: 'Claro Solar 55, piso 5', telefono: '45 2953600', servicios: ['PRODESAL', 'Creditos', 'Ganaderia', 'Papas'] },
  { id: 13, nombre: 'INDAP Los Rios', region: 'Los Rios', ciudad: 'Valdivia', direccion: 'OHiggins 458, piso 3', telefono: '63 2246400', servicios: ['PRODESAL', 'Creditos', 'Lecheria', 'Ganaderia'] },
  { id: 14, nombre: 'INDAP Los Lagos', region: 'Los Lagos', ciudad: 'Puerto Montt', direccion: 'Urmeneta 509, piso 4', telefono: '65 2483700', servicios: ['PRODESAL', 'Creditos', 'Lecheria', 'Papas'] },
  { id: 15, nombre: 'INDAP Aysen', region: 'Aysen', ciudad: 'Coyhaique', direccion: 'Ogana 1060', telefono: '67 2261300', servicios: ['PRODESAL', 'Creditos', 'Ganaderia', 'Invernaderos'] },
  { id: 16, nombre: 'INDAP Magallanes', region: 'Magallanes', ciudad: 'Punta Arenas', direccion: 'Jose Menendez 827', telefono: '61 2247100', servicios: ['PRODESAL', 'Creditos', 'Ganaderia Ovina'] }
];

const REGIONES = ['Todas', 'Arica y Parinacota', 'Tarapaca', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaiso', 'Metropolitana', 'OHiggins', 'Maule', 'Nuble', 'Biobio', 'Araucania', 'Los Rios', 'Los Lagos', 'Aysen', 'Magallanes'];

// Programas INDAP
const PROGRAMAS = [
  { nombre: 'PRODESAL', icono: '🌱', descripcion: 'Programa de Desarrollo Local para pequenos agricultores', beneficios: ['Asesoria tecnica', 'Capacitacion', 'Apoyo comercializacion'], requisitos: ['Pequeno agricultor', 'Menos de 12 HRB', 'Actividad agricola'], cobertura: '100% gratuito' },
  { nombre: 'PDTI', icono: '🏔️', descripcion: 'Programa de Desarrollo Territorial Indigena', beneficios: ['Asesoria', 'Inversiones', 'Rescate semillas'], requisitos: ['Comunidad indigena', 'Territorio rural', 'Produccion tradicional'], cobertura: '100% gratuito' },
  { nombre: 'Credito INDAP', icono: '💰', descripcion: 'Financiamiento para capital de trabajo e inversiones', beneficios: ['Tasas preferenciales', 'Largo plazo', 'Sin comisiones'], requisitos: ['Usuario INDAP', 'Sin deudas morosas', 'Proyecto viable'], cobertura: 'Hasta $15M' },
  { nombre: 'Riego Asociativo', icono: '💧', descripcion: 'Bonificacion para obras de riego tecnificado', beneficios: ['Goteo', 'Aspersion', 'Microaspersion'], requisitos: ['Derechos de agua', 'Estudio tecnico', 'Grupo de agricultores'], cobertura: 'Hasta 90%' },
  { nombre: 'Alianzas Productivas', icono: '🤝', descripcion: 'Vinculacion con empresas para comercializacion', beneficios: ['Contratos', 'Precios estables', 'Asistencia tecnica'], requisitos: ['Grupo organizado', 'Volumen minimo', 'Calidad certificada'], cobertura: 'Hasta 80%' },
  { nombre: 'SIRSD-S', icono: '🌿', descripcion: 'Incentivo para recuperacion de suelos degradados', beneficios: ['Enmiendas', 'Fertilizacion', 'Praderas'], requisitos: ['Suelo degradado', 'Plan de manejo', 'Superficie minima'], cobertura: 'Hasta 80%' }
];

// Tipos de cultivo
const CULTIVOS = [
  { tipo: 'Hortalizas', icono: '🥬', ejemplos: ['Tomate', 'Lechuga', 'Zanahoria', 'Cebolla'], temporada: 'Todo el ano', rentabilidad: 'Alta rotacion' },
  { tipo: 'Frutales', icono: '🍇', ejemplos: ['Uva', 'Manzana', 'Cereza', 'Arandano'], temporada: 'Estacional', rentabilidad: 'Alta inversion' },
  { tipo: 'Cereales', icono: '🌾', ejemplos: ['Trigo', 'Avena', 'Maiz', 'Arroz'], temporada: 'Anual', rentabilidad: 'Volumen' },
  { tipo: 'Ganaderia', icono: '🐄', ejemplos: ['Bovino', 'Ovino', 'Caprino', 'Porcino'], temporada: 'Permanente', rentabilidad: 'Largo plazo' },
  { tipo: 'Apicultura', icono: '🐝', ejemplos: ['Miel', 'Polen', 'Propoleo', 'Cera'], temporada: 'Primavera-Verano', rentabilidad: 'Complementaria' },
  { tipo: 'Forestal', icono: '🌲', ejemplos: ['Pino', 'Eucalipto', 'Nativo', 'Lena'], temporada: '10-20 anos', rentabilidad: 'Muy largo plazo' }
];

// Glosario agricola
const GLOSARIO = [
  { termino: 'INDAP', definicion: 'Instituto de Desarrollo Agropecuario, apoya a la agricultura familiar campesina' },
  { termino: 'HRB', definicion: 'Hectareas de Riego Basico, unidad para medir tamano de predios agricolas' },
  { termino: 'PRODESAL', definicion: 'Programa de Desarrollo Local, asesoria gratuita para pequenos agricultores' },
  { termino: 'SAG', definicion: 'Servicio Agricola y Ganadero, fiscaliza sanidad y calidad agroalimentaria' },
  { termino: 'Riego Tecnificado', definicion: 'Sistema de riego eficiente como goteo o aspersion que ahorra agua' },
  { termino: 'AFC', definicion: 'Agricultura Familiar Campesina, pequenos productores agricolas' },
  { termino: 'BPA', definicion: 'Buenas Practicas Agricolas, normas de produccion segura y sustentable' },
  { termino: 'Trazabilidad', definicion: 'Sistema de seguimiento del origen y procesamiento de productos agricolas' },
  { termino: 'PABCO', definicion: 'Planteles Animales Bajo Certificacion Oficial, ganaderia certificada por SAG' },
  { termino: 'Denominacion de Origen', definicion: 'Certificacion que garantiza el origen geografico de un producto' },
  { termino: 'Cultivo Organico', definicion: 'Produccion sin agroquimicos sinteticos, certificada por entidades autorizadas' },
  { termino: 'Cooperativa Campesina', definicion: 'Organizacion de agricultores para comercializar y comprar insumos en conjunto' }
];

export default function AgriculturaPage() {
  const [busqueda, setBusqueda] = useState('');
  const [regionFiltro, setRegionFiltro] = useState('Todas');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Calculadora de rentabilidad por hectarea
  const [superficie, setSuperficie] = useState('1');
  const [rendimiento, setRendimiento] = useState('');
  const [precioKg, setPrecioKg] = useState('');
  const [costoHa, setCostoHa] = useState('');

  const oficinasFiltradas = OFICINAS.filter(oficina => {
    const coincideBusqueda = oficina.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             oficina.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
                             oficina.servicios.some(s => s.toLowerCase().includes(busqueda.toLowerCase()));
    const coincideRegion = regionFiltro === 'Todas' || oficina.region === regionFiltro;
    return coincideBusqueda && coincideRegion;
  });

  const calcularRentabilidad = () => {
    if (!rendimiento || !precioKg || !costoHa || !superficie) return null;

    const ha = parseFloat(superficie);
    const rend = parseFloat(rendimiento);
    const precio = parseFloat(precioKg);
    const costo = parseFloat(costoHa);

    const ingresoTotal = ha * rend * precio;
    const costoTotal = ha * costo;
    const utilidadBruta = ingresoTotal - costoTotal;
    const margenPorcentaje = ((utilidadBruta / ingresoTotal) * 100).toFixed(1);
    const utilidadPorHa = utilidadBruta / ha;

    return {
      ingresoTotal,
      costoTotal,
      utilidadBruta,
      margenPorcentaje,
      utilidadPorHa
    };
  };

  const resultado = calcularRentabilidad();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-lime-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-6xl mb-4 block">🌾</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Agricultura
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Oficinas INDAP, programas de apoyo, calculadora de rentabilidad y recursos para agricultores
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm">
                🌱 INDAP
              </span>
              <span className="px-4 py-2 bg-lime-500/20 rounded-full text-lime-300 text-sm">
                💧 Riego
              </span>
              <span className="px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-300 text-sm">
                🐄 Ganaderia
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Buscador de Oficinas INDAP */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🔍</span> Buscador de Oficinas INDAP
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Buscar por ciudad o servicio</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onFocus={() => setMostrarResultados(true)}
                placeholder="Ej: Temuco, creditos, riego..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Region</label>
              <select
                value={regionFiltro}
                onChange={(e) => setRegionFiltro(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500"
              >
                {REGIONES.map(region => (
                  <option key={region} value={region} className="bg-slate-800">{region}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setMostrarResultados(true)}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition"
          >
            🔍 Buscar Oficinas ({oficinasFiltradas.length} encontradas)
          </button>

          {mostrarResultados && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 space-y-4 max-h-96 overflow-y-auto"
            >
              {oficinasFiltradas.map((oficina) => (
                <div key={oficina.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{oficina.nombre}</h3>
                      <p className="text-green-400 text-sm">📞 {oficina.telefono}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-xs">
                      {oficina.region}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">📍 {oficina.direccion}, {oficina.ciudad}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {oficina.servicios.map((servicio, i) => (
                      <span key={i} className="px-2 py-1 bg-emerald-500/20 rounded text-xs text-emerald-300">
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Calculadora Rentabilidad */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-lime-600/20 to-green-600/20 rounded-2xl p-6 border border-lime-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🧮</span> Calculadora de Rentabilidad Agricola
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Superficie (hectareas)</label>
                <input
                  type="number"
                  value={superficie}
                  onChange={(e) => setSuperficie(e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Rendimiento (kg/hectarea)</label>
                <input
                  type="number"
                  value={rendimiento}
                  onChange={(e) => setRendimiento(e.target.value)}
                  placeholder="Ej: 8000 para tomates"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Precio venta ($/kg)</label>
                <input
                  type="number"
                  value={precioKg}
                  onChange={(e) => setPrecioKg(e.target.value)}
                  placeholder="Ej: 500"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Costo produccion ($/hectarea)</label>
                <input
                  type="number"
                  value={costoHa}
                  onChange={(e) => setCostoHa(e.target.value)}
                  placeholder="Ej: 2500000"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-500"
                />
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              {resultado ? (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-gray-400 mb-2">Utilidad Bruta Total</p>
                    <p className={`text-4xl font-bold ${resultado.utilidadBruta >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${resultado.utilidadBruta.toLocaleString('es-CL')}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Ingreso total:</span>
                      <span className="text-white">${resultado.ingresoTotal.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Costo total:</span>
                      <span className="text-red-400">-${resultado.costoTotal.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                      <span className="text-gray-400">Margen:</span>
                      <span className={resultado.utilidadBruta >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {resultado.margenPorcentaje}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Utilidad por ha:</span>
                      <span className="text-white">${Math.round(resultado.utilidadPorHa).toLocaleString('es-CL')}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
                    <p className="text-xs text-green-300">
                      💡 Considera costos de mano de obra, insumos, transporte y comercializacion
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <span className="text-4xl mb-4">📊</span>
                  <p>Ingresa los datos para calcular la rentabilidad</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Programas INDAP */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📋</span> Programas de Apoyo INDAP
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMAS.map((programa, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{programa.icono}</span>
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-xs">
                  {programa.cobertura}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{programa.nombre}</h3>
              <p className="text-gray-400 text-sm mb-4">{programa.descripcion}</p>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Beneficios:</p>
                <div className="flex flex-wrap gap-1">
                  {programa.beneficios.map((beneficio, j) => (
                    <span key={j} className="px-2 py-1 bg-lime-500/20 rounded text-xs text-lime-300">
                      {beneficio}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-gray-500 mb-2">Requisitos:</p>
                <ul className="space-y-1">
                  {programa.requisitos.map((req, j) => (
                    <li key={j} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="text-green-400">✓</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tipos de Cultivo */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span>🌿</span> Tipos de Produccion Agricola
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CULTIVOS.map((cultivo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-green-500/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{cultivo.icono}</span>
                  <div>
                    <h3 className="font-bold text-white">{cultivo.tipo}</h3>
                    <p className="text-xs text-gray-400">{cultivo.temporada}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {cultivo.ejemplos.map((ejemplo, j) => (
                    <span key={j} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                      {ejemplo}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Rentabilidad:</span>
                  <span className="text-lime-400">{cultivo.rentabilidad}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos para acceder a INDAP */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📝</span> Como Acceder a Beneficios INDAP
        </h2>

        <div className="grid md:grid-cols-6 gap-4">
          {[
            { paso: '1', titulo: 'Verifica', desc: 'Cumplir requisitos AFC', icono: '✅' },
            { paso: '2', titulo: 'Acercate', desc: 'Oficina INDAP regional', icono: '🏢' },
            { paso: '3', titulo: 'Inscribete', desc: 'Registro usuario INDAP', icono: '📋' },
            { paso: '4', titulo: 'Postula', desc: 'Al programa que necesitas', icono: '📤' },
            { paso: '5', titulo: 'Evaluacion', desc: 'Revision de tu solicitud', icono: '🔍' },
            { paso: '6', titulo: 'Beneficio', desc: 'Recibe asesoria o apoyo', icono: '🎯' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                {item.icono}
              </div>
              <div className="text-xs text-green-400 mb-1">Paso {item.paso}</div>
              <h3 className="font-bold text-white text-sm">{item.titulo}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Glosario */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📖</span> Glosario Agricola
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOSARIO.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <h3 className="font-bold text-green-400 mb-2">{item.termino}</h3>
              <p className="text-sm text-gray-400">{item.definicion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recursos */}
      <section className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span>🔗</span> Recursos Oficiales
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { nombre: 'Portal INDAP', url: 'https://www.indap.gob.cl', icono: '🌱', desc: 'Agricultura familiar campesina' },
              { nombre: 'SAG', url: 'https://www.sag.gob.cl', icono: '🛡️', desc: 'Sanidad agricola y ganadera' },
              { nombre: 'ODEPA', url: 'https://www.odepa.gob.cl', icono: '📊', desc: 'Estadisticas y mercados' },
              { nombre: 'CNR', url: 'https://www.cnr.gob.cl', icono: '💧', desc: 'Comision Nacional de Riego' }
            ].map((recurso, i) => (
              <a
                key={i}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all"
              >
                <span className="text-2xl mb-2 block">{recurso.icono}</span>
                <h3 className="font-bold text-white text-sm">{recurso.nombre}</h3>
                <p className="text-xs text-gray-500 mt-1">{recurso.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Agricultura - Parte de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-green-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Informacion basada en datos oficiales de INDAP y SAG
          </p>
        </div>
      </footer>
    </div>
  );
}
