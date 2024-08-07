import { Calendar, Tag, X } from "lucide-react";
import Button from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";


interface CreateActivityModalProps {
    closeCreateActivityModalOpen: () => void;
}

export default function CreateActivityModal({ closeCreateActivityModalOpen }: CreateActivityModalProps) {
    const { tripId } = useParams();

    const createActivity = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const title = data.get('title')
        const occurs_at = data.get('occurs_at')

        await api.post(`/trips/${tripId}/activities`, {
            title, 
            occurs_at
        })

        window.document.location.reload();
    }
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5" >
                <div className="space-y-2" >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold" >Cadastrar atividade</h2>
                        <button type="button" onClick={closeCreateActivityModalOpen} >
                            <X className="size-5 textx-zinc-400" />
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm">Todos convidados podem visualizar as atividades.</p>
                </div>

                <form onSubmit={createActivity}>
                    <div className="space-y-2 pb-3" >
                        <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Tag className="size-5 text-zinc-400" />
                            <input type="text" name="title" placeholder="Qual a atividade?" className=" bg-transparent placegolder-zinc-400 w-40 outline-none flex-1" />
                        </div>

                        <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Calendar className="size-5 text-zinc-400" />
                            <input type="datetime-local" name="occurs_at" placeholder="Data e horaário da atividade" className=" bg-transparent placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]" />
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="full"
                        type="submit"
                        >
                        Salvar atividade
                    </Button>
                </form>
            </div>
        </div>
    )
}