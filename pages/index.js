import React from "react";
import { getSession } from "next-auth/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function Home({ session }) {
  return (
    <div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = new ApolloClient({
    uri: "http://localhost:3001",
    cache: new InMemoryCache(),
  });

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }
  if (session) {
    return {
      redirect: {
        destination: "/taskScheduler",
        permanent: false,
      },
      props: { session },
    };
  }
}
