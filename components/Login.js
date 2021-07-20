import styles from "../styles/Login.module.css";
import { signIn } from "next-auth/client";
import React, { useState } from "react";
import Head from "next/head";
import { createUserMutation } from "./../graphql/Mutations";
import { useMutation } from "@apollo/client";
import GitHubIcon from "@material-ui/icons/GitHub";
import FunctionsIcon from '@material-ui/icons/Functions';
import { Button } from "@material-ui/core/";

const Login = ({ username, password, setPassword, setUsername }) => {
    const [toggle, handleToggle] = useState(false);
    const [createUser, { error, data }] = useMutation(createUserMutation);
    return (
        <>
            <Head>
                <title>TaskScheduler.js</title>
            </Head>
            <h1 className={styles.title}>TaskScheduler.js</h1>
            <div className={styles.form}>
                <p className={styles.loginHeader}>
                    {toggle ? "Sign Up" : "Log In With "}
                    <a
                        href=""
                        className={styles.bold}
                        onClick={(e) => {
                            e.preventDefault();
                            handleToggle(!toggle);
                        }}
                    ></a>
                </p>
                <div className={styles.container}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            signIn("github", {
                                callbackUrl:
                                    "http://localhost:3000/taskScheduler",
                            });
                        }}
                    >
                        Log In with Github
                        <GitHubIcon />
                    </Button><br/><br/>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            signIn("google", {
                                callbackUrl:
                                    "http://localhost:3000/taskScheduler",
                            });
                        }}
                    >
                        Log In with Google
                        <FunctionsIcon />
                    </Button>
                </div>
            </div>
        </>
    );
};
export default Login;
