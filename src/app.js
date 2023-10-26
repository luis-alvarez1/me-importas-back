import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import EnvModule from './config/env/envModule';
import DBConfig from './config/database/database';
import types from './graphql/schemas';
import resolvers from './graphql/grahql-resolvers';

EnvModule.configEnv();

const app = express();
app.use(cors());

DBConfig.connectDB();

const schema = buildSchema(types);

app.use('/graphql', (req, res) =>
  graphqlHTTP({
    schema, // types
    rootValue: resolvers, // resolvers
    graphiql: true,
  })(req, res),
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`SERVIDOR LISTO EN http://localhost:${PORT}/graphql`));
