import React, {useState}from 'react';
import firebase from '../../config/firebase.js';
import { Image, Button, Header, Radio, Form, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const buttonStyle = {
  backgroundColor: '#4EC475',
  border: '2px solid #545353',
  fontSize: 'medium',
  marginTop: '1em'
}

const inputStyle = {
  border: '2px solid #545353',
  borderRadius: '2px',
  maxWidth: '350px'
}

const SignUp = (/*{ history }*/) => {

  const [radio, setRadio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e, {value, checked}) => {
    return checked ? setRadio(value) : false
}  

  function onSubmit(e) {
    e.preventDefault();

    if(name.length > 0 && email.length > 0 && password.length > 0 && radio.length > 0) {

      // return (
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((resp) => {
            if (resp.user) {
              resp.user.updateProfile({
                displayName: name,
              })
                .then(() => {
                  firebase
                    .firestore()
                    .collection('Users')
                    .doc(resp.user.uid)
                    .set({
                      name: name,
                      workIn: radio
                    })
                    .then(() => window.location.pathname = '/Pedidos')
                });
            }
          }).catch((error) => {
            console.log(error);
          })
      // )
    }
  }

  return (
    <>
    <Image 
      src={require('../../Images/Burger-Queen-Logo.png')} 
      alt='Burger Queen Logo' 
      size='large'
      />
    <Form onSubmit={onSubmit}>
      <Header>Cadastro</Header>
      <Form.Field inline>
        <Radio
        label='Cozinha'
        name='trabalho'
        value='Cozinha'
        checked={radio === 'Cozinha'}
        onChange={handleChange}
        />
        <Radio 
        label='Salão' 
        name='trabalho'
        value='Salão'
        checked={radio === 'Salão'}
        onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Nome:</label>
        <Input 
        style={inputStyle}
        value={name}
        placeholder='Nome'
        onChange={ e => setName(e.currentTarget.value)}
        ></Input>
      </Form.Field>
      <Form.Field>
        <label>E-mail:</label>
        <Input 
        style={inputStyle}
        value={email}
        placeholder='exemplo@email.com'
        onChange={ e => setEmail(e.currentTarget.value)}
        ></Input>
      </Form.Field>
      <Form.Field>
        <label>Senha:</label>
        <Input 
        style={inputStyle}
        value={password}
        placeholder='********'
        onChange={ e => setPassword(e.currentTarget.value)}
        ></Input>
      </Form.Field>
      <Button 
      style={buttonStyle}
      type='submit'
      content='Cadastrar'
      />
    </Form>
    </>
  )
}

export default withRouter(SignUp);