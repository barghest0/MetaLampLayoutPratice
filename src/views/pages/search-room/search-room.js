import '../../components/dropdown/dropdown';
import '../../components/filter-date/filter-date';
import '../../components/expand-list/expand-list';
import '../../components/preview-room/preview-room';
import '../../components/header/header';
import '../../components/datepicker/datepicker';
import '../../components/range-slider/range-slider';
import '../../components/pagination/pagination';

import './images/filter-icon.svg';

import './search-room.scss';

$('.search-room__filter-icon').on('click', e => {
  $('.search-room__filters').toggleClass('active');
});
