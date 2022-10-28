import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'
import { registerLocale } from 'react-datepicker'
import tr from 'date-fns/locale/tr'
import App from './App'
import reportWebVitals from './reportWebVitals'
import redux from '@/store'
import Chakra from './Chakra'
import '@/locales'

registerLocale('tr', tr)

const container = document.getElementById('root')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})

if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <Provider store={redux}>
        <QueryClientProvider client={queryClient}>
          <Chakra>
            <App />
          </Chakra>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
