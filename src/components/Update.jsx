import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storeUser = useLoaderData();
    const [user, setUser] = useState(storeUser);

    const handleUpdateWork = event => {
        event.preventDefault();
        // console.log(user);


        // CRUD - Update setup
        fetch(`http://localhost:5000/users/${storeUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('user updated')
                    // console.log(data);
                }

            })
    }


    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div>
            <h2>Please Update: {storeUser.title} </h2>
            <form onSubmit={handleUpdateWork}>
                <input onChange={handleInputChange} defaultValue={storeUser.title} type="text" name="title" placeholder='title' required />
                <br />
                <input onChange={handleInputChange} defaultValue={storeUser.desc} type="text" name="desc" placeholder='Description' required />
                <br />
                <button type='submit'>Update Item</button>
            </form>
        </div>
    );
};

export default Update;