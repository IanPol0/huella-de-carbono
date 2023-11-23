"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

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

const distanciasAvion = [
  {
    puntas: [0, 1],
    distancia: 1309
  },
  {
    puntas: [0, 2],
    distancia: 10087
  },
  {
    puntas: [0, 3],
    distancia: 18351
  },
  {
    puntas: [0, 4],
    distancia: 357
  },
  {
    puntas: [0, 5],
    distancia: 1321
  },
  {
    puntas: [1, 2],
    distancia: 11349
  },
  {
    puntas: [1, 3],
    distancia: 17262
  },
  {
    puntas: [1, 4],
    distancia: 1217
  },
  {
    puntas: [1, 5],
    distancia: 1946
  },
  {
    puntas: [2, 3],
    distancia: 10767
  },
  {
    puntas: [2, 4],
    distancia: 10305
  },
  {
    puntas: [2, 5],
    distancia: 9612
  },
  {
    puntas: [3, 4],
    distancia: 18449
  },
  {
    puntas: [3, 5],
    distancia: 17328
  },
  {
    puntas: [4, 5],
    distancia: 1666
  },
]

const getCO2forPlanes = (distancia: number) => {
  return distancia * 2.5;
}

export default function Home() {
  const [transporte, setTransporte] = useState(0);
  const [pasajeros, setPasajeros] = useState(
    transportes[transporte].pasajeros ?? 0
  );
  const [kilometros, setKilometros] = useState(0);
  const [resultado, setResultado] = useState("");
  const [origen, setOrigen] = useState(0);
  const [destino, setDestino] = useState(0);
  const [isEasterEggOpened, setIsEasterEggOpened] = useState(false);

  const calcularHuella = () => {
    setResultado("");
    if (!(pasajeros > 0)) {
      return toast.error("La cantidad de pasajeros debe ser mayor que 0");
    }
    if (!(kilometros > 0) && transporte !== 0) {
      return toast.error("La cantidad de kilometros debe ser mayor que 0");
    }
    if (origen === destino && transporte === 0) {
      return toast.error("El origen y el destino no pueden ser iguales");
    }

    if (transporte === 0) {
      distanciasAvion.find((obj) => {
        const puntas = obj.puntas;
        if (puntas.includes(origen) && puntas.includes(destino)) {
          const distancia = obj.distancia;
          const co2 = getCO2forPlanes(distancia);
          setResultado((co2 / pasajeros).toFixed(2));
          return 1;
        }
      })
    } else {
      const { co2PorKm } = transportes[transporte];
      const huella = ((co2PorKm * kilometros) / pasajeros).toFixed(2);
      setResultado(huella);
    }
  };

  return (
    <>
      <div className="absolute w-[100px] h-[100px]" onClick={() => setIsEasterEggOpened(!isEasterEggOpened)} />

      <main className="flex min-h-screen flex-col items-center justify-between py-20 px-5 bg-[#67ed52]">
        <div className={`z-20 absolute w-[400px] h-[600px] justify-between rounded-md bg-white flex flex-col items-center gap-3 p-10 ${isEasterEggOpened ? "" : "hidden"}`}>
          <>
            <h1 className="text-black text-4xl font-bold">¡WOW!</h1>
            <p className="text-black text-xl text-center">Encontraste a Messi Chiquito Campeón del Mundo</p>
            <img alt="messi" className="w-[200px] h-[200px] rounded-full" src="data:image/jpeg;base64,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" />
            <p className="text-black text-center mt-5">Apreta el botón de abajo para disfrutar de sus poderes de cero emisión de CO2</p>
          </>
          <button className="bg-[#32c7c9] shadow-xl p-3 px-5 rounded-full font-bold text-xl active:scale-[97%]" onClick={() => setIsEasterEggOpened(false)}>Empoderame</button>
        </div>
        <Image src={"/LogoCO2.svg"} alt="No emitas C02" width={300} height={300} className="absolute self-end" />
        <div id="container" className="flex flex-col items-center gap-5">
          <h1 className="text-6xl font-bold drop-shadow-sm mt-10">Medidor CO2</h1>
          <p className="text-center max-w-[650px] font-bold drop-shadow-sm">
            ¡Bienvenido al monitoreo consciente del CO2! Al utilizar este medidor,
            estas dando un paso importante para entender y mejorar la calidad del
            aire que nos rodea.
          </p>
          <div className="flex flex-col gap-3 mt-16">
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
            {
              transporte === 0 ? (
                <>
                  <label htmlFor="origen" className="flex flex-col gap-1">
                    Origen
                    <select
                      name="origen"
                      id="origen"
                      className="rounded-2xl text-black p-2"
                      placeholder="Seleccionar transporte"
                      value={origen}
                      onChange={(e) => {
                        setOrigen(Number(e.target.value));
                      }}
                    >
                      <option value="0">Buenos Aires (Ezeiza)</option>
                      <option value="1">Bariloche</option>
                      <option value="2">Madrid</option>
                      <option value="3">Tokyo</option>
                      <option value="4">Mar del Plata</option>
                      <option value="5">Jujuy</option>
                    </select>
                  </label>
                  <label htmlFor="destino" className="flex flex-col gap-1">
                    Destino
                    <select
                      name="destino"
                      id="destino"
                      className="rounded-2xl text-black p-2"
                      placeholder="Seleccionar transporte"
                      value={destino}
                      onChange={(e) => {
                        setDestino(Number(e.target.value));
                      }}
                    >
                      <option value="0">Buenos Aires (Ezeiza)</option>
                      <option value="1">Bariloche</option>
                      <option value="2">Madrid</option>
                      <option value="3">Tokyo</option>
                      <option value="4">Mar del Plata</option>
                      <option value="5">Jujuy</option>
                    </select>
                  </label>
                </>
              ) : (

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
              )
            }
          </div>
          <button
            onClick={calcularHuella}
            className="mt-5 shadow-xl rounded-full transition-transform text-xl font-medium bg-[#32c7c9] px-10 py-1.5 active:scale-[97%]"
          >
            Calcular tu huella
          </button>
          {resultado && (
            <>
              <span className="text-2xl font-semibold mt-10 p-3 rounded-xl bg-orange-400">
                La huella de carbono por pasajero es de {resultado} Kg de CO2 por
                persona
              </span>
            </>
          )}
        </div>
        <Toaster />
      </main>
    </>
  );
}
