import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser'    //This Parser works both on the server and client side and converts an HTML string to one or more React elements
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { useGetCryptosDetailQuery, useGetCryptosHistoryQuery } from '../services/cryptoApi'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from './LineChart'
import Loader from './Loader'
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

  const { uuid } = useParams();                                      //useParams url me se uuid lega aur variable k tor pe hame use return karne dega
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptosDetailQuery(uuid)         // ek particular id dekar usi cryptocurrency ki detail de dega
  let args = { id: uuid, time: timeperiod}
  useEffect(()=>{
    
  }, [args])
  // let args = { id: uuid, time: timeperiod}
  const { data: coinHistory } = useGetCryptosHistoryQuery(args);
  const cryptoDetails = data?.data?.coin ;                              // crypto detail me coin ki details retrieve karli
  
  // console.log(timeperiod)
  // console.log(coinHistory)
  

  if(isFetching) return <Loader/>

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];      // simple array

  const stats = [
    { title: 'Price to USD', value: `$ ${data?.data?.coin?.price && millify(data?.data?.coin?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: data?.data?.coin?.rank, icon: <NumberOutlined /> },
    { title: 'Fully Diluted Market Cap', value: `$ ${data?.data?.coin?.fullyDilutedMarketCap && millify(data?.data?.coin?.fullyDilutedMarketCap)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${data?.data?.coin?.marketCap && millify(data?.data?.coin?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${data?.data?.coin?.allTimeHigh?.price && millify(data?.data?.coin?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: data?.data?.coin?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: data?.data?.coin?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: data?.data?.coin?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${data?.data?.coin?.supply?.total && millify(data?.data?.coin?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${data?.data?.coin?.supply?.circulating && millify(data?.data?.coin?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Title>
        <p>{data?.data?.coin.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
        {time.map((date, i) => <Option key={i}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name}/>         {/*chart that will depict history of coin*/}
      
      <Col className='coin-value-statistics'>
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{data?.data?.coin.name} Value Statistics</Title>
            <p>An overview showing the statistics of {data?.data?.coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="other-stats-info">
        <Col className="coin-value-statistics-heading">
          <Title level={3} className="coin-details-heading">Other Stats Info</Title>
          <p>An overview showing the statistics of {data?.data?.coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
        </Col>
        {genericStats.map(({ icon, title, value }) => (
          <Col className="coin-stats">
            <Col className="coin-stats-name">
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className="stats">{value}</Text>
          </Col>
        ))}
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {data?.data?.coin.name}?</Title>
          {(data?.data?.coin.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{data?.data?.coin.name} Links</Title>
          {data?.data?.coin.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>

  )
}

export default CryptoDetails