import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import { legacyLogicalPropertiesTransformer, px2remTransformer, StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './routers'
import { Provider } from 'react-redux'
import { persistor, store } from './stores/store'
import { PersistGate } from 'redux-persist/integration/react';
import ConfirmModal from './components/ConfirmModal/ConfirmModal'
import { LoadingScreen } from './components/Loading/LoadingScreen'
import 'bootstrap/dist/css/bootstrap.min.css';
const px2rem = px2remTransformer({
  rootValue: 16,
})

createRoot(document.getElementById('root')!).render(
  <StyleProvider
    hashPriority="high"
    layer
    transformers={[legacyLogicalPropertiesTransformer, px2rem]}
  >
    <ConfigProvider
      theme={{
        token: {
          // fontFamily: `'Times New Roman', Times, serif`,
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <ConfirmModal />
          <LoadingScreen />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </StyleProvider>
)
