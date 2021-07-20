import { BasicTable } from "../components/BasicTable";
import { getSession, signOut } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { getAllTasksByUserQuery } from "./../graphql/Queries";

const TaskScheduler = ({ session }) => {
    const { image, name, email } = session.user;
    const { loading, error, data } = useQuery(getAllTasksByUserQuery, {
        variables: { username: session.user.email },
    });
    
    if (loading) return (<p>Loading ...</p>);

    const data_ = data ? data.getAllTaskByUser : null;
    return (
        <>
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
