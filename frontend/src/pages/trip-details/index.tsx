import { Plus} from "lucide-react";
import { useState } from "react";
import CreateActivityModal from "./createActivityModal";
import ImportantLinks from "./importantLinks";
import GuestList from "./guestList";
import Activities from "./activities";
import DestinationAndDateHeader from "./destinationAndDataHeader";
import Button from "../../components/button";
import CreateLinkModal from "./createLinkModal";
import CreateGuestModal from "./createGuestModal";

export default function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsUpdateActivityModalOpen] = useState(false);
  const [isCreateLinkModalOpen, setIsUpdateLinkModalOpen] = useState(false);
  const [isCreateGuestModalOpen, setIsUpdateGuestModalOpen] = useState(false);

  const openCreateActivityModalOpen = () => {
    setIsUpdateActivityModalOpen(true)
  }

  const closeCreateActivityModalOpen = () => {
    setIsUpdateActivityModalOpen(false)
  }

  const openCreateLinkModalOpen = () => {
    setIsUpdateLinkModalOpen(true)
  }

  const closeCreateLinkModalOpen = () => {
    setIsUpdateLinkModalOpen(false)
  }

  const openCreateGuestModalOpen = () => {
    setIsUpdateGuestModalOpen(true)
  }

  const closeCreateGuestModalOpen = () => {
    setIsUpdateGuestModalOpen(false)
  }
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button variant="primary" onClick={openCreateActivityModalOpen}>
              Cadastrar atividade
              <Plus className="size-5" />
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks openCreateLinkModalOpen={openCreateLinkModalOpen}/>

          <div className="w-full h-px bg-zinc-800" />

          <GuestList openCreateGuestModalOpen={openCreateGuestModalOpen} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal closeCreateActivityModalOpen={closeCreateActivityModalOpen} />
      )}
      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModalOpen={closeCreateLinkModalOpen} />
      )}
      {isCreateGuestModalOpen && (
        <CreateGuestModal closeCreateGuestModalOpen={closeCreateGuestModalOpen} />
      )}
    </div>
  )
}