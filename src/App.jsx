import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import "./App.css";
import {Peserta} from './components/Peserta';
import DataPeserta from './components/DataPeserta';
import FormPeserta from './components/FormPeserta'; 

function App() {
  // <NewPeserta nama="Budi" Jurusan="Web" />
  const [listPeserta, setListPeserta] = useState(Peserta);
  const [editPeserta, setEditPeserta] = useState(null);
    // console.log(dataForm);



 const handleSubmit = (dataPeserta) => {
  if (editPeserta){
    setListPeserta(listPeserta.map((item) => (item.id === dataPesertaid ? dataPeserta : item)));
    setEditPeserta(null);
  }else{
    setListPeserta([...listPeserta, dataPeserta]);
  }
 };

  const handleHapus = (id) => {
    setListPeserta(listPeserta.filter((item) => item.id !== id));
    if(id === editPeserta.id) {
      setEditPeserta(null);
    }
  };
 
    return (
      <>
    <FormPeserta onSimpan={handleSubmit} pesertaEdit={editPeserta} />
    {/* map: looping jg */}
    {listPeserta.map((item) => (
      <DataPeserta key={item.id} peserta={item} onEdit={setEditPeserta} onHapus={handleHapus} />
    ))}
    
    {/* listPeserta.map((item) => {
      <DataPeserta key={item.id} nama={item.nama} jurusan={item.Jurusan} />
      })*/}
  </>
  );
  
}

export default App

// kalo data nya ga mau di ubah, bisa pake (const listPeserta = Peserta;) aja, ga perlu pake useState. tapi kalo mau diubah, pake useState.
// spread operator [...listPeserta] (titik titik) untuk ambil data sebelumnya, terus tambahin data baru yang di onSimpan. pake spread operator [...listPeserta] biar ga hilang data sebelumnya.