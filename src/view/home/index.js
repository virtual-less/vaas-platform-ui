import './Home.css';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';
import HomeFooter from './HomeFooter';
import { Layout } from 'antd';
import {useState, StrictMode} from 'react';
import {AppContext} from '../../context/app';
import {
    HashRouter,
  } from "react-router-dom";
const { Header, Footer, Content } = Layout;


export default function Home() {
    const [appName,setAppName] = useState('')
    return (
        <AppContext.Provider value={{appName,setAppName}}>
            <StrictMode>
                <HashRouter>
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
                </HashRouter>
            </StrictMode>
        </AppContext.Provider>
    );
  }
  