import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import styles from "./../styles/Tasks.module.css";
import { NewTaskDialog } from "./NewTaskDialog";
import { EditTaskDialog } from "./EditTaskDialog";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { SignOutDialog } from "./SignOutDialog";
import moment from "moment";
import { CheckProgressDialog } from "./CheckProgressDialog";
import Image from "next/image"

const COLUMNS = [
    {
        Header: "",
        accessor: "edit",
        width: "5%",
    },
    {
        Header: "Task",
        accessor: "task", // accessor is the "key" in the data,
        width: "50%",
    },
    {
        Header: "Starts At",
        accessor: "starts_at",
    },
    {
        Header: "Ends At",
        accessor: "ends_at",
    },
    {
        accessor: "id",
    },
    {
        Header: "Progress",
        accessor: "checkProgress",
        width: "15%",
    },
];

export const BasicTable = ({ image, name, username, data }) => {
    const columns = useMemo(() => COLUMNS, []);
    const tableInstance = useTable({
        columns,
        data,
        initialState: {
            hiddenColumns: ["id"],
        },
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <>
            <div className={styles.nav}>
                <div className={styles.logoutButton}>
                    <SignOutDialog />
                </div>
                <div className={styles.userInfo}>
                    {name}
                    <Image width='35' height='35' alt="User's photo" src={image} className={styles.avatar}></Image>
                </div>
            </div>
            <div className={styles.tableContainer}>
                <NewTaskDialog username={username} />
                <table className={styles.table} {...getTableProps()}>
                    <thead className={styles.thead}>
                        {headerGroups.map((headerGroup, key) => {
                            return (
                                <tr key={key}
                                    className={styles.tr}
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers.map((column, key) => {
                                        return (
                                            <th key={key}
                                                className={styles.th}
                                                {...column.getHeaderProps({
                                                    style: {
                                                        width: column.width,
                                                    },
                                                })}
                                            >
                                                {column.render("Header")}
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>
                    <tbody className={styles.tbody} {...getTableBodyProps()}>
                        {rows.map((row, key) => {
                            prepareRow(row);
                            row.cells.forEach((c) => {
                                if (
                                    c.column.id === "starts_at" ||
                                    c.column.id === "ends_at"
                                ) {
                                    c.value = moment(c.value).format("HH:mm");
                                }
                                if (c.column.id === "edit") {
                                    c.value = (
                                        <>
                                            <EditTaskDialog
                                                username={username}
                                                taskParam={row['values']['task']}
                                                startsAtParam={
                                                    row["values"]["starts_at"]
                                                }
                                                endsAtParam={
                                                    row["values"]["ends_at"]
                                                }
                                                idParam={row["values"]["id"]}
                                            />
                                            <DeleteTaskDialog
                                                username={username}
                                                idParam={row["values"]["id"]}
                                            />
                                        </>
                                    );
                                }
                                if (c.column.id === "checkProgress") {
                                    let ends_at = new Date(row["values"]["ends_at"])
                                    ends_at.setSeconds(0)
                                    let current = new Date()
                                    current.setSeconds(0)
                                    console.log(ends_at, current);
                                    if (ends_at < current) {
                                        
                                        c.value = (<>Finished</>);
                                    } else {
                                        c.value = (
                                            <>
                                                <CheckProgressDialog
                                                    startsAtParam={
                                                        row["values"][
                                                            "starts_at"
                                                        ]
                                                    }
                                                    endsAtParam={
                                                        row["values"]["ends_at"]
                                                    }
                                                />
                                            </>
                                        );
                                    }
                                }
                            });
                            return (
                                <tr key={key}
                                    className={styles.tr}
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map((rowCell, key) => {
                                        return (
                                            <td key={key}
                                                className={styles.td}
                                                {...rowCell.getCellProps()}
                                            >
                                                {rowCell.value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
