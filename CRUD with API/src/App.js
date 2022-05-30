import React, {Component} from 'react';
import axios from 'axios';
import Person from './components/person/person';

//* CRUD

//? work with API

//* HTTP requests
//? GET - Read - get data from server
//? POST - Create - send something to server 
//? DELETE - delete something from the server
//? PUT - Update - update some data on server

export default class App extends Component {
  state = {peopleArr : [], newUserName:'', newUserImg: '',isSpinning :true };
  
  //? Get
  async componentDidMount() {
    try {
    const {data} = await axios.get('https://628e25fba339dfef87a87ada.mockapi.io/people');
    console.log(data);
    this.setState( {peopleArr: data, isSpinning:false }
    //   , () => {
    //   console.log(this.state.peopleArr);
    // } 
    );
    } catch (e){
      console.log(e);
    }
  };

  //? POST
  handleCreate = async () => {
    this.setState({isSpinning:true});
    const newPerson = {
      name: this.state.newUserName,
      img: this.state.newUserImg,
    };
    try {
      const postedData = await axios.post(
      'https://628e25fba339dfef87a87ada.mockapi.io/people',
      newPerson);
      this.setState( (prev) => {
        return {
        peopleArr : [...prev.peopleArr, postedData.data],
        newUserName:'', 
        newUserImg: '',
        isSpinning:false};
      });
    } catch(e) {
      console.log(e.message);
    }
  };

  //? DELETE
  handleDelete = async (id) => {
    this.setState({isSpinning:true});
    try {
      const deletedperson = await axios.delete(
        `https://628e25fba339dfef87a87ada.mockapi.io/people/${id}`
      );
      this.setState (prev => {
      const newPeopleArr = prev.peopleArr.filter((p) => p.id !== id);
      return {peopleArr: newPeopleArr, isSpinning:false};
      });
    } catch (e) {
      console.log(e);
    }
  };

  //? PUT
  handleUpdate = async (id, newName) => {
    this.setState({isSpinning:true});
    const PersonToUpdate = this.state.peopleArr.find(
      (person) => person.id === id
    );
    const updatedPerson = {...PersonToUpdate,name: newName};
    const {data} = await axios.put(
      `https://628e25fba339dfef87a87ada.mockapi.io/people/${id}`
      ,updatedPerson);   
      this.setState((prev) => {
        return {peopleArr: prev.peopleArr.map((person) => {
          if(person.id===id){
            return data;
          }
          return person;
        }),
        isSpinning:false,
      };
        });
   };

  //? UI
  paintPeople = () => {
    return this.state.peopleArr.map( ({name, img, id}) => {
      return (
      <Person 
      key={id} 
      name={name} 
      img={img} 
      id={id} 
      handleDelete = {this.handleDelete}
      handleUpdate = {this.handleUpdate}
      />
      );
    });
  };

  handleInputChange = ({target}) => {
    this.setState({[target.id]: target.value,isSpinning:false});
  };

  render() {
    return (
      <div className='wrapper'>
        {this.state.isSpinning ? (
          <h1>Spinner</h1>
        ) : (
        <>
          <input 
          id = 'newUserName'
          onChange={(this.handleInputChange)} 
          value={this.state.newUserName} 
          placeholder='Enter new UserName'
          />
          <input 
          id='newUserImg'
          onChange={(this.handleInputChange)} 
          value={this.state.newUserImg} 
          placeholder='img URL'
          />
          <button onClick ={this.handleCreate}>create</button>
        <div className='item-wrapper'>
        {this.paintPeople()}</div>
        </>
        )}
      </div>
    );
  }
}
