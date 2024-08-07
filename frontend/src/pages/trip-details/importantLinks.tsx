import { Link2, Plus } from "lucide-react";
import Button from "../../components/button";

interface ImportantLinksProps {
  openCreateLinkModalOpen: () => void;
}

export default function ImportantLinks({openCreateLinkModalOpen}: ImportantLinksProps){
    return(
        <div className="space-y-6">
        <h2 className="font-semibold text-xl">Links importantes</h2>

        <div className="space-y-5">
          <div className="flex justify-between items-center gap-4">
            <div className="space-y-1.5 flex-1">
              <span className="block text-zinc-100">Reserva do AirBnB</span>
              <a href="#" className="block text-zinc-400 text-xs truncate hover:text-zinc-200">https://www.airbnb.com.br/rooms/10470001154363643634634</a>
            </div>
            <Link2 className="size-5 text-zinc-400" />
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="space-y-1.5 flex-1">
              <span className="block text-zinc-100">Regras da casa</span>
              <a href="#" className="block text-zinc-400 text-xs truncate hover:text-zinc-200">https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000</a>
            </div>
            <Link2 className="size-5 text-zinc-400" />
          </div>
        </div>

        <Button onClick={openCreateLinkModalOpen} variant="secondary" size="full">
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>
      </div>
    )
}