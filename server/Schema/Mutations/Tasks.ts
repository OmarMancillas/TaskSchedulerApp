import { graphql, GraphQLInt, GraphQLString, graphqlSync } from 'graphql';
import { TaskType } from '../TypeDefs/Task';
import { Tasks } from '../../Entities/Tasks';
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const { v4: uuidv4 } = require('uuid');
import fs from 'fs';
import { ResponseType } from '../TypeDefs/Response';
import { Users } from '../../Entities/Users';
import { GraphQLDateTime } from "graphql-iso-date"

export const createTask = {
    type: TaskType,
    args: {
        username: { type: GraphQLString },
        task: { type: GraphQLString },
        startsAt : {type: GraphQLDateTime},
        endsAt : {type: GraphQLDateTime}
    },
    async resolve(parent: any, args: any) {
        const uuid = uuidv4()
        const { username, task, startsAt, endsAt } = args;
        const user =  await Users.findOne({username : username})
        
        await Tasks.insert({ id : uuid, user_id:user?.id, task: task, starts_at: startsAt, ends_at: endsAt });
        return { id : uuid, user_id: user?.id, task};
    },
};

function replacer(key: any, value: any) {
    if (value === '') {
        return undefined;
    }
    return value;
}

export const updateTask = {
    type: TaskType,
    args: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        task: {type: GraphQLString}, 
        startsAt : {type: GraphQLDateTime},
        endsAt : {type: GraphQLDateTime}
    },
    async resolve(parent: any, args: any) {
        const { id, username, task, startsAt, endsAt } = args;
        const user =  await Users.findOne({username : username})

        const user_id = user?.id
        const taskToUpdate = await Tasks.findOne({
            id: id,
            user_id: user_id,
        });
        
        if (taskToUpdate) {
            taskToUpdate.task = task ? task : taskToUpdate.task
            taskToUpdate.starts_at = startsAt ? startsAt : taskToUpdate.starts_at
            taskToUpdate.ends_at = endsAt ? endsAt : taskToUpdate.ends_at

            await taskToUpdate.save();
            
            return { id , user_id: user?.id, task, starts_at:startsAt, ends_at:endsAt };
        }
        return {successful: false, message:"Task not found!"};
    },
};

export const deleteTask = {
    type: ResponseType,
    args: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, username } = args;
        const user = await Users.findOne({username: username})
        const user_id = user?.id
        const task = await Tasks.findOne({ id: id, user_id: user_id });
        await Tasks.delete({ id: id, user_id: user_id });
        return {successful: true, message: "Delete successful!"};
    },
};
