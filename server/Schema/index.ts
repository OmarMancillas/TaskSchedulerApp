import {GraphQLObjectType, GraphQLSchema} from "graphql";
import { getUserByUsername, GET_ALL_USERS } from './Queries/User';
import {CREATE_USER, DELETE_USER, UPDATE_PASSWORD} from './Mutations/User';
import { getAllTasks, getAllTasksByUser, getSelectedTask } from "./Queries/Tasks";
import { createTask, updateTask, deleteTask } from "./Mutations/Tasks";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS,
        getAllTasks: getAllTasks,
        getAllTaskByUser: getAllTasksByUser,
        getSelectedTask: getSelectedTask,
        getUserByUsername: getUserByUsername
    }//properties of the object
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updatePassword: UPDATE_PASSWORD,
        createTask: createTask,
        updateTask: updateTask,
        deleteTask: deleteTask
    }//properties of the object
});


export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
