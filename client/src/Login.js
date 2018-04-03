
import React from 'react'

const Login = () => (
    <div className="tile" >
        <form>
            <div>
            <label>Username</label>
            <input type="text" />
            </div>
            <div>
            <label>Password</label>
            <input type="text" />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
);


export default Login;
