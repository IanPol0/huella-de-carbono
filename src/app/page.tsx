"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const transportes = [
  {
    nombre: "avion",
    litroPorKm: 3.58,
    co2PorKm: 8.88,
    pasajeros: 189,
  },
  {
    nombre: "automovil (nafta)",
    litroPorKm: 0.07,
    co2PorKm: 0.14,
  },
  {
    nombre: "automovil (diesel)",
    litroPorKm: 0.4,
    co2PorKm: 0.99,
  },
  {
    nombre: "tren",
    litroPorKm: 0.2,
    pasajeros: 1472,
    co2PorKm: 0.49,
  },
  {
    nombre: "autobus corta distancia",
    litroPorKm: 0.35,
    pasajeros: 40,
    co2PorKm: 0.69,
  },
  {
    nombre: "autobus larga distancia",
    litroPorKm: 0.2,
    pasajeros: 37,
    co2PorKm: 0.66,
  },
];

export default function Home() {
  const [transporte, setTransporte] = useState(0);
  const [pasajeros, setPasajeros] = useState(
    transportes[transporte].pasajeros ?? 0
  );
  const [kilometros, setKilometros] = useState(0);
  const [resultado, setResultado] = useState<number | null>(null);

  const calcularHuella = () => {
    setResultado(null);
    if (!(pasajeros > 0)) {
      return toast.error("La cantidad de pasajeros debe ser mayor que 0");
    }
    if (!(kilometros > 0)) {
      return toast.error("La cantidad de kilometros debe ser mayor que 0");
    }
    const { co2PorKm } = transportes[transporte];
    const huella = Math.round((co2PorKm * kilometros) / pasajeros);
    setResultado(Math.round(huella));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-20 px-5 bg-[#61ba53]">
      <div id="container" className="flex flex-col items-center gap-5">
        <h1 className="text-6xl">Medidor CO2</h1>
        <p className="text-center max-w-[650px]">
          ¡Bienvenido al monitoreo consciente del CO2! Al utilizar este medidor,
          estas dando un paso importante para entender y mejorar la calidad del
          aire que nos rodea.
        </p>
        <div className="flex flex-col gap-3">
          <label htmlFor="transporte" className="flex flex-col gap-1">
            Transporte
            <select
              name="trans"
              id="trans"
              className="rounded-2xl text-black p-2"
              placeholder="Seleccionar transporte"
              value={transporte}
              onChange={(e) => {
                setTransporte(Number(e.target.value));
                setPasajeros(
                  transportes[Number(e.target.value)].pasajeros ?? 0
                );
              }}
            >
              <option value="0">Avion</option>
              <option value="1">Auto (Nafta)</option>
              <option value="2">Auto (Gasoil)</option>
              <option value="3">Tren</option>
              <option value="4">Bondi</option>
              <option value="5">Autobús larga distancia</option>
            </select>
          </label>
          {/* metodo trnasporte, cantidad de pasajeros, cantidad de kilometros */}
          <label htmlFor="pasajeros" className="flex flex-col gap-1">
            Pasajeros
            <input
              disabled={
                typeof transportes[transporte].pasajeros !== "undefined"
              }
              type="number"
              name="cantpas"
              className="rounded-2xl text-black p-2 disabled:opacity-90 disabled:cursor-not-allowed"
              value={pasajeros}
              onChange={(e) => {
                setPasajeros(Number(e.target.value));
              }}
              placeholder="Cantidad de pasajeros"
            />
          </label>
          <label htmlFor="kilometros" className="flex flex-col gap-1">
            Distancia recorrida
            <input
              type="number"
              name="dist"
              value={kilometros > 0 ? kilometros : undefined}
              onChange={(e) => {
                setKilometros(Number(e.target.value));
              }}
              className="rounded-2xl p-2 text-black"
              placeholder="Kilometros"
            />
          </label>
        </div>
        <button
          onClick={calcularHuella}
          className="mt-5 shadow-xl rounded-full transition-transform text-xl font-medium bg-[#32c7c9] px-10 py-1.5 active:scale-[97%]"
        >
          Calcular tu huella
        </button>
        {resultado && (
          <span className="text-xl">
            La huella de carbono por pasajero es de {resultado} Kg de CO2 por
            persona
          </span>
        )}
      </div>
      <Toaster />
    </main>
  );
}
