import React from 'react'
import millify from 'millify';   //Converts long numbers into pretty, human-readable strings
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom'
import { Cryptocurrencies, News } from '../components'
import Loader from './Loader'

import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;   // destructure kar liya title from typography

const Homepage = () => {

  const { data, isFetching } = useGetCryptosQuery(12);  //toolkit ka hook jo yahan import kiya usme se data extract kar diya
  const globalStats = data?.data?.stats    // variable me stats store kar diya, jo ki data k andar data obj k andar stats me hai

  if (isFetching) return <Loader/>;  //agar abhi data fetch ho rha hai to loader ka component show krna hai

  // console.log(data);
  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row gutter={[32,32]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>  {/*antd has 24 grid system so 12 will divide screen in 2 columns basically*/}
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />     {/*simplified is true then count will be 10, simplified is a prop, by default it is true*/}
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage