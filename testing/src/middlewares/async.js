export default ({dispatch})=>next=>action=>{
  //CHECK TO SEE WHETHER ACTION{} HAS A Promise ON ITS .payload
  //IF IT DOES, THEN WAIT FOR IT TO RESOLVE, IF DOESN'T, SEND THE
  //ACTION{} ON TO THE NEXT MIDD
  if(!action.payload || !action.payload.then) {
    return next(action);
    }

  //IF THERE IS A Promise, I WANT TO WAIT FOR THE Promise TO RESOLVE,
  //TO GET ITS DATA, AND THEN CRT AN ACTION{} AND dispatch FROM THE
  //BEGINNING
  action.payload.then(function(response){
    const newAction = {...action, payload: response};
    dispatch(newAction);
  });
};
