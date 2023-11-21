// Import React dan hooks yang diperlukan
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Definisikan komponen UserList
const UserList = () => {
  // State hook untuk menyimpan data artikel
  const [Users, setUsers] = useState([]);

  // Hook useEffect untuk memanggil getUser() setelah komponen dipasang
  useEffect(() => {
    getUser();
  }, []);

  // Fungsi untuk mengonfirmasi dan menghapus artikel berdasarkan ID
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Apakah anda ingin menghapus data ini??');
    if (confirmDelete) {
      try {
        // Menggunakan axios untuk mengirim permintaan DELETE ke API
        await axios.delete(`http://localhost:5000/list-artikel/${id}`);
        // Setelah penghapusan berhasil, panggil getUser() untuk memperbarui daftar artikel
        getUser();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Fungsi untuk mengambil data artikel dari API
  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/list-artikel");
    // Set data artikel ke dalam state Users
    setUsers(response.data);
  };

  // Log state Users ke konsol untuk debug
  console.log("Users State:", Users);

  // Render tampilan daftar artikel
  return (
    <div style={{
      backgroundImage: `url('https://wallpapers.com/images/file/pastel-aesthetic-grid-3840-x-2160-background-s8nglq2alls0g623.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-three-quarters">
            <p style={{
              textAlign: 'center',
              fontSize: '50px',
              color: 'black',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontFamily: 'Helvetica-Oblique'
            }}>ARTIKEL</p>
            {/* Tautan ke halaman tambah artikel */}
            <Link to={'add'} className='button is-success mt-5 mb-4' style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'}}>Tambah</Link>
            {/* Tabel untuk menampilkan data artikel */}
            <table className='table is-fullwidth is-hoverable' style={{ 
              boxShadow: '0px 5px 10 px rgba(0,0,0,0.1)', 
              borderCollapse: 'collapse',
              border: '1px',
              }}>
              <thead style={{ borderBottom: '2px solid #ddd', background: '#FFE4E17'}}>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Image</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {/* Membuat baris tabel berdasarkan data artikel */}
                {Users ? (
                  Users.map((item, index) => (
                    <tr key={item.id} style={{ background : index % 2 === 0 ? '#D3D3D3' : '#FFE4E1', transition : 'background 0.3s'}} className="table-row-hover">
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.date}</td>
                      <td>
                        {/* Menampilkan gambar atau teks "Tidak ada gambar" jika tidak ada gambar */}
                        {item.image ? (
                          <img
                            src={item.image}
                            alt="Pictures"
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />
                        ) : (
                          "Tidak ada gambar"
                        )}
                      </td>
                      <td>
                        {/* Menampilkan konten dengan membatasi panjangnya */}
                        <span style={{
                          display: 'block',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          maxWidth: '200px',
                        }}>{item.content}</span>
                        </td>
                      {/* Tautan untuk mengedit atau menghapus artikel */}
                      <td>
                        <Link to={`edit/${item.id}`} className='button is-small is-warning mr-2 mb-2' style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'}}>Edit</Link>
                        <Link onClick={() => deleteUser(item.id)} className='button is-small is-danger' style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'}}>Delete</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Render baris "Loading..." jika data belum diambil
                  <tr>
                    <td colSpan="6"></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export komponen untuk digunakan di tempat lain
export default UserList;
