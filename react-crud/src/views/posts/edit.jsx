import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

export default function PostEdit() {
    const [name, setName] = useState('');
    const [identity_number, setIdentity_number] = useState('');
    const [email, setEmail] = useState('');
    const [birth_day, setBirth_day] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const fetchDetailPost = async () => {
        try {
            const response = await api.get(`/api/employees/${id}`);
            console.log('Response data:', response.data);

            const { name, identity_number, email, birth_day } = response.data;
            setName(name);
            setIdentity_number(identity_number);
            setEmail(email);
            setBirth_day(birth_day);
        } catch (error) {
            console.error("Error fetching the post details", error);
        }
    };

    useEffect(() => {
        fetchDetailPost();
    }, []);

    const updatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('identity_number', identity_number);
        formData.append('email', email);
        formData.append('birth_day', birth_day);
        formData.append('_method', 'PUT');

        try {
            await api.post(`/api/employees/${id}`, formData);
            navigate('/posts');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={updatePost}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                    {errors.name && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.name[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Identity Number</label>
                                    <input type="text" className="form-control" value={identity_number} onChange={(e) => setIdentity_number(e.target.value)} placeholder="Identity Number" />
                                    {errors.identity_number && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.identity_number[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email</label>
                                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    {errors.email && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.email[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Birth Day</label>
                                    <input type="date" className="form-control" value={birth_day} onChange={(e) => setBirth_day(e.target.value)} placeholder="Birth Day" />
                                    {errors.birth_day && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.birth_day[0]}
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
