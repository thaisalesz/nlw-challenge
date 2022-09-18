import './styles/main.css';
import logo from './assets/Logo.png'
import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from "./components/GameBanner"
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';


import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

export interface Game{
  bannerUrl: string;
  id: string;
  title: string;
  _count: {
  ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
   axios("http://localhost:3330/games")
    .then(response => setGames(response.data))
    .catch(err => console.error(err))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto my-20 flex flex-col items-center ">
      <img src={logo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />)}

      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal games={games} />

        
      </Dialog.Root>

    </div>
  )
}

export default App


