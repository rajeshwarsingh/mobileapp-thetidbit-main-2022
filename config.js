const env = 'prod'

let config = {}

if (env === 'dev') {
    config = {
        baseUrl: "https://thetidbit-mw.herokuapp.com",
        adUnitID: "ca-app-pub-3940256099942544/6300978111"
    }
} else if (env === 'prod') {
    config = {
        baseUrl: "https://thetidbit-mw.herokuapp.com",
        adUnitID: "ca-app-pub-9155008277126927/7669993848"
    }
}

config.curAppVersion = '3.0.59'
// config.storeVersion = "0.0.46"

export default config