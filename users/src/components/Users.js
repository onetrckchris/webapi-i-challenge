import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                setUsers(response);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    console.log(users);

    return (
        <div>
            {/* {users.map(user => (
                <h1>{user.name}</h1>
            ))} */}
        </div>
    )
}

export default Users;