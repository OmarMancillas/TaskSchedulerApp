import Login from "../components/Login";
import { signIn, getSession } from "next-auth/client";
import React, { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Login
                signIn={signIn}
                username={username}
                password={password}
                setPassword={setPassword}
                setUsername={setUsername}
            />
        </>
    );
};

export default LoginForm;
