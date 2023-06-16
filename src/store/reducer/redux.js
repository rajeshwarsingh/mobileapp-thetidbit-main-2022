



import { newsActionTypes } from '../action/action'
const newsInitialState = {
    curNewsIndex:0,
    curPrefLang:'en1',
    curTab:0,
    curVidIndex:0,
    curBlogIndex:0
}
export default function getCurNews(state = newsInitialState, action) {

    switch (action.type) {
    case newsActionTypes.SETCURNEWSINDEX:
      return {...state, curNewsIndex: action.curNewsIndex};
    case newsActionTypes.SETCURVIDINDEX:
      return {...state, curVidIndex: action.curVidIndex};
    case newsActionTypes.SETCURBLOGINDEX:
      return {...state, curBlogIndex: action.curBlogIndex};
    case newsActionTypes.SETCURPREFLANG:
      return {...state, curPrefLang: action.curPrefLang};
    case newsActionTypes.SETCURTAB:
      return {...state, curTab: action.curTab};
      default:
        return state
    }
    
  }


// export default function counter(state, action) {
//     if (typeof state === 'undefined') {
//       return 5;
//     }
  
//     switch (action.type) {
//       case 'INCREMENT':
//         return state + 1;
//       case 'DECREMENT':
//         return state - 1;
//       default:
//         return state;
//     }
//   }