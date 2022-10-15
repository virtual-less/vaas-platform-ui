import './Home.css';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';
import HomeFooter from './HomeFooter';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

export default function Home() {
    return (
        <Layout>
        <Header style={{background: '#adb5bd'}}>
            <HomeHeader />
        </Header>
        <Content className='body'>
            <HomeBody />
        </Content>
        <Footer>
            <HomeFooter />
        </Footer>
        </Layout>
    );
  }
  