import React, {Component} from 'react';
import './Store.scss'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Modal from '../components/Modal';
import SectionDivider from '../components/SectionDivider';
import StoreDetail from '../organisms/store/StoreDetail';
import TitleBox from '../components/TitleBox';
import ReviewList from '../organisms/review/ReviewList';
import ReviewForm from '../organisms/review/ReviewForm';
import {identifyLogin} from '../_common/services/user.service';
import {fetchReviewList, fetchStoreDetail} from '../actions';
import {writeReview} from "../_common/services/review.service";
import {isMobile} from "../_common/const/const";

class Store extends Component {

  state = {
    activePage: 0,
    isOpen: false,
    review: {
      reviewImg: '',
      description: ''
    },
  };

  componentDidMount() {
    const {match, fetchStoreDetail} = this.props;
    const storeId = match.params.id;

    fetchStoreDetail(storeId);
    this.renewReviewList(0);
  }

  renewReviewList = pageNo => {
    const {match, fetchReviewList} = this.props;
    const storeId = match.params.id;
    const perPageNo = this.getItemCountPerPage();

    fetchReviewList(storeId, pageNo, perPageNo);
  };

  pageAction = activePage => {
    this.setState({activePage});
    this.renewReviewList(activePage);
  };

  getItemCountPerPage = () => {
    return (isMobile && 2) || 5;
  };

  renderReserveButton = (pathname, search, btnName) => {
    return (
      <Link to={{pathname, search}}>
        <button className='btn-reserve'>{btnName}</button>
      </Link>
    );
  };

  toggleReviewForm = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleFormChange = e => {
    this.setState({
      review: {
        ...this.state.review,
        [e.target.name]: (e.target.files && e.target.files[0]) || e.target.value
      }
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('reviewImg', this.state.review.reviewImg);
    formData.append('description', this.state.review.description);
    formData.append('storeId', this.props.match.params.id);

    this.createReview(formData);
  };

  createReview = async review => {
    try {
      const response = await writeReview(review);
      alert(response.data.message);
      this.setState({
        review: {
          reviewImg: '',
          description: ''
        },
        isOpen: false
      });

    } catch (error) {
      console.error(error);
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  render() {
    const {isOpen, review, activePage} = this.state;
    const {storeDetail, reviewList, match} = this.props;
    const {info, images} = storeDetail;
    const id = match.params.id;
    const callbackUrl = `callback_url=/stores/${id}`;
    const token = identifyLogin();

    return (
      <Modal hasBtnBack={false}>
        <section className='store-page'>
          {(token && this.renderReserveButton(`/stores/${id}/reserve`, callbackUrl, '예약하기'))
          || this.renderReserveButton('/auth/login', callbackUrl, '로그인 후 예약하기')}
          <SectionDivider/>
          <StoreDetail
            storeDetail={storeDetail}
          />
          <SectionDivider/>
          <TitleBox contents={(images && `${info.store_name}의 생생한 리뷰들`) || ''}/>
          <ReviewList
            reviewList={reviewList}
            storeId={id}
            callbackUrl={callbackUrl}
            activePage={activePage}
            pageAction={this.pageAction}
          />
          {
            token &&
            <button className='btn-review' onClick={this.toggleReviewForm}>
              {(!isOpen && '리뷰 작성하기') || '작성 취소'}
            </button>
          }
          <section className={(isOpen && 'review-create') || 'review-hidden'}>
            <ReviewForm
              review={review}
              handleChange={this.handleFormChange}
              handleSubmit={this.handleFormSubmit}
            />
          </section>
        </section>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  storeDetail: state.storeDetail,
  reviewList: state.reviewList
});

const mapDispatchToProps = dispatch => ({
  fetchStoreDetail: id => dispatch(fetchStoreDetail(id)),
  fetchReviewList: (id, pageNo, perPageNo) => dispatch(fetchReviewList(id, pageNo, perPageNo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Store);