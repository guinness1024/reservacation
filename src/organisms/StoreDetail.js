import React, { Component } from 'react';
import './StoreDetail.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StoreCard from './StoreCard';
import Image from '../components/Image';
import TitleBox from '../components/TitleBox';
import ReviewCard from './ReviewCard';
import SectionDivider from '../components/SectionDivider';
import Modal from '../components/Modal';


class StoreDetail extends Component {

    componentDidMount() {
        this.getImages();
        this.getReviews();
    }

    getImages = async () => {
        let images = await this.callApiImages();
        this.setState({
            images
        });
    };

    callApiImages = () => {
        // Api 호출 Test Code
        return [
            {
                src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                alt: '분위기있는사진1',
            }, {
                src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                alt: '분위기있는사진2',
            }, {
                src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                alt: '분위기있는사진3',
            }, {
                src: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                alt: '분위기있는사진4',
            }
        ];
    };

    getReviews = async () => {
        let reviews = await this.callApiReview();
        this.setState({
            reviews
        });
    };

    callApiReview = () => {
        // Api 호출 Test Code
        return [
            {
                imgSrc: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                imgAlt: '리뷰이미지1',
                title: '맛있어요.',
                description: '뻥이야 존나맛없어.',
            }, {
                imgSrc: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg',
                imgAlt: '리뷰이미지2',
                title: '맛없네요 시발',
                description: '이게 음식이야? 장사하기싫어?',
            }
        ];
    };

    renderImgaes = () => {
        return this.state.images.map((img, i) => {
            return <div className='img' key={i}>
                <Image
                    src={img.src}
                    alt={img.alt} />
            </div>
        });
    };

    renderReviews = () => {
        return this.state.reviews.map((review, i) => {
            return <div className='review' key={i}>
                <ReviewCard
                    imgSrc={review.imgSrc}
                    imgAlt={review.imgAlt}
                    title={review.title}
                    description={review.description}
                />
            </div>
        });
    };

    render() {
        const { no, imgSrc, imgAlt, name, address, tel, description } = this.props;
        let token = 'test' // Test 용 토큰
        let isImages = this.state && this.state.images;
        let isReviews = this.state && this.state.reviews;

        return (
            <Modal to={'/'}>
                <article className='store-detail'>
                    <Link to={`/stores/${no}?reserve=true&token=${token}`}><button className='btn-reserve'>예약하기</button></Link>
                    <SectionDivider />
                    <section className='store-info'>
                        <StoreCard
                            imgSrc={imgSrc}
                            imgAlt={imgAlt}
                            name={name}
                            address={address}
                            tel={tel}
                            description={description}
                        />
                    </section>
                    <SectionDivider />
                    <TitleBox contents={`${name}의 분위기 넘치는 사진들`} />
                    <section className='img-list'>
                        {isImages && this.renderImgaes()}
                    </section>
                    <SectionDivider />
                    <button className='btn-review'>리뷰</button>
                    <button className='btn-qna'>QnA</button>
                    <section className='review-list'>
                        {isReviews && this.renderReviews()}
                    </section>
                </article>
            </Modal>
        );
    }
}

StoreDetail.propTypes = {
    no: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    tel: PropTypes.string,
    description: PropTypes.string,
};

export default StoreDetail