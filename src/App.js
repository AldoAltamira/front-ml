import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Create from './create/index';
import ListContacts from './list/index';
import { Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      create: true,
      favorite: false,
      list: false,
      users: [],
      favorites: []
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount = () => {
    this.findUsers()
  }

  findUsers = () =>{
    fetch('http://localhost:3000/users',
    {
      mode: 'cors',
      method: 'GET'
    })
      .then((response) => {
        console.log('response',response);
        return response.json()
      }).then((data) => {
        let favorites = data.data.filter((e)=>{
            if(e.favorite){
              return e
            }
        })
        this.setState({
          users: data.data,
          favorites: favorites
        })
      })
  }

  createUser = (user) =>{
    console.log('user?', user);
    fetch('http://localhost:3000/users',
    {
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then((response) => {
      console.log('response',response);
      return response.json()
    })
    .then((data) => {
      this.findUsers()
    })
  }

  updateUser = (user) =>{
    console.log('user?', user);
    fetch('http://localhost:3000/user/' + user._id,
    {
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(user)
    }).then((response) => {
      console.log('response',response);
      return response.json()
    })
    .then((data) => {
      this.findUsers()
    })
  }

  deleteUser = (id) =>{
    console.log('user?', id);
    fetch('http://localhost:3000/user/' + id,
    {
      mode: 'cors',
      method: 'DELETE'
    }).then((response) => {
      console.log('response',response);
      return response.json()
    })
    .then((data) => {
      this.findUsers()
    })
  }

  onClick = (e) =>{
    const { name } = e.target
    if(name === 'create'){
      this.setState({
        create: true,
        favorite: false,
        list: false
      });
    }
    else if(name === 'list'){
      this.setState({
        create: false,
        favorite: false,
        list: true
      });
    }
    else{
      this.setState({
        create: false,
        favorite: true,
        list: false
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">MENU DE USUARIOS</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink name="create" onClick={this.onClick}>Creacion</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink name="list" onClick={this.onClick}>Contactos <Badge color="secondary">{this.state.users.length}</Badge></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink name="favorite" onClick={this.onClick}>Favoritos <Badge color="secondary">{this.state.favorites.length}</Badge></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        {this.state.create ? <Create createUser={this.createUser}/> : this.state.list ? <ListContacts updateUser={this.updateUser} deleteUser={this.deleteUser} favorite={this.state.users} title='Lista de usuarios'/> : <ListContacts title='Favoritos' updateUser={this.updateUser} deleteUser={this.deleteUser} favorite={this.state.favorites}/>}
      </div>
    );
  }
}

export default App;
