import { CircleCheck, CircleDashed } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { format } from 'date-fns'
import { getDay } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface ActivityType {
    date: string,
    activities: {
        date: string,
        id: string,
        title: string,
        occurs_at: string
    }[]
}


export default function Activities() {
    const { tripId } = useParams();
    const [activities, setActivities] = useState<ActivityType[]>()


    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities));

    }, [tripId])

    // console.log(activities)
    // const formattedDate =  activities ? format(activities?.date, "Dia d'", { locale: ptBR }) : 'carregando...'
    // const formattedDayOfWeek =  getDay(activities?.date)

    // console.log(formattedDate)
    // console.log(formattedDayOfWeek)

    return (

        <div className="space-y-8">
            {activities?.map((activity) => {
                return (
                    <div key={activity.date} className="space-y-2.5">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.date, 'd', { locale: ptBR })}</span>
                            <span className="text-xs text-zinc-500">{format(activity.date, 'EEEE', { locale: ptBR })}</span>
                        </div>
                        <div className="space-y-2.5">
                            {activity.activities.length > 0 ? (
                                <>
                                    {activity.activities.map((item) => {
                                        return (
                                            <div key={item.id} className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                                <CircleCheck className="size-5 text-lime-300" />
                                                <span className="text-zinc-100">{item.title}</span>
                                                <span className="text-zinc-400 text-sm ml-auto">{format(item.occurs_at, 'HH:mm')} h</span>
                                            </div>
                                        )
                                    })}
                                </>

                            ) : (
                                <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                            )}
                        </div>
                    </div>
                )
            })}

            {/* <div className="space-y-2.5 opacity-60">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">Dia 18</span>
                    <span className="text-xs text-zinc-500">Domingo</span>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Corrida de Kart</span>
                        <span className="text-zinc-400 text-sm ml-auto">14:00h</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5 opacity-60">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">Dia 19</span>
                    <span className="text-xs text-zinc-500">Segunda-Feira</span>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Academia em grupo</span>
                        <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Almoço</span>
                        <span className="text-zinc-400 text-sm ml-auto">12:00h</span>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Gaming session</span>
                        <span className="text-zinc-400 text-sm ml-auto">18:00h</span>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Jantar</span>
                        <span className="text-zinc-400 text-sm ml-auto">21:00h</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">Dia 20</span>
                    <span className="text-xs text-zinc-500">Terça-Feira</span>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Academia em grupo</span>
                        <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleDashed className="size-5 text-zinc-400" />
                        <span className="text-zinc-100">Almoço</span>
                        <span className="text-zinc-400 text-sm ml-auto">12:00h</span>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleDashed className="size-5 text-zinc-400" />
                        <span className="text-zinc-100">Jantar</span>
                        <span className="text-zinc-400 text-sm ml-auto">21:00h</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5 opacity-60">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">Dia 21</span>
                    <span className="text-xs text-zinc-500">Quarta-Feira</span>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleDashed className="size-5 text-zinc-400" />
                        <span className="text-zinc-100">Churrasco</span>
                        <span className="text-zinc-400 text-sm ml-auto">21:00h</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5 opacity-60">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">Dia 22</span>
                    <span className="text-xs text-zinc-500">Quinta-Feira</span>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Academia em grupo</span>
                        <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleDashed className="size-5 text-zinc-400" />
                        <span className="text-zinc-100">Almoço</span>
                        <span className="text-zinc-400 text-sm ml-auto">12:00h</span>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleDashed className="size-5 text-zinc-400" />
                        <span className="text-zinc-100">Jantar</span>
                        <span className="text-zinc-400 text-sm ml-auto">21:00h</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5 opacity-60">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">Dia 23</span>
                    <span className="text-xs text-zinc-500">Sexta-Feira</span>
                </div>
                <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
            </div> */}
        </div>
    )
}