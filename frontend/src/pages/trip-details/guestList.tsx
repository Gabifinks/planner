import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface GuestListProps {
    openCreateGuestModalOpen: () => void;
}

interface GuestType {
    id: string,
    name: string | null,
    email: string,
    is_confirmed: boolean,
}

export default function GuestList({ openCreateGuestModalOpen }: GuestListProps) {
    const { tripId } = useParams();
    const [participants, setParticipants] = useState<GuestType[] | undefined>()


    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants));

    }, [tripId])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">

                {participants?.map((participant, index) => {
                    return (
                        <div key={participant.id} className="flex justify-between items-center gap-4">
                            <div className="space-y-1.5 flex-1">
                                <span className="block text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                                <a href="#" className="block text-zinc-400 text-xs truncate hover:text-zinc-200">{participant.email}</a>
                            </div>
                            {participant.is_confirmed ? <CircleCheck className="size-5 text-lime-300" /> : <CircleDashed className="size-5 text-zinc-400" />}

                        </div>
                    )
                })}
            </div>

            <Button onClick={openCreateGuestModalOpen} variant="secondary" size="full">
                <UserCog className="size-5" />
                Gerenciar convidados
            </Button>
        </div>
    )
}