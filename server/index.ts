import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import { schema } from "./Schema";
import { Users } from "./Entities/Users";
import { Tasks } from "./Entities/Tasks";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "task_scheduler",
    username: "root",
    password: "root",
    port: 3306,
    logging: false,
    synchronize: true, 
    entities: [Users, Tasks],
  });
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3001, () => {
    console.log("Graphiql on: http://localhost:3001/graphql");
  });
};

main().catch((err) => {
  console.log(err);
});
