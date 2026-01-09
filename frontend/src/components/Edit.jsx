import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../API';
import '../styles/EditStyle.css';
import { TbCancel } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API}/users/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                }
            } catch (err) {
                toast.error("Error fetching user data");
                console.error("Error fetching user:", err);
            }
        };
        fetchUserData();
    }, [id]);

    async function handleUpdate(e) {
        e.preventDefault();

        if (!email.includes("@gmail.com") && !email.includes("@yahoo.com")) {
            toast.error("Input a correct Gmail or Yahoo address");
            return;
        }

        if (!phone.startsWith("09") || phone.length !== 11) {
            toast.error("Input a correct phone number (starts with 09 and is 11 digits)");
            return;
        }

        try {
            const response = await fetch(`${API}/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone }),
            });

            if (response.ok) {
                toast.success("User updated successfully!");
                navigate("/");
            } else {
                toast.error("Failed to update user");
            }
        } catch (err) {
            toast.error("Update Error");
            console.error("Update Error:", err);
        }
    };

    return (
        <div className="main-content">
            <div className="edit-container">
                <h2>Edit User Details</h2>
                <form onSubmit={handleUpdate}>
                    <div className="edit-form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-actions">
                        <Link to="/" className="btn-cancel"><TbCancel/></Link>
                        <button type="submit" className="btn-update"><FaCheck/></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;