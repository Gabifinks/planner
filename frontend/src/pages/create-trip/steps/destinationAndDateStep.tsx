import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import Button from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { pt } from "date-fns/locale";
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';



interface DestinationAndDateProps {
  isGuestsInputOpen: boolean,
  closeGuestsInput: () => void,
  openGuestsInput: () => void,
  setDestinantion: (destination: string) => void,
  eventRangeDates: DateRange | undefined,
  setEventRangeDates: (dates: DateRange | undefined) => void,
}

export default function DestinationAndDate({ closeGuestsInput, isGuestsInputOpen, openGuestsInput, setDestinantion, eventRangeDates, setEventRangeDates }: DestinationAndDateProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  }

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  }

  const displayDate = eventRangeDates && eventRangeDates.from && eventRangeDates.to ? format(eventRangeDates.from, "d' de 'LLL", { locale: ptBR }).concat(' até ').concat(format(eventRangeDates.to, "d' de 'LLL", { locale: ptBR })) : null

  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="w-5 h-5 text-zinc-400" />
        <input onChange={(e) => setDestinantion(e.target.value)} disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placegolder-zinc-400 outline-none" />
      </div>

      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 outline-none text-left flex-1">
        <Calendar className="w-5 h-5 text-zinc-400" />
        <span className="bg-transparent text-lg placeholder-zinc-400 w-40 flex-1">{displayDate || 'Quando?'}</span>
      </button>


      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5" >
            <div className="space-y-2" >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" >Selecione a data</h2>
                <button type="button" onClick={closeDatePicker} >
                  <X className="size-5 textx-zinc-400" />
                </button>
              </div>

            </div>

            <DayPicker locale={pt} mode="range" onSelect={setEventRangeDates} />
          </div>
        </div>
      )}


      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar Local e Data
          <Settings2 className="size-5" />
        </Button>
      )
        :
        (
          <Button onClick={openGuestsInput}>
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        )}
    </div>
  )
}