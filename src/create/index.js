import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Card, CardBody } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Create extends Component {
  constructor (props) {
      super(props)

      this.state = {
          name: '',
          secondName:'',
          lastName:'',
          company: '',
          job: '',
          email: '',
          phone: '',
          typePhone: '',
          postalAddress: '',
          city: '',
          state: '',
          birthday: '',
          notes: '',
          favorite: true,
          label: '',
          values: [{
              name: 'name',
              required: true,
              label: 'Nombre'
          },
          {
              name: 'secondName',
              required: false,
              label: 'Segundo nombre'
          },
          {
              name: 'lastName',
              required: true,
              label: 'Apellido'
          },
          {
              name: 'company',
              required: false,
              label: 'Compañia'
          },
          {
              name: 'job',
              required: false,
              label: 'Profesion'
          },
          {
              name: 'email',
              required: false,
              label: 'Correo electronico'
          },
          {
              name: 'phone',
              required: false,
              label: 'Telefono'
          },
          {
              name: 'typePhone',
              required: false,
              label: 'Tipo de telefono'
          },
          {
              name: 'postalAddress',
              required: false,
              label: 'Direccion'
          },
          {
              name: 'city',
              required: false,
              label: 'Ciudad'
          },
          {
              name: 'state',
              required: false,
              label: 'Estado'
          },
          {
              name: 'birthday',
              required: true,
              label: 'Fecha de nacimiento'
          },
          {
              name: 'notes',
              required: true,
              label: 'Notas'
          },
          {
              name: 'label',
              required: true,
              label: 'Etiqueta'
          }],
          isDisabled: true,
          isOpen: false
      }
      this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps = (nextProps)=>{

    this.setState({
      name: '',
      secondName:'',
      lastName:'',
      company: '',
      job: '',
      email: '',
      phone: '',
      typePhone: '',
      postalAddress: '',
      city: '',
      state: '',
      birthday: '',
      notes: '',
      favorite: true,
      label: '',
    })
  }

  handleClickClose = () =>{
    this.setState({
      isOpen: false
    })
  }

  handleChange = (e) =>{
      const { value, name } = e.target

      this.setState({
          isDisabled: false,
          [name]: value
      })
  }

  addUser = (e) =>{
     e.preventDefault();
    let body = {
      name: this.state.name,
      secondName: this.state.secondName,
      lastName: this.state.lastName,
      company: this.state.company,
      job: this.state.job,
      email: this.state.email,
      phone: this.state.phone,
      typePhone: this.state.typePhone,
      postalAddress: this.state.postalAddress,
      city: this.state.city,
      state: this.state.state,
      birthday: this.state.birthday,
      notes: this.state.notes,
      favorite: this.state.favorite,
      label: this.state.label
    }
    this.props.createUser(body);
    this.setState({
      isDisabled: true,
      isOpen: true
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Crear usuario</h1>
        <Card>
        <CardBody>
          <form className='mt-new-task__form' onSubmit={this.addUser}>
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
                      value={this.state[item.name]}
                      onChange={this.handleChange}
                  />
              ))}
              <div className='mt-new-task__actions'>
                  <Button
                      variant='contained'
                      color='secondary'
                      size='medium'
                      disabled={this.state.isDisabled}
                      type='submit'
                      className='mt-new-task__action-submit'
                      style={{ marginRight: 10 }}
                  >
                      Agregar
                  </Button>
              </div>
          </form>
          </CardBody>
        </Card>
        <Dialog
          open={this.state.isOpen}
          onClose={() => this.handleClickClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Usuario creado"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se ha creado el usuario de forma exitosa
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClickClose()} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Create;
