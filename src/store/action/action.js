
export const newsActionTypes = {
  SETCURNEWSINDEX: 'set-cur-news-tab',
  SETCURPREFLANG: 'set-cur-pref-lang',
  SETCURTAB: 'set-cur-tab',
  SETCURVIDINDEX :'set-cur-vid-index',
  SETCURBLOGINDEX :'set-cur-blog-index'
};

export const setCurNewsIndex = (curNewsIndex) => (dispatch) => {
  if (!curNewsIndex) curNewsIndex = 0

  return dispatch({ type: newsActionTypes.SETCURNEWSINDEX, curNewsIndex: curNewsIndex });
}

export const setCurVidIndex = (curVidIndex) => (dispatch) => {
  if (!curVidIndex) curVidIndex = 0

  return dispatch({ type: newsActionTypes.SETCURVIDINDEX, curVidIndex: curVidIndex });
}

export const setCurBlogIndex = (curBlogIndex) => (dispatch) => {
  if (!curBlogIndex) curBlogIndex = 0

  return dispatch({ type: newsActionTypes.SETCURBLOGINDEX, curBlogIndex: curBlogIndex });
}

export const setLang = (lang) => (dispatch) => {
  if (!lang) lang = 'en'

  return dispatch({ type: newsActionTypes.SETCURPREFLANG, curPrefLang: lang });
}

export const setTab = (curTab) => (dispatch) => {
  if (!curTab) curTab = '0'

  return dispatch({ type: newsActionTypes.SETCURTAB, curTab: curTab });
}