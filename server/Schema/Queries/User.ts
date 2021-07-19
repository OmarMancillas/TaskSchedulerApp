import {UserType} from "../TypeDefs/User";
import {GraphQLList, GraphQLString} from "graphql";
import { Users } from './../../Entities/Users';

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve(){
        return Users.find();
    }
};

export const getUserByUsername = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { username } = args;
        const user = await Users.findOne({username: username})
        
        return (user)
    },

}
