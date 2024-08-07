import { Calendar, MapPin, Settings2 } from "lucide-react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';


interface TripType {
    destination: string,
    ends_at: string,
    id: string,
    is_confirmed: boolean,
    starts_at: string
}

export default function DestinationAndDateHeader() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState<TripType | undefined>()


    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip));
        
    }, [tripId])

    const formattedDate =  trip ? format(trip.starts_at, "d' de 'LLL", { locale: ptBR }).concat(' até ').concat(format(trip.ends_at, "d' de 'LLL", { locale: ptBR })) : 'carregando...'

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-100">{trip?.destination}</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className=" text-zinc-100">{formattedDate}</span>
                </div>

                <div className="w-px h-6 bg-zinc-800" />

                <Button variant="secondary" >
                    Alterar local e data
                    <Settings2 className="size-5" />
                </Button>
            </div>
        </div>
    )
}