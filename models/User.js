class User{
  constructor(username,password){
    this.username = username
    this.password = password
  }

  set id(id){
    this._id = id;
  }

  get id(){
    return this._id;
  }
  
  set username(username){
    this._username = username;
  }

  get username(){
    return this._username;
  }

  set password(password){
    this._password = password;
  }

  get password(){
    return this._password;
  }   

  toJSON(){
    const {id, username, password} = this

    return {id, username, password}
  }    
}

module.exports = User