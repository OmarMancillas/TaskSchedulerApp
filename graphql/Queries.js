import { gql } from "@apollo/client";

export const getAllTasksByUserQuery = gql`
    query getTasksByUser($username:String){
        getAllTaskByUser(username:$username){
            id
            user_id
            task
            create_date
            starts_at
            ends_at
        }
    }  
`;

export const getUserByUsernameQuery = gql`
    query getUserByUsername($username:String){
        getUserByUsername(username:$username){
            id
            username
        }
    }  
`;
