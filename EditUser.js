// Import React dan hooks yang diperlukan
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Definisikan komponen EditUser
const EditUser = () => {
  // State hooks untuk menyimpan data artikel yang akan diedit
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  
  // Hook useNavigate untuk melakukan navigasi
  const navigate = useNavigate();

  // Mengambil parameter 'id' dari URL
  const { id } = useParams();

  // Fungsi untuk mendapatkan data artikel berdasarkan ID
  const getListDataById = async () => {
    const response = await axios.get(`http://localhost:5000/list_artikel/${id}`);
    // Mengisi state dengan data artikel yang akan diedit
    setTitle(response.data.response.title);
    setDate(response.data.response.date);
    setImage(response.data.response.image);
    setContent(response.data.response.content);
  };

  // Hook useEffect untuk memanggil getListDataById() setelah komponen dipasang dan ketika 'id' berubah
  useEffect(() => {
    getListDataById();
  }, [id]);

  // Fungsi untuk mengirimkan permintaan PATCH ke API untuk mengupdate artikel
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/list-artikel/${id}`, {
        title,
        date,
        image,
        content,
      });
      // Setelah pembaruan berhasil, navigasi kembali ke halaman utama
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  // Render tampilan formulir untuk mengedit artikel
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box">
          <h1
            style={{
              textAlign: 'center',
              fontSize: '30px',
              color: '#3273dc',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.17)',
            }}
          >
            Edit Data Form
          </h1>
          {/* Formulir untuk mengedit artikel */}
          <form onSubmit={updateUser}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={date || ''}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Image</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={image || ''}
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
                  value={content || ''}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Sinopsis..."
                ></textarea>
              </div>
            </div>
            {/* Tombol untuk menyimpan perubahan */}
            <div className="field">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export komponen untuk digunakan di tempat lain
export default EditUser;
