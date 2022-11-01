import React, { useState } from 'react';

const Home = () => {
    const [user, setUser] = useState({});

    const handleAddWork = event => {
        event.preventDefault();
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert("Task Added");
                    event.target.reset();
                }
                console.log(data)
            })
    }


    const handleInputBlur = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        // todo
        <div>
            <h1>Add Your Task</h1>
            <form onSubmit={handleAddWork}>
                <input onBlur={handleInputBlur} type="text" name="title" placeholder='title' required />
                <br />
                <input onBlur={handleInputBlur} type="text" name="desc" placeholder='Description' required />
                <br />
                <button type='submit'>Add Item</button>
            </form>
        </div>
    );
};

export default Home;