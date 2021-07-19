import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date"

export const TaskType = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
        id: { type: GraphQLString },
        user_id: { type: GraphQLInt },
        task: { type: GraphQLString },
        // hours_assigned: {type: GraphQLString},
        starts_at:{type: GraphQLDateTime},
        ends_at:{type: GraphQLDateTime},
        create_date: { type: GraphQLString },
    }),
});
