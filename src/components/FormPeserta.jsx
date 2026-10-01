import React, { useState, useEffect } from "react";
const FormPeserta = ({ onSimpan, onCancel, pesertaEdit }) => {
    const [nama, setNama] = useState("");
    const [jurusan, setJurusan] = useState("");
    const [error, setError] = useState("");

    //  useEffect = hasil dari request dari server, atau data yang di edit, atau data yang di ambil dari local storage. dirender cuma 1 kali.
    //  useEffect munculin data yg awalnya mau di edit, terus di tampilin di form. kalo ga ada data yg mau di edit, form nya kosong.
    
    const handleSimpan = (e) => {
        e.preventDefault();
        if (!nama.trim() || !jurusan.trim()) {
            setError("Mohon isi nama dan jurusan");
        return;

        }
        onSimpan({
        id: pesertaEdit ? pesertaEdit.id : Date.now(),
        nama,
        jurusan,
    })
    setNama("");
    setJurusan("");
    }
    

    return (
        <form
            onSubmit={handleSimpan}
            method="post"
            style={{
                background: "linear-gradient(to right, #ecc824b6, #f17e3cb6)",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "20px",
            }}
        >
            <h3>Tambah Peserta</h3>
            <div style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap"
            }}
            >

                <input
                    type="text"
                    placeholder="Nama Peserta"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    style={{
                        padding: "8px",
                    }}
                />

                <input
                    type="text"
                    placeholder="Jurusan"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    style={{
                        padding: "8px",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        background: "#e72184",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Simpan
                </button>
            </div>
        </form>
    );
}
export default FormPeserta;