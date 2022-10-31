import './Home.css';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';
import HomeFooter from './HomeFooter';
import { Layout } from 'antd';
import {useState} from 'react';
import {AppContext} from '../../context/app';
const { Header, Footer, Content } = Layout;



export default function Home() {
    const [appName,setAppName] = useState('')
    return (
        <AppContext.Provider value={{appName,setAppName}}>
            <Layout>
                <Header style={{background: '#adb5bd'}}>
                    <HomeHeader />
                </Header>
                <Content style={{minHeight:'1000px'}}>
                    <HomeBody />
                </Content>
                <Footer>
                    <HomeFooter />
                </Footer>
            </Layout>
        </AppContext.Provider>
    );
  }
  