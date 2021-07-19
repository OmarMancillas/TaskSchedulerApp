import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import styles from "./../styles/Tasks.module.css";
import { NewTaskDialog } from "./NewTaskDialog";
import { EditTaskDialog } from "./EditTaskDialog";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { Button, BottomNavigation } from "@material-ui/core";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { signOut } from "next-auth/client";
import { SignOutDialog } from "./SignOutDialog"
import moment from "moment";

const COLUMNS = [
    {
        Header: "",
        accessor: "edit",
        width: "5%",
    },
    {
        Header: "Task",
        accessor: "task", // accessor is the "key" in the data,
        width: "75%",
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
];

export const BasicTable = ({ image, name, username, data }) => {
    const columns = useMemo(() => COLUMNS, []);
    const [open, setOpen] = useState(false);
    const tableInstance = useTable({
        columns,
        data,
        initialState: {
            hiddenColumns: ["id"],
        },
    });
    // const [getAllTasksByUser, { error, data_ }] = useQuery(getAllTasksByUserQuery);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    const handleClickOpen = () => {
        // setOpen(true);
    };

    // rows.forEach(r=>{
    //     r.cells
    // })

    return (
        <>
            <div className={styles.nav}>
                {name}
                <img className={styles.avatar} src={image}></img>
            </div>
            <div className={styles.tableContainer}>
                <NewTaskDialog username={username} />
                <table className={styles.table} {...getTableProps()}>
                    <thead className={styles.thead}>
                        {headerGroups.map((headerGroup) => {
                            return (
                                <tr
                                    className={styles.tr}
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers.map((column) => {
                                        return (
                                            <th
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
                        {
                            // console.log(rows),
                            // rows.forEach(r=>{
                            //     r.cells.forEach(c=>{
                            //         if(c.column.id==='starts_at' || c.column.id==='ends_at'){
                            //             c.value = moment(c.value).format('HH:mm:ss')
                            //         }
                            //     })
                            // }),
                            rows.map((row) => {
                                prepareRow(row);
                                // console.log(row);
                                row.cells.forEach((c) => {
                                    if (
                                        c.column.id === "starts_at" ||
                                        c.column.id === "ends_at"
                                    ) {
                                        // console.log(c.value);
                                        c.value = moment(c.value).format(
                                            "HH:mm"
                                        );
                                        // console.log(c.value);
                                    }
                                    if (c.column.id === "edit") {
                                        // console.log(row);
                                        c.value = (
                                            <>
                                                <EditTaskDialog
                                                    username={username}
                                                    taskParam={
                                                        c.row.cells[1].value
                                                    }
                                                    startsAtParam={
                                                        row["values"][
                                                            "starts_at"
                                                        ]
                                                    }
                                                    endsAtParam={
                                                        row["values"]["ends_at"]
                                                    }
                                                    idParam={
                                                        row["values"]["id"]
                                                    }
                                                />
                                                <DeleteTaskDialog
                                                    username={username}
                                                    idParam={
                                                        row["values"]["id"]
                                                    }
                                                />
                                            </>
                                        );
                                    }
                                });
                                return (
                                    <tr
                                        className={styles.tr}
                                        {...row.getRowProps()}
                                    >
                                        {row.cells.map((rowCell) => {
                                            return (
                                                <td
                                                    className={styles.td}
                                                    {...rowCell.getCellProps()}
                                                >
                                                    {/* {rowCell.render("Cell")} */}
                                                    {rowCell.value}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <div className={styles.footer}>
                    <BottomNavigation>
                        <SignOutDialog/>
                    </BottomNavigation>
                </div>
            </div>
        </>
    );
};
