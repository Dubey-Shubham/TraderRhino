import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import { Navbar, News, Cryptocurrencies, CryptoDetails, Homepage } from './components';
import { Layout, Typography, Space } from 'antd'  //antd components

function App() {

  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>                           {/*from antD*/}
          <div className='routes'>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
            </Routes>
            <Routes>
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
            </Routes>
            <Routes>
              <Route path="crypto/:uuid" element={<CryptoDetails />} />      {/*crypto k age baaki uuid will change according to cryptocurrency we are watching*/}
            </Routes>
            <Routes>
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: "white", textAlign:"center" }}>
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link style={{color:"white"}} to='/'>Home</Link>
            <Link style={{color:"white"}} to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
