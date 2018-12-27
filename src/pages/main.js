import React, { Component } from 'react';
import Map from '../components/Map';
import StoreCard from '../organisms/StoreCard';
import './Main.scss';

class Main extends Component {
    state = {}

    componentDidMount() {
        this._getStores();
    }

    _getStores = async () => {
        const stores = await this._callApi();
        this.setState({
            stores
        })
    }

    _callApi = () => {
        // Api 호출 Test Code
        return [{
            img_src:'data:image/jpeg;base64,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',
            img_alt:'스타벅스 아주대점',
            name:'스타벅스 아주대점',
            address:'경기도 수원시 팔달구 우만2동 월드컵로 205',
            tel:'031-215-4516',
            description:'시애틀에 본사를 두고 있고 간단한 스낵과 무료 Wi-Fi를 제공하는 유명 커피 체인점입니다.',
            no:1,
        }, {
            img_src:'data:image/jpeg;base64,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',
            img_alt:'탐앤탐스 수원아주대점',
            name:'탐앤탐스 수원아주대점',
            address:'경기도 수원시 영통구 원천동 아주로 46',
            tel:'031-211-3565',
            description:'24시 카페',
            no:2,
        }]
    }

    _renderCards = () => {
        const stores = this.state.stores.map(store => {
            return <StoreCard 
                img_src={store.img_src}
                img_alt={store.img_alt}
                store_name={store.name}
                store_address={store.address}
                store_tel={store.tel}
                store_description={store.description}
                key={store.no}
            />
        })
        return stores;
    }

    render() {
        const stores = this.state.stores;
        return (
            <div className='main'>
                <section className='store-list'>
                    {stores ? this._renderCards() : ''}
                </section>
                <section className={stores ? 'with-stores' : ''}>
                    <Map />
                </section>
            </div>
        );
    }    
}

export default Main;