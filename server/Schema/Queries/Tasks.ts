import { GraphQLList, GraphQLString } from "graphql";
import { TaskType } from "../TypeDefs/Task";
import { JsonType } from "../TypeDefs/Response"
import { Tasks } from "../../Entities/Tasks";
import { Users } from "../../Entities/Users";

export const getAllTasksByUser = {
    type: new GraphQLList(TaskType),
    args: {
        username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        let user = await Users.findOne({username:args.username})
        
        if(!user){
            await Users.insert({username: args.username, password: " "})
            user = await Users.findOne({username:args.username})
        }
        const user_id = user?.id;
        const tasks = await Tasks.find({ user_id: user_id });
        return (tasks).sort((a, b)=>{
            if(a.create_date>b.create_date){
                return 1;
            }else if(a.create_date<b.create_date){
                return -1
            }
            return 0
        })
    },
};

export const getSelectedTask = {
    type: TaskType,
    args: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { id, username } = args;
        const user = await Users.findOne({username: username})
        const task = await Tasks.findOne({ id: id, user_id: user?.id });
        
        return (args)
    },
};

export const getAllTasks = {
    type: new GraphQLList(TaskType),
    async resolve() {
        const tasks = await Tasks.find()
        return tasks;
    },
};