import {ApolloServer} from "apollo-server-micro";
import {getConnection} from "../../src/database/index.js";
import typeDefs from "../../src/graphql/typeDefs";
import resolvers from "../../src/graphql/resolvers";


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
        const dbConn = await getConnection();
        return {dbConn};
    },
    playground: true,
    introspection: true,
});
export default apolloServer.createHandler({path: "/api/graphql"});

export const config = {
    api: {
        bodyParser: false,
    },
};