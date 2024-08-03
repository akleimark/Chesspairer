import { ToolsButtonPanel, TournamentButtonPanel } from "../components/Buttonpanels"
import { Lato } from "next/font/google";
const lato = Lato({subsets: ["latin"], weight:'400'});

export default function ToolsLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className={`${lato.className} h-full overflow-hidden`}>            
        {children}        
      </div>
      <TournamentButtonPanel />
    </>    
  )
}