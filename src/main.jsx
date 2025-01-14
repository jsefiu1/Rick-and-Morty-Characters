import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient,ApolloProvider, InMemoryCache } from '@apollo/client'
import { LanguageProvider } from "./context/LanguageContext"; // Import the provider
import 'bootstrap/dist/css/bootstrap.css'

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <LanguageProvider>
    <App />
    </LanguageProvider>
    </ApolloProvider>
  </StrictMode>,
)
