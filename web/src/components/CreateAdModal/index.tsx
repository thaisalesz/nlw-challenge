import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group' 
import {Check, GameController, MagnifyingGlassPlus} from 'phosphor-react'
import { Input } from '../Form/Input';
import { Game } from '../../App';
import { FormEvent, useState } from 'react';
import axios from 'axios';

interface Props{
    games: Game[]
}
export function CreateAdModal({games}: Props){

    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

    const handleCreateAd = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        try{
          axios.post(`http://localhost:3330/games/${data.game}/ads`,{          
              name: data.name,
              yearsPlaying: Number(data.yearsPlaying),	
              discord: data.discord,
              weekDays: weekDays.map(Number),
              hourStart: data.hourStart,
              hourEnd: data.hourEnd,
              useVoiceChannel: useVoiceChannel          
          })
          alert("sucesso")
        }
        catch(err){
          console.log(err)
        }
    }

    return(
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed w-full h-full flex justify-center items-center">

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[480px] shadow-black/25">
              <Dialog.Title className="text-3xl font-black">Publique seu anúncio</Dialog.Title>

                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="game" className="font-semibold">Qual o game?</label>
                    <select 
                        className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                        id="game" 
                        name="game"
                    >
                        <option defaultValue="" disabled>Selecione o game que quer jogar</option>
                        {games.map(game => {
                            return <option key={game.id} value={game.id}>{game.title}</option>
                        })}                    
                    </select>              
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" >Seu nome (ou nickname)</label>
                    <Input id="name" name="name" type="text" placeholder='Como te chamam dentro do game?' />
                  </div>

                  <div className=" grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                      <Input type="number" id="yearsPlaying" name="yearsPlaying" placeholder='Tudo bem ser zero'/>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="discord">Qual seu Discord?</label>
                      <Input id="discord" name="discord" type="text" placeholder="User387389" />
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="weekDays">Quando costuma jogar?</label>

                      
                        <ToggleGroup.Root 
                        type='multiple' 
                        // name="weekDays"
                        className='grid grid-cols-4 gap-1'
                        onValueChange={setWeekDays}>

                            <ToggleGroup.Item
                                value='0'
                                title="Domingo"
                                className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value='1'
                                title='Segunda'
                                className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value='2'
                                title="Terça"
                                className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value='3'
                                title="Quarta"
                                className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value='4'
                                title="Quinta"
                                className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value='5'
                                title="Sexta"
                                className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}> S</ToggleGroup.Item>
                            <ToggleGroup.Item
                                value='6'
                                title="Sábado"
                                className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>

                        </ToggleGroup.Root>
                      
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="hourStart">Qual horário do dia?</label>

                      <div className="grid grid-cols-2 gap-2">
                        <Input type="time" id="hourStart" name="hourStart" placeholder='De' />
                        <Input type="time" id="hourEnd" name="hourEnd" placeholder='Até' />
                      </div>
                    </div>
                  </div>

                  <label className="mt-2 flex items-center gap-2 text-sm">
                    <Checkbox.Root 
                    className=" w-6 h-6 p-1 rounded bg-zinc-900"
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                        if(checked === true){
                            setUseVoiceChannel(true)
                        }else{
                            setUseVoiceChannel(false)
                        }
                    }}
                    >
                        <Checkbox.Indicator>
                            <Check className=" w-4 h-4 text-emerald-400"/>
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                    Costumo me conectar ao chat de voz
                  </label>

                  <footer className="mt-4 flex justify-end gap-4">
                    <Dialog.Close 
                      className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                      type="button">
                      Cancelar
                      </Dialog.Close>
                    <button
                      className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" 
                      type='submit'>
                      <GameController size={24} />
                      Encontrar duo
                    </button>
                  </footer>

                </form>           
              
            </Dialog.Content>
          </Dialog.Overlay>

        </Dialog.Portal>
    )
}