import { FILTER_TYPE, LG_SiZE, MD_SIZE, RANGE_TYPE } from "../../../js/constants/datepicker";
import Datepicker from "../../../js/Datepicker";

new Datepicker($(".range-date"), RANGE_TYPE, LG_SiZE);

new Datepicker($(".filter-date"), FILTER_TYPE, MD_SIZE);