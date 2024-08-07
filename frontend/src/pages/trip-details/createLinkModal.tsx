import { Link2, Tag, X } from "lucide-react";
import Button from "../../components/button";

interface CreateLinkModalProps {
    closeCreateLinkModalOpen: () => void;
}
export default function CreateLinkModal({ closeCreateLinkModalOpen }: CreateLinkModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5" >
                <div className="space-y-2" >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold" >Cadastrar link</h2>
                        <button type="button" onClick={closeCreateLinkModalOpen} >
                            <X className="size-5 textx-zinc-400" />
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm">Todos convidados podem visualizar os links importantes.</p>
                </div>

                <form>
                    <div className="space-y-2 pb-3" >
                        <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Tag className="size-5 text-zinc-400" />
                            <input type="text" name="title" placeholder="Título do link" className=" bg-transparent placegolder-zinc-400 w-40 outline-none flex-1" />
                        </div>

                        <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Link2 className="size-5 text-zinc-400" />
                            <input type="link" name="link" placeholder="URL" className=" bg-transparent placeholder-zinc-400 outline-none flex-1" />
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="full"
                        type="submit"
                        >
                        Salvar link
                    </Button>
                </form>
            </div>
        </div>
    )
}