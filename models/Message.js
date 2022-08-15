class Message{
  constructor(email, firstName, lastName, age, date, message){
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.message = message
    this.date = date
  }

  get email(){
    return this._email
  }

  set email(email){
    this._email = email
  }

  get firstName(){
    return this._firstName
  }

  set firstName(firstName){
    this._firstName = firstName
  }  

  get lastName(){
    return this._lastName
  }

  set lastName(lastName){
    this._lastName = lastName
  }
  
  get age(){
    return this._age
  }

  set age(age){
    this._age = age
  }    
  
  get message(){
    return this._message
  }

  set message(message){
    this._message = message
  }

  get date(){
    return this._date
  }

  set date(date){
    this._date = date
  }

  toJSON(){
    const{email, firstName, lastName, age, message, date} = this

    return {'author': {email,firstName, lastName, age },message, date}
  }  
}

module.exports = Message