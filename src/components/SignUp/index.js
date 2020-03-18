import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm /> {/* SignUpForm est le seul composant de classe React dans ce fichier, 
                    il doit gérer l'état du formulaire dans l'état local de React */}
  </div>
);

const INITIAL_STATE = { /* capturera les informations utilisateur telles que le nom d'utilisateur, 
                        l'e-mail et le mot de passe */
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => { /* onSubmit méthode de classe lorsqu'un utilisateur signe finalement. */
    const { username, email, passwordOne } = this.state; /* transmettra toutes les données du formulaire à l'API 
                                                        d'authentification Firebase via votre interface 
                                                        d'authentification dans la classe Firebase */
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault(); /* empêche un rechargement du navigateur */
  }

  onChange = event => { /* Les champs d'entrée doivent mettre à jour l'état local du composant 
                            à l'aide d'un onChange. */
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = this.state;

    const isInvalid = /*  fonction qui verifie l'état du formulaire */
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
          <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">Sign Up</button> {/* Bouton clicable que si la fonction isValid */}
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };