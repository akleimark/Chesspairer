"use client"
import { PrinterIcon } from "@/app/components/IconComponents"
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Copyright from "@/app/components/Copyright"

export default function TablePage()
{
    const contentToPrint = useRef(null);

    const handlePrint = useReactToPrint(
    {
        documentTitle: "Round Robin - four players",        
        removeAfterPrint: true,
    });

    return (
        <>
            <h1 className="text-3xl font-bold underline small-caps text-center my-8">round robin table (four players)</h1>
            <div className="mx-auto my-10 p-12 relative bg-neutral-700 h-2/3 overflow-y-auto w-full">                
                <table className="text-center mt-2 w-full table-auto relative mb-6" ref={contentToPrint}>
                    <thead className="text-xl">
                        <tr className="border-solid border-2 border-white-600 bg-lime-900">
                        <th className="p-5 font-semibold">#</th>
                        <th className="p-5 font-semibold">Name</th>
                        <th className="p-5 font-semibold">1</th>
                        <th className="p-5 font-semibold">2</th>
                        <th className="p-5 font-semibold">3</th>
                        <th className="p-5 font-semibold">∑</th>
                        <th className="p-5 font-semibold">Place</th>
                        </tr>
                    </thead>
                    <tbody className="text-lg">
                        <tr className="border-solid border-2 border-white-600" key="round_1">
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle">1</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-right">4</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-right">2</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-left">3</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                        </tr>
                        <tr className="border-solid border-2 border-white-600" key="round_2">
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle">2</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-right">3</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-left">1</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-right">4</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                        </tr>
                        <tr className="border-solid border-2 border-white-600" key="round_3">
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle">3</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-left">2</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-left">4</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-right">1</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                        </tr>
                        <tr className="border-solid border-2 border-white-600" key="round_4">
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle">4</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-left">1</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-right">3</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-1 bg-lime-900 text-left">2</td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                            <td className="border-solid border-2 border-white-600 opacity-80 px-1 py-6 bg-lime-900 align-middle"></td>
                        </tr>
                        <Copyright />

                    </tbody>
                </table>
                <PrinterIcon className="cursor-pointer" onClick={() => 
                {
                    handlePrint(null, () => contentToPrint.current);
                }} />
            </div>
        </>
    )


}