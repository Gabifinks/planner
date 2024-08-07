import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmTripModal from "./confirmTripModal";
import InviteGuestsModal from "./InviteGuestsModal";
import DestinationAndDate from "./steps/destinationAndDateStep";
import InviteGuestsStep from "./steps/inviteGuestsStep";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import { grid } from 'ldrs'


export default function CreateTripPage() {
    const navigate = useNavigate()
    grid.register()

    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
    const [emailsToInvite, setEmailsToInvite] = useState([
        'jessica.white44@yahoo.com', 'erik_leffler3@gmail.com', 'rebekah.conn21@gmail.com', 'emile.mayer25@yahoo.com', 'justus_hessel81@hotmail.com', 'hellen_graham@yahoo.com', 'kole.schiller27@yahoo.com'
    ]);
    const [destination, setDestinantion] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [eventRangeDates, setEventRangeDates] = useState<DateRange | undefined>();



    const createTrip = async (event: FormEvent<HTMLFormElement>) => {
        closeConfirmTripModal()
        setLoading(true);
        event.preventDefault();

        if (!destination || !eventRangeDates?.from || !eventRangeDates?.to || emailsToInvite.length === 0 || !ownerName || !ownerEmail) return;

        const response = await api.post('/trips', {
            destination,
            starts_at: eventRangeDates?.from,
            ends_at: eventRangeDates?.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail,
        })

        const { tripId } = response.data

        navigate(`/trips/${tripId}`)
    }

    const openGuestsInput = () => {
        setIsGuestsInputOpen(true);
    }

    const closeGuestsInput = () => {
        setIsGuestsInputOpen(false);
    }

    const openGuestsModal = () => {
        setIsGuestsModalOpen(true);
    }

    const closeGuestsModal = () => {
        setIsGuestsModalOpen(false);
    }

    const openConfirmTripModal = () => {
        setIsConfirmTripModalOpen(true);
    }

    const closeConfirmTripModal = () => {
        setIsConfirmTripModalOpen(false);
    }

    const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();

        if (!email) return;

        if (emailsToInvite.includes(email)) return;

        setEmailsToInvite([...emailsToInvite, email]);

        event.currentTarget.reset();

    }


    const removeEmailsFromInvite = (emailToRemove: string) => {
        const newEmailList = emailsToInvite.filter((email) => email !== emailToRemove)

        setEmailsToInvite(newEmailList)
    }

    return (
        <div className="flex items-center justify-center h-screen bg-patter bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10 shadow-shape gap-3">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="plannerLogo" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDate closeGuestsInput={closeGuestsInput} isGuestsInputOpen={isGuestsInputOpen} openGuestsInput={openGuestsInput} setDestinantion={setDestinantion} setEventRangeDates={setEventRangeDates} eventRangeDates={eventRangeDates} />

                    {isGuestsInputOpen && (
                        <InviteGuestsStep emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} openGuestsModal={openGuestsModal} />
                    )}
                </div>

                <p className="text-sm text-zinc-500">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-300 underline">termos de uso </a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade.</a>
                </p>
            </div>

            {isGuestsModalOpen && (
                <InviteGuestsModal addNewEmailToInvite={addNewEmailToInvite} closeGuestsModal={closeGuestsModal} emailsToInvite={emailsToInvite} removeEmailsFromInvite={removeEmailsFromInvite} />
            )}

            {isConfirmTripModalOpen && (
                <ConfirmTripModal closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip} setOwnerName={setOwnerName} setOwnerEmail={setOwnerEmail} />
            )}

            {loading &&
                <div className="flex absolute items-center justify-center bg-slate-950 bg-opacity-70 backdrop-blur-md w-screen h-screen">
                    <l-grid
                        size="60"
                        speed="1.5"
                        color="white"
                    ></l-grid>
                </div>
            }

        </div >
    )
}

