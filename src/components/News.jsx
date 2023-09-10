import React, { useState } from 'react'
import {Select, Typography, Row, Col, Avatar, Card} from 'antd'
import moment from 'moment';         //JavaScript package that makes it simple to parse, validate, manipulate, and display date/time in JavaScript
import Loader from './Loader'

import { useGetCryptosnewsQuery } from '../services/cryptonewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;      // destructuring option from select component

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] =useState('Cryptocurrency') //konsi cryptocurrency ki news dekhni hai uske liye state
  const {data: cryptoNews} = useGetCryptosnewsQuery({ newsCategory, count: simplified ? 6: 12})    //is redux hook se news data retrieve kar liya aur uski category cryptocurrency set kardi, agar simplified true hai to 10 article render honge nahi to 100 
  const { data } = useGetCryptosQuery(100);      // isme hi coins k bare me sara data hai
  
  // console.log(cryptoNews)

  if (!cryptoNews?.value) return <Loader/>;

  return (
    <Row gutter={[24, 24]}>
       {!simplified && (
        <Col span={24}>           {/*just one col*/}
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}    
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>    {/*ye pehla option hai*/}
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}     {/*ye baaki k option jo map kara diye*/}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img height={100} width={100}  src={news?.image?.thumbnail?.contentUrl} alt="" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="TR" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>   {/*abhi se kitni der pehle ye article publish hua tha, moment time ko simplify format me change kar dega*/}
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News