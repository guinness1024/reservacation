import {combineReducers} from 'redux';
import storeList from './storeList';
import storeDetail from './storeDetail';
import user from './user';
import guestCount from './guestCount';
import reservationInfo from './reservationInfo';
import reviewList from './reviewList';
import reviewDetail from './reviewDetail';

const reducer = combineReducers({
  storeList,
  storeDetail,
  user,
  guestCount,
  reservationInfo,
  reviewList,
  reviewDetail,
});

export default reducer;