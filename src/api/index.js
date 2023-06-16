
import axios from "axios";

export const getNews = () => async() => {
    let url = `https://thetidbit-mw.herokuapp.com/news/getCategoryNews`
    if(newsLang==='hi')url= `https://thetidbit-mw.herokuapp.com/news/getCategoryNews?lang=${newsLang}`
  
    var options = {
        method: 'GET',
        url: url,
        params: { q: newsType }
    };
  
    let response = await axios.request(options);
    if (response.status === 200) {
        return response.data
        
    }
  }
  