import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-[#61ba53]">
      <div id="container" className="flex flex-col items-center gap-5">
        <Image src="/favicon.ico" alt="globo" className='self-end justify-self-end m-0'width={50} height={50}/>
        <h1 className='text-6xl'>Medidor CO2</h1>
        <p className='text-center max-w-[700px]'>
          ¡Bienvenido al monitoreo consciente del CO2! Al utilizar este medidor, 
          estas dando un paso importante para entender y mejorar la calidad del 
          aire que nos rodea.
        </p>
        <div className='flex flex-col gap-3'>
          <label htmlFor="transporte" className='flex flex-col gap-1'>Transporte  
          <select name="trans" id="trans" className='rounded-2xl text-black p-2' placeholder='Seleccionar transporte'>
            <option value="0">Avion</option>
            <option value="1">Bondi</option>
            <option value="2">Auto (Gasoil)</option>
            <option value="3">Auto (Nafta)</option>
            <option value="4">Tren</option>
            <option value="5">Autobús larga distancia</option>
          </select></label>
        
    {/* metodo trnasporte, cantidad de pasajeros, cantidad de kilometros */}
          <label htmlFor="pasajeros" className='flex flex-col gap-1' >Pasajeros 
          <input type="number" name='cantpas' className='rounded-2xl text-black p-2' placeholder='Cantidad de pasajeros'/></label>
         

          <label htmlFor="kilometros" className='flex flex-col gap-1'>Distancia recorrida    
          <input type="number" name='dist' className='rounded-2xl p-2 text-black' placeholder='kilometros'/></label>
      
        </div>

        <button className='mt-5 shadow-xl rounded-full text-xl font-medium bg-[#32c7c9] px-10 py-1.5'>Calcular tu huella</button>
      </div>
    </main>
  )
}
