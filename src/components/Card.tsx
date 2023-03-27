import { downloadImg } from "../utils"
interface ICard {
    _id: string,
    name: string,
    prompt: string,
    photo: string
}

export const Card = ({ _id, name, prompt, photo }: ICard) => {

    const downloadIcon = <span>&#129095;</span>

    return < div className="group rounded-xl relative">
        <img src={photo} alt="" className="w-full h-auto rounded-xl object-cover" />
        <div className=" absolute group-hover:flex flex-col hidden h-max-[94%] text-slate-200 bottom-0 left-0 right-0 rounded-md p-3 m-2 bg-[#10131f]">
            <p className="m-auto text-sm">{prompt}</p>
            <div className="flex justify-between text-lg">
                <div className="rounded-full w-8 h-8 flex items-center justify-center font-semibold bg-green-800">{name[0]}</div>
                <button onClick={()=>downloadImg(photo)} className="rounded-full w-8 h-8 flex items-center justify-center border-solid border-2 border-white">{downloadIcon}</button>
            </div>
        </div>
    </div>
}