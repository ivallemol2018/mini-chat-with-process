module.exports = (request,response,next) =>{
  if (!request.session.username){
    response.render('login',{ login_errors: request.session.messages || []})
  }
  else{
    next();
  } 
}
