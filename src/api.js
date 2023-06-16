
 export const setAndroidToken = async(token)=>{
    await fetch(`https://thetidbit-mw.herokuapp.com/setToken?platform=android&token=${token}`, {
    method: 'GET'
  });

  return
}

export const getAndroidToken = async(token)=>{
    return await fetch('https://thetidbit-mw.herokuapp.com/getToken?platform=android', {
    method: 'GET'
  });
}