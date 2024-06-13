import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function PostIndex() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDataPosts = async () => {
        try {
            const response = await api.get('/api/employees');
            console.log('API response:', response); // Log seluruh response
            console.log('response.data:', response.data); // Log response.data

            if (response.data) {
                setPosts(response.data); // Sesuaikan akses data sesuai dengan struktur response
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataPosts();
    }, []);

    const deletePost = async (id) => {
        
        //delete with api
        await api.delete(`/api/employees/${id}`)
            .then(() => {
                //call method "fetchDataPosts"
                fetchDataPosts();

            })
    }

    if (loading) {
        return (
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-info">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="alert alert-danger">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/posts/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW POST</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Identity Number</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Birth Day</th>
                                        <th scope="col" style={{ width: '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts.length > 0
                                            ? posts.map((post, index) => (
                                                <tr key={index}>
                                                    <td>{post.name}</td>
                                                    <td>{post.identity_number}</td>
                                                    <td>{post.email}</td>
                                                    <td>{post.birth_day}</td>
                                                    <td className="text-center">
                                                        <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                        <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            ))
                                            : <tr>
                                                <td colSpan="4" className="text-center">
                                                    <div className="alert alert-danger mb-0">
                                                        Data Belum Tersedia!
                                                    </div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
