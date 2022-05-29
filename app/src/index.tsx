import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'
import { registerLocale } from 'react-datepicker'
import tr from 'date-fns/locale/tr'
import App from './App'
import reportWebVitals from './reportWebVitals'
import redux from '@/store'
import Chakra from './Chakra'

registerLocale('tr', tr)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})

ReactDOM.render(
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
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
