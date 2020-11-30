const FILTER_BY_VALUE = "FILTER_BY_VALUE";
const SORT_BY_POPULARITY = "SORT_BY_POPULARITY";
const LOAD_DATA = "LOAD_DATA";
const LOAD_MORE_PAGE = "LOAD_MORE_PAGE";

const initialState = {
  appliedFilters: [],
  categories: {
    category: "All",
    type: "Official",
    value: ""
  }
};

const exporterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_VALUE:
      // 필터 된 state를 담는 변수를 선언. state 초기값을 할당한다.
      let filteredState = Object.assign({}, state);
      console.log(filteredState, "filteredState");

      // 필터된 state의 categories 객체 안의 filterType key값의 value로
      // input change value 값을 할당한다.
      filteredState.categories[action.payload.filterType] = action.payload.data;
      console.log(filteredState.categories[action.payload.filterType]);

      /*
      구조분해 할당 풀어보면 아래와 같다.
      ilteredState.categories : { 
        filteredState.categories.category, 
        filteredState.categories.type, 
        filteredState.categories.value 
      }
      */
      const {
        categories: { category, type, value }
      } = filteredState;

      // exporters 데이터를 필터링한 return값을 변수 filterdValues에 할당한다.
      let filteredValues = state.exporters.filter(exporter => {
        if (!value) {
          // e.target.value 값이 없으면 전체 데이터를 리턴한다.
          return (
            exporter.official === type &&
            (exporter.category === category || category === "All")
          );
        } else {
          return (
            // e.target.value 값이 있으면
            // exporter.name이 value에 포함되어있고
            exporter.name.toLowerCase().includes(value) &&
            // exporter.official이 필터된 카테고리의 type과 같고
            exporter.official === type &&
            // exporter.category가 필터된 카테고리의 카테고리와 같은 exporter만 return 한다.
            (exporter.category === category || category === "All")
          );
        }
      });

      // 최종으로 name, official, category를 필터링한 데이터를 filterdState에 할당하고 리턴한다.
      filteredState.filteredExporters = filteredValues;
      filteredState.totalCount = filteredValues.length;
      return filteredState;

    case SORT_BY_POPULARITY:
      // sorting된 state를 담는 변수를 선언. state 초기값을 할당한다.
      let sortByPopularityState = Object.assign({}, state);
      console.log(sortByPopularityState, "sortByPopularityState");

      // 'stars' 를 기준으로 내림차순으로 sorting한다.
      //  데이터 filteredExporters를 sorting 한 값을 변수 sortedPopularityArr에 할당한다.
      let sortedPopularityArr = sortDesc(state.filteredExporters, "stars");

      // `star`를 기준으로 내림차순 sorting된 데이터를 sortByPopularityState에 할당하고 리턴한다.
      sortByPopularityState.filteredExporters = sortedPopularityArr;
      return sortByPopularityState;

    case LOAD_DATA: // data가 load 됬을때 (CDM)
      const count = action.payload.length;
      const countPerPage = 12;
      const totalPages = Math.ceil(count / countPerPage);
      const exporters = action.payload;
      // official이 'official'인 exorter만 필터링
      let officialExporters = exporters.filter(exporter => {
        return exporter.official === "Official";
      });
      const officialCount = officialExporters.length;

      return {
        ...state,
        exporters,
        filteredExporters: officialExporters,
        countPerPage,
        totalCount: officialCount,
        currentPage: 1,
        totalPages: totalPages,
        filteredPages: totalPages
      };

    case LOAD_MORE_PAGE:
      //load more page
      return state;

    default:
      return state;
  }
};
export default exporterReducer;

// 내림차순으로 정렬하는 함수 sortDesc
function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field] > b[field]) {
      return -1;
    }
    if (b[field] > a[field]) {
      return 1;
    }
    return 0;
  });
}
