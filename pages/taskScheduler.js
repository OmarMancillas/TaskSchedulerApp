import { BasicTable } from "../components/BasicTable";
import { getSession, signOut } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { NewTask } from "../components/NewTask";
import { getAllTasksByUserQuery } from "./../graphql/Queries";
import {} from "./../graphql/Mutations";

const TaskScheduler = ({ session }) => {
    const { image, name, email } = session.user;
    const { loading, error, data } = useQuery(getAllTasksByUserQuery, {
        variables: { username: session.user.email },
    });
    
    // console.log(data ? data.getAllTaskByUser : null);
    if (loading) return (<p>Loading ...</p>);

    const data_ = data ? data.getAllTaskByUser : null;
    return (
        <>
            {/* <Nav image={image} name={name} title={"Your Designs"} /> */}
            {/* <NewTask /> */}
            <BasicTable
                image={image}
                name={name}
                username={email}
                data={data_}
            />
        </>
    );
};

export default TaskScheduler;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
}
