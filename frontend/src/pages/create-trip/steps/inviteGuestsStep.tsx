import { ArrowRight, UserRoundPlus } from "lucide-react";
import Button from "../../../components/button";

interface InviteGuestsStepProps {
    openGuestsModal: () => void,
    emailsToInvite: string[],
    openConfirmTripModal: () => void
}

export default function InviteGuestsStep({ emailsToInvite, openConfirmTripModal, openGuestsModal }: InviteGuestsStepProps) {
    return (
        <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center">
            <button type="button" onClick={openGuestsModal} className="flex flex-1 items-center gap-2 text-left">
                <UserRoundPlus className="w-5 h-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                    <span className="bg-transparent text-lg placeholder-zinc-100 outline-none flex-1 ">{emailsToInvite.length} pessoa(s) convidada(s)</span>
                ) : (
                    <span className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 ">Quem estará na viagem?</span>
                )}
            </button>

            <div className="w-px h-6 bg-zinc-800" />

            <Button type="button" onClick={openConfirmTripModal}>
                Confirmar Viagem
                <ArrowRight className="size-5" />
            </Button>
        </div>
    )
}