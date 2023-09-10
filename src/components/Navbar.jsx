import React, { useEffect, useState } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';      // components from ant
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons' //icons from ant
import Rhino from "../images/rhino.png"

const Navbar = () => {

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)      //this function will save the width of window in state during initial render
    window.addEventListener('resize', handleResize)   // whenever window will get resized we will handle handleResize
    handleResize()     //handle resize ko call kiya tabhi upar k do kaam karenge
    return () => window.removeEventListener('resize', handleResize);   //finally eventlistner ko hata bhi diya
  }, [])

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);       //agar width 800 se kam to state false
    } else {
      setActiveMenu(true);       // agar 800 se zyada
    }
  }, [screenSize])    // whenever screensize will change the useEffect will run
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar size={50} src={Rhino} />
        <Typography.Title level={2} className='logo'>
          <Link to="/">TRADERRHINO</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>  {/*clickkrne par activeMenu false aur navbar gayab*/}
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu &&
        <Menu theme='dark' style={{ backgroundColor: "rgb(128, 108, 62)" }}>
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies" >Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>

        </Menu>
      }

    </div>
  )
}

export default Navbar