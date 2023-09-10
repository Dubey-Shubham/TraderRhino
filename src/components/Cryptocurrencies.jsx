import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'antd';
import Loader from './Loader'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {   //prop hai simplified, destructure kar liya ise

  const count = simplified ? 12 : 100;                             // agar simplified hai to 12 nahi to 100 crypto coin ka data extra t karna hai
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');   // search kiya gya term yahan store hoga

  // console.log(cryptosList)
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));     // coins ko filter kiya lower case me aur check kiya ki input me dale gaye text ko kya kisi coin ka naam include krta hai, agar haan to unka data filterdata variable me store kar dia

    setCryptos(filteredData);    // filter data ko store kar do is cryptos me
  }, [cryptosList, searchTerm]);    // in do k change hone par use effect re render karega


  if (isFetching) return <Loader/>;

  return (
    <>
      {!simplified && (                       // agar component me simplified nahi nhai to input shoe kar deneka
        <div className='search-crypto'>
          <input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm((e.target.value).toLowerCase())} />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>    {/*on small device all 24 col space will be taken by single card */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>      {/*click krne par banda cryptodetails page par pahuch jayega*/}
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies