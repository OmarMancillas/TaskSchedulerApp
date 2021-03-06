import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </ApolloProvider>
    );
}

export default MyApp;
