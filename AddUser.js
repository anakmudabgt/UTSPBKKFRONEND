// Import React dan hooks yang dibutuhkan
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Definisikan komponen AddUser
const AddUser = () => {
  // State hooks untuk menyimpan data formulir
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  // Gunakan hook useNavigate untuk melakukan navigasi
  const navigate = useNavigate();

  // Fungsi untuk menyimpan data baru saat formulir disubmit
  const saveUser = async (e) => {
    // Mencegah perilaku default form (misalnya, refresh halaman)
    e.preventDefault();

    try {
      // Melakukan permintaan POST ke API dengan menggunakan axios
      await axios.post('http://localhost:5000/list-artikel', {
        id,
        title,
        date,
        image,
        content,
      });

      // Navigasi kembali ke halaman utama setelah penyimpanan berhasil
      navigate('/');
    } catch (error) {
      // Tangkap dan log pesan kesalahan jika ada
      console.log(error);
    }
  };

  // Render tampilan formulir
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box">
          <h1
            style={{
              textAlign: 'center',
              fontSize: '30px',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.17)',
            }}
          >
            Add Data Form
          </h1>
          {/* Formulir dengan input untuk setiap field */}
          <form onSubmit={saveUser}>
            <div className="field">
              <label className="label">Id</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Id"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Tanggal</label>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Tanggal"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Image</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Link Image..."
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Content</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Sinopsis..."
                ></textarea>
              </div>
            </div>
            {/* Tombol untuk mengirimkan formulir */}
            <div className="field">
              <button type="submit" className="button is-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export komponen untuk digunakan di tempat lain
export default AddUser;
