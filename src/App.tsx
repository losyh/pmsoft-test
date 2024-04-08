import { Route, Routes } from 'react-router'
import './App.css'
import NavMenu from './pages/NavMenu/NavMenu'
import AllBoocks from './pages/AllBoocks/AllBoocks'
import { Layout } from 'antd';

const { Sider, Content } = Layout;


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  height: '95vh',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'white',
  border: 'solid black',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px'

};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '100px',
  color: '#fff',
  backgroundColor: 'black',
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  overflowY: 'hidden'
};

function App() {
  return (
      <Layout style={layoutStyle}>
        <Sider width="10%" style={siderStyle}>
          <NavMenu/>
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <Routes>
              <Route path='/all-boocks' element={<AllBoocks/>}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
  )
}

export default App
