import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import store from './app/Redux/stores/store.ts'
import App from './App.tsx'

import 'antd/dist/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
