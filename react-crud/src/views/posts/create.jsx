//import useState
import { useState } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

export default function PostCreate() {

    //define state
    const [name, setName] = useState('');
    const [identity_number, setIdentity_number] = useState('');
    const [email, setEmail] = useState('');
    const [birth_day, setBirth_day] = useState('');

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //method handle file change
    const handleFileChange = (e) => {
        setName(e.target.files[0]);
    }

    //method store post
    const storePost = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('name', name);
        formData.append('identity_number', identity_number);
        formData.append('email', email);
        formData.append('birth_day', birth_day);

        //send data with API
        await api.post('/api/employees', formData)
            .then(() => {
                navigate('/posts');
            })
            .catch(error => {
                setErrors(error.response.data);
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storePost}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                                    {
                                        errors.name && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.name[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Identiry Number</label>
                                    <input type="text" className="form-control" onChange={(e) => setIdentity_number(e.target.value)} placeholder="Identiry number"/>
                                    {
                                        errors.identity_number && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.identity_number[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email</label>
                                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    {
                                        errors.email && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.email[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Birth Day</label>
                                    <input type="date" className="form-control" onChange={(e) => setBirth_day(e.target.value)} placeholder="Birth Day"/>
                                    {
                                        errors.birth_day && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.birth_day[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}