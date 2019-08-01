import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class ListContacts extends Component {
  constructor(props){
      super(props)
      this.state={
        users: [],
        filterUsers: [],
        isOpen: false,
        isOpenView: false,
        isOpenEdit: false,
        userSelected: {},
        searchText: '',
        values: [{
            name: 'name',
            required: true,
            label: 'Nombre',
            value: ''
        },
        {
            name: 'secondName',
            required: false,
            label: 'Segundo nombre',
            value: ''
        },
        {
            name: 'lastName',
            required: true,
            label: 'Apellido',
            value: ''
        },
        {
            name: 'company',
            required: false,
            label: 'Compañia',
            value: ''
        },
        {
            name: 'job',
            required: false,
            label: 'Profesion',
            value: ''
        },
        {
            name: 'email',
            required: false,
            label: 'Correo electronico',
            value: ''
        },
        {
            name: 'phone',
            required: false,
            label: 'Telefono',
            value: ''
        },
        {
            name: 'typePhone',
            required: false,
            label: 'Tipo de telefono',
            value: ''
        },
        {
            name: 'postalAddress',
            required: false,
            label: 'Direccion',
            value: ''
        },
        {
            name: 'city',
            required: false,
            label: 'Ciudad',
            value: ''
        },
        {
            name: 'state',
            required: false,
            label: 'Estado',
            value: ''
        },
        {
            name: 'birthday',
            required: true,
            label: 'Fecha de nacimiento',
            value: ''
        },
        {
            name: 'notes',
            required: true,
            label: 'Notas',
            value: ''
        },
        {
            name: 'label',
            required: true,
            label: 'Etiqueta',
            value: ''
        }],
      }
      this.handleChange = this.handleChange.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps = (nextProps)=>{
    console.log('nextProps',nextProps);
    this.setState({
      users: nextProps.favorite,
      filterUsers: nextProps.favorite,
      searchText: ''
    })
  }

  componentDidMount = () => {
    console.log('props',this.props);
    this.setState({
      users: this.props.favorite,
      filterUsers: this.props.favorite
    })
  }

  handleClickOpen = (open, event) =>{
    if(event){
      this.setState({
        isOpen: open,
        userSelected: event
      })
    }
    else{
      this.setState({
        isOpen: open
      })
    }
    console.log('delete user', event);
  }

  handleClickOpenView = (open, user) =>{
    if(user){
      this.setState({
        isOpenView: open,
        userSelected: user
      })
    }
    else{
      this.setState({
        isOpenView: open
      })
    }
  }

  handleClickOpenEdit = (open, user) =>{
    if(user){
      let keys = Object.keys(user)
      var newValues = this.state.values
      newValues.map((e) => {
        keys.map((f) => {
          if(e.name == f){
            console.log('entro al if',f);
            console.log('user?',user);
            console.log('userf',user[f]);
            e.value = user[f]
          }
        })
      })
      console.log('newValues',newValues)
      this.setState({
        isOpenEdit: open,
        userSelected: user,
        values: newValues
      })
    }
    else{
      this.setState({
        isOpenEdit: open
      })
    }
  }

  deleteUser = () =>{
    console.log('delete user', this.state.userSelected);
    this.setState({
      isOpen: false
    })
    this.props.deleteUser(this.state.userSelected._id);
  }

  editUser = () =>{
    this.setState({
      isOpenEdit: false
    })
    this.props.updateUser(this.state.userSelected);
  }

  handleChangeEdit = (e) =>{
      const { value, name } = e.target

      var newValues = this.state.values
      newValues.map((e) => {
        if(e.name == name){
          e.value = value
        }
      })

      var userEdit = this.state.userSelected
      console.log('name?',name);
      console.log('userEdit', userEdit[name]);
      userEdit[name] = value
      console.log('userEdit',userEdit);
      this.setState({
          isDisabled: false,
          values: newValues,
          userSelected: userEdit
      })
  }

  changeFavorite = (user) =>{
      user.favorite = !user.favorite
      this.setState({
          userSelected: user
      })
      this.props.updateUser(user);
  }

  handleChange(e) {
    console.log('la e',e.target.value);
    const { value } = e.target

    let { users } = this.state;
    if(e.target.value !== ''){
      let val = e.target.value.toLowerCase();
      let filterData = users.filter(obj => (
        obj.name.toLowerCase().includes(val) ||
        obj.secondName.toLowerCase().includes(val) ||
        obj.lastName.toLowerCase().includes(val) ||
        obj.company.toLowerCase().includes(val) ||
        obj.job.toLowerCase().includes(val) ||
        obj.email.toLowerCase().includes(val) ||
        obj.phone.toLowerCase().includes(val) ||
        obj.typePhone.toLowerCase().includes(val) ||
        obj.postalAddress.toLowerCase().includes(val) ||
        obj.city.toLowerCase().includes(val) ||
        obj.state.toLowerCase().includes(val) ||
        obj.birthday.toLowerCase().includes(val) ||
        obj.notes.toLowerCase().includes(val))
      );
      this.setState({
        filterUsers: filterData,
        searchText: value
      });
    }
    else{
      this.setState({
        filterUsers: users,
        searchText: value
      });
    }
  }

  render() {
    let showData = [];
    this.state.filterUsers.map((e) => {
      showData.push(<tr key={e._id}>
        <td>{e.name}</td>
        <td>{e.secondName}</td>
        <td>{e.lastName}</td>
        <td>{e.job}</td>
        <td>{e.email}</td>
        <td>{e.phone}</td>
        <td>{e.label}</td>
        <td><Button onClick={() => this.changeFavorite(e)}><Icon>{e.favorite ? 'favorite' : 'favorite_border'}</Icon></Button></td>
        <td>
          <Button onClick={() => this.handleClickOpenView(true, e)}><Icon>visibility</Icon></Button>
          <Button onClick={() => this.handleClickOpenEdit(true, e)}><Icon>edit</Icon></Button>
          <Button id={e} onClick={() => this.handleClickOpen(true,e)}><Icon>delete</Icon></Button>
        </td>
        </tr>)
    })
    return (
      <div className="App">
        <h1>{this.props.title}</h1>
        <input type="text" value={this.state.searchText} className="input" onChange={this.handleChange} placeholder="Search..." />
        <br/>
        <br/>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Segundo Nombre</th>
              <th>Apellido</th>
              <th>Profesion</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Etiqueta</th>
              <th>Favorito</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {showData}
          </tbody>
        </Table>
        <Dialog
          open={this.state.isOpen}
          onClose={() => this.handleClickOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"¿Desea eliminar este usuario?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Una vez eliminado no se podran recuperar los datos del usuario
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClickOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.deleteUser} color="secondary" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.isOpenView}
          onClose={() => this.handleClickOpenView(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.userSelected.name + ' ' + this.state.userSelected.lastName}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.userSelected.name ? <p>Nombre: {this.state.userSelected.name}</p> : ''}
              {this.state.userSelected.secondName ? <p>Segundo nombre: {this.state.userSelected.secondName}</p> : ''}
              {this.state.userSelected.lastName ? <p>Apellido: {this.state.userSelected.lastName}</p> : ''}
              {this.state.userSelected.company ? <p>Compañia: {this.state.userSelected.company}</p> : ''}
              {this.state.userSelected.job ? <p>Profesion: {this.state.userSelected.job}</p> : ''}
              {this.state.userSelected.city ? <p>Ciudad: {this.state.userSelected.city}</p> : ''}
              {this.state.userSelected.state ? <p>Estado: {this.state.userSelected.state}</p> : ''}
              {this.state.userSelected.birthday ? <p>Cumpleaños: {this.state.userSelected.birthday}</p> : ''}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClickOpenView(false)} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.isOpenEdit}
          onClose={() => this.handleClickOpenEdit(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Editar {this.state.userSelected.name + ' ' + this.state.userSelected.lastName}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {this.state.values.map(item => (
                <TextField
                    label={item.label}
                    key={item.name}
                    type='text'
                    margin='normal'
                    required={item.required}
                    fullWidth={true}
                    autoFocus={true}
                    name={item.name}
                    value={item.value}
                    onChange={this.handleChangeEdit}
                />
            ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClickOpenView(false)} color="primary">
              Cerrar
            </Button>
            <Button onClick={this.editUser} color="secondary" autoFocus>
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ListContacts;
