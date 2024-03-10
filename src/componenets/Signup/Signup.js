import React from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';


import '../Login/Login.css'

const SignupComponent = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };


    const handleSignup = async (event) => {
        event.preventDefault()
        const response = await axios.post('https://routine-generator-backend.onrender.com/student/sign-up',{name,email,password})

        if(response.data.status === true){
            const cookies = new Cookies();
            cookies.set('token', response.data.data.token, { path: '/' });
            window.location.href = '/home';
        }else{
            setError(response.data.message)
        }
    }

    return (
        <div className='parent_login'>
            <div className='left_image'>
                <img src='https://img.lovepik.com/photo/45009/7677.jpg_wh860.jpg' />
            </div>
            <div className='right_form'>
                <h3>Hey, Signup please!</h3>
                {error ? <h5 className='error'>{error}</h5> : ''}
                <form>
                    <input onChange={handleChangeName} type='text' placeholder='Name'/>
                    <input onChange={handleChangeEmail} type='text' placeholder='Email'/>
                    <input onChange={handleChangePassword} type='password' placeholder='Password'/>
                    <button onClick={handleSignup}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default SignupComponent;