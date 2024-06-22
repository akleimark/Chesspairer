import Navbar from "@/app/navbar";

const Chessplayers = () => {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1 className="text-3xl font-bold underline">chessplayers</h1>
        <table className="fancyTable">
          <thead>
            <tr>
              <th>FIDE-id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Club</th>
              <th>Federation</th>
            </tr>
          </thead>


        </table>
        
      </div>
      
    </>
  );
}

export default Chessplayers
  