import { gql } from "@apollo/client";

export const createUserMutation = gql`
    mutation createUser($username: String, $password: String) {
        createUser(username: $username, password: $password) {
            id
            username
            password
        }
    }
`;

export const createTaskMutation = gql`
    mutation createTask(
        $username: String
        $task: String
        $startsAt: DateTime
        $endsAt: DateTime
    ) {
        createTask(
            username: $username
            task: $task
            startsAt: $startsAt
            endsAt: $endsAt
        ) {
            id
            user_id
            task
            starts_at
            ends_at
            create_date
        }
    }
`;

export const updateTaskMutation = gql`
    mutation updateTask(
        $id: String
        $username: String
        $task: String
        $startsAt: DateTime
        $endsAt: DateTime
    ) {
        updateTask(
            id: $id
            username: $username
            task: $task
            startsAt: $startsAt
            endsAt: $endsAt
        ) {
            id
            user_id
            task
            starts_at
            ends_at
        }
    }
`;

export const deleteTaskMutation = gql`
    mutation deleteTask($id: String, $username: String) {
        deleteTask(id: $id, username: $username) {
            id
            successful
            message
        }
    }
`;
