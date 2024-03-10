import React from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';


import './Login.css'

const LoginComponent = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };


    const handleLogin = async (event) => {
        event.preventDefault()
        const response = await axios.post('https://routine-generator-backend.onrender.com/student/sign-in',{email,password})

        if(response.data.status === true){
            const cookies = new Cookies();
            cookies.set('token', response.data.data.user.token, { path: '/' });
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
                <h3>Hey, Login please!</h3>
                {error ? <h5 className='error'>{error}</h5> : ''}
                <form>
                    <input onChange={handleChangeEmail} type='text' placeholder='Email'/>
                    <input onChange={handleChangePassword} type='password' placeholder='Password'/>
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;