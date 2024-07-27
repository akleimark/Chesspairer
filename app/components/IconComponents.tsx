import editSign from "@/public/edit-sign.png";
import plusSign from "@/public/plus-sign.png";
import saveIcon from "@/public/save-icon.png";
import deleteIcon from "@/public/delete-icon.png";
import backIcon from "@/public/back_arrow.png";
import selectedIcon from "@/public/selected.png";
import playersIcon from "@/public/playersIcon.png"
import logoutIcon from "@/public/logout-icon.png"
import Image from "next/image";

export function EditIcon(props: any) 
{
    let alt : string = 'edit';
    if(props.alt != undefined)
    {
        alt = props.alt;
    }

    return (
        <Image className="my-0 mx-auto" src={editSign} alt={alt} height={20}/>
    )
}

export function AddIcon(props: any)
{
    let alt : string = 'add';
    if(props.alt != undefined)
    {
        alt = props.alt;
    }

    return (
        <Image className="my-0 mx-auto cursor-pointer" src={plusSign} alt={alt} height={20} onClick={props.onClick} />
    )
}

export function SaveIcon(props: any)
{
    let alt : string = 'save';
    if(props.alt != undefined)
    {
        alt = props.alt;
    }

    return (
        <Image className="my-0 mr-2 cursor-pointer" src={saveIcon} alt={alt} width={40} height={40}/>
    )
}

export function DeleteIcon(props: any)
{
    let alt : string = 'delete';
    let height : number = 40;
    if(props.alt != undefined)
    {
        alt = props.alt;
    }
    if(props.height != undefined)
    {
        height = props.height;
    }

    return (
        <Image className="my-0 mx-auto cursor-pointer" src={deleteIcon} alt={alt} height={height}/>
    )
}

export function BackIcon(props: any)
{
    let alt : string = 'back';
    if(props.alt != undefined)
    {
        alt = props.alt;
    }

    return (
        <Image src={backIcon} alt={alt} width={50} height={50}/>
    )
}

export function SelectedIcon(props: any)
{
    let alt : string = 'selected';
    if(props.alt != undefined)
    {
        alt = props.alt;
    }

    return (
        <Image className="my-0 mx-auto" src={selectedIcon} alt={alt} height={20}/> 
    )
}

export function PlayersIcon()
{
    return (
        <Image className="my-0 mx-auto" src={playersIcon} alt={'players'} height={20}/>
    )
}

export function LogoutIcon(props : any)
{
    return (
        <Image className="my-0 mx-auto absolute" src={logoutIcon} alt={'logout'} height={22} id="logout" onClick={props.onClick}/>
    )
}

