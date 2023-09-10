import React from 'react'
import { Col, Row, Typography } from 'antd'
import {                          //ek chart k various component hai ye, like y-axis ko linerscale bolte hai aur x-axis ko category scale
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  // Tooltip,
  // Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'           // line chart import kiya

ChartJS.register(                    //char k sabhi component ko register karna hoga
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  // Tooltip,
  // Legend
);

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];
    // console.log(coinPrice)
    // console.log(coinTimestamp)

      for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {             // looped the data from api inside the array we created 
        coinPrice.push(coinHistory?.data?.history[i].price);
      }
    
      for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());  //api se mile hue data ko proper date k format me change krke array me push kiya
      }
      
      const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#8a0aca',
            borderColor: '#8a0aca',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    
     
    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Charts</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
                    <Title level={5} className='current-change'>Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            
            <Line options={options} data={data} />
        </>
    )
}

export default LineChart