import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API } from '../API';
import '../styles/ReadStyle.css'; 

function Read() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API}/users/${id}`);
                const data = await response.json();
                if (response.ok) setUser(data);
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <div className="read-container"><h2>Loading...</h2></div>;

    if (!user) return (
        <div className="read-container">
            <h2>User Not Found</h2>
            <Link to="/" className="btn-back">Back to Table</Link>
        </div>
    );

    return (
        <div className="read-container">
            <h2>User Profile</h2>
            
            <div className="user-details-group">
                <strong>ID:</strong> <span>{user.id}</span>
            </div>
            <div className="user-details-group">
                <strong>Name:</strong> <span>{user.name}</span>
            </div>
            <div className="user-details-group">
                <strong>Email:</strong> <span>{user.email}</span>
            </div>
            <div className="user-details-group">
                <strong>Phone:</strong> <span>{user.phone}</span>
            </div>

            <div className="read-actions">
                <Link to="/" className="btn-back">Back to Table</Link>
                <Link to={`/edit/${user.id}`} className="edit" style={{padding: '10px 20px', borderRadius: '5px', textDecoration: 'none'}}>Edit User</Link>
            </div>
        </div>
    );
}

export default Read;