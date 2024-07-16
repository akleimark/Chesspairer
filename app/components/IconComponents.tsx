import editSign from "@/public/edit-sign.png";
import plusSign from "@/public/plus-sign.png";
import saveIcon from "@/public/save-icon.png";
import deleteIcon from "@/public/delete-icon.png";
import backIcon from "@/public/back_arrow.png";
import selectedIcon from "@/public/selected.png";

import Image from "next/image";


export function EditIcon(props: any) 
{
    let alt : string = 'edit';
    if(props.alt != undefined)
    {
        alt = props.alt;
    }

    return (
        <Image className="my-0 mx-auto" src={editSign} alt={alt} width={20} height={20}/>
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
        <Image className="my-0 mx-auto" src={plusSign} alt={alt} width={20} height={20}/>
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
        <Image className="my-0 mx-auto" src={saveIcon} alt={alt} width={40} height={40}/>
    )
}

export function DeleteIcon(props: any)
{
    let alt : string = 'delete';
    if(props.alt != undefined)
    {
        alt = props.alt;
    }

    return (
        <Image className="my-0 mx-2" src={deleteIcon} alt={alt} width={40} height={40}/>
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
        <Image className="my-0 mx-auto" src={selectedIcon} alt="selected" width={20} height={20}/> 
    )
}