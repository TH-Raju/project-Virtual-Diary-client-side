import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [display, setDisplay] = useState(users);
    const [user, setUser] = useState({});

    const handleAddWork = event => {
        event.preventDefault();
        console.log(user);


        // CRUD - Create setup
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

    // CRUD - Delet Setup

    const handleDelet = usr => {
        const agree = window.confirm(`Are you sure to delet? ${usr.title} `);
        if (agree) {
            fetch(`http://localhost:5000/users/${usr._id}`, {
                method: 'DELETE'

            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.deletedCount > 0) {
                        alert("Deleted Successfully");
                        const remainingUser = display.filter(usar => usar._id !== usr._id);

                        setDisplay(remainingUser);
                    }
                });
        }
    }



    return (
        // todo
        <div>
            {/* CRUD - Create Setup */}
            <h1>Add Your Task</h1>
            <form onSubmit={handleAddWork}>
                <input onBlur={handleInputBlur} type="text" name="title" placeholder='title' required />
                <br />
                <input onBlur={handleInputBlur} type="text" name="desc" placeholder='Description' required />
                <br />
                <button type='submit'>Add Item</button>
            </form>


            <div>

                {/* CRUD - Delet Setup */}
                <h2> Your Total Task: {display.length}</h2>
                {
                    display.map(usr =>
                        <p key={usr._id}>
                            {usr.title} {usr.desc}
                            <button onClick={() => handleDelet(usr)} >X</button>
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default Home;