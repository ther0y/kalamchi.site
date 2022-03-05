import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://gql.kalamchi.site/v1/graphql",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1ZXN0IiwiaWF0IjoxNjQ2NDc4OTAxLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiZ3Vlc3QiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiZ3Vlc3QifSwiZXhwIjoxNjk0NjQ3OTgwMX0.Dod9mvFDPFsBQ_wqH1f2EgJCTfPu9B6qY884daJgT6w",
  },
  cache: new InMemoryCache(),
});

export default client;
