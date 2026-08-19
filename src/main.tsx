import { createRoot } from 'react-dom/client'
import './index.scss'
import { legacyLogicalPropertiesTransformer, px2remTransformer, StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './routers'
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
            fontFamily: `'Times New Roman', Times, serif`,
          },
        }}
      >
            <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
)
