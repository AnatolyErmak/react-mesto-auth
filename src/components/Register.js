import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const {onSignup} = props

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleEmailReg(e) {
    setEmail(e.target.value)
  }

  function handlePasswordReg(e) {
    setPassword(e.target.value)
  }

  function handleSubmitReg(e){
    e.preventDefault();
    onSignup(email.password)
  }

  return (
    <form className="login" onSubmit={handleSubmitReg} >
    <h3 className="popup__title login__title">Вход</h3>
    <input
        className="popup__field login__input"
        name="userEmail"
        type="email"
        placeholder="Email"
        onChange={handleEmailReg}
        value={email || ''}
        required
    />
    <input
        className="popup__field login__input"
        name="userPassword"
        type="password"
        placeholder="Пароль"
        onChange={handlePasswordReg}
        value={password || ''}
        required
    />
    <button className="popup__save login__button" type="submit">Зарегистрироваться</button>

</form>
  )
}

export default Register;