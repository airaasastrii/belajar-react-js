// function DataPeserta (){}

const DataPeserta = ({ peserta, onHapus, onEdit }) => {
    return (
        <>
        <div 
        style={{ 
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "8px",
            margin: "8px",
            boxShadow: "0 0px 4px #000",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            background: "#f792b9",
        }}
        >
            <div>
                <h4 style={{ margin: "0 0 6px 0", fontSize: "18px"}}>Nama: {peserta.nama}</h4>
                <p>Jurusan: {peserta.jurusan}</p>
            </div>
        </div>

        <div style={{ 
            display: "flex",
            gap: "8px",
         }}>
            <button onClick={() =>onEdit(peserta) }>Edit</button>
            <button onClick={() =>onHapus(peserta.id)}>Hapus</button>
        </div>
        </>
    );
};

export default DataPeserta;