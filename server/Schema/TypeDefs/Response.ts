import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { TaskType } from "./Task"

export const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        id: {type: GraphQLID},
        successful: {type: GraphQLBoolean},
        message: {type: GraphQLString}
    })
});

export const JsonType = new GraphQLObjectType({
    name: 'Json',
    fields: () => ({
        object: {type: TaskType},
        jsonData: {type: GraphQLJSON},
    })
})
