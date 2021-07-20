// import { useSession, signIn, signOut } from "next-auth/client";
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
                    {/* <div className={styles.field}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        {toggle ? (
                            <button
                                className={styles.signButton}
                                onClick={() => {
                                    createUser({
                                        variables: {
                                            username: username,
                                            password: password,
                                        },
                                    });
                                    signIn("google", {
                                        callbackUrl:
                                            "http://localhost:3000/taskScheduler",
                                    });
                                }}
                            >
                                Sign Up
                            </button>
                        ) : (
                            <button
                                className={styles.signButton}
                                onClick={() => {
                                    createUser({
                                        variables: {
                                            username: username,
                                            password: password,
                                        },
                                    });
                                    // signIn("google", {
                                    //     callbackUrl:
                                    //         "http://localhost:3000/taskScheduler",
                                    // })
                                }}
                            >
                                Log In
                            </button>
                        )}
                    </div>
                    <div className={styles.account}>
                        <p>
                            {toggle
                                ? "Already have an account? "
                                : "Don’t you have an account? "}
                            <a
                                href=""
                                className={styles.bold}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleToggle(!toggle);
                                }}
                            >
                                {toggle ? "Log in" : "Sign up"}
                            </a>
                        </p>
                        <p>or continue with...</p>
                    </div> */}
                    {/* <div className="providers"> */}
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
                    {/* <button
                        className={styles.google}
                        title="Continue with Google"
                        onClick={() => {
                            signIn("google", {
                                callbackUrl:
                                    "http://localhost:3000/taskScheduler",
                            });
                        }}
                    >
                        <img
                            src={"./assets/Google-Mark-32px.png"}
                            // className={styles.logo}
                        />
                    </button>
                    <button
                        className={styles.google}
                        title="Continue with Github"
                        onClick={() =>
                            signIn("github", {
                                callbackUrl:
                                    "http://localhost:3000/taskScheduler",
                            })
                        }
                    >
                        <img
                            src={"./assets/GitHub-Mark-32px.png"}
                            // className={styles.logo}
                        />
                    </button> */}
                    {/* </div> */}
                </div>
            </div>
        </>
    );
};
export default Login;
