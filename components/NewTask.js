import React, { useState } from "react";
import styles from "./../styles/Tasks.module.css";

const MOCK_DATA = [
    // {
    //     task: "Task 1",
    //     hoursAssigned: "1",
    // },
    // {
    //     task: "Task 2",
    //     hoursAssigned: "3",
    // },
    // {
    //     task: "Task 3",
    //     hoursAssigned: "1",
    // },
    // {
    //     task: "Task 4",
    //     hoursAssigned: "1",
    // },
];

const COLUMNS = [
    {
        Header: "Task",
        accessor: "task", // accessor is the "key" in the data,
        width: "80%",
    },
    {
        Header: "Hours Assigned",
        accessor: "hoursAssigned",
    },
];

export const NewTask = () => {
    return (
        <>
            <div className={styles.form}>
                <div className={styles.container}>
                    <div className={styles.field}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="New Task"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Assigned Hours"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            className={styles.signButton}
                            onClick={() => {
                                // createUser({
                                //   variables: { username: username, password: password },
                                // });
                            }}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
