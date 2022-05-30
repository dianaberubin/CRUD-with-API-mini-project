import React, {Component} from 'react'

export default class Person extends Component {
    state = {value:''};
handleOnChange = ({ target }) => {
 this.setState({value: target.value});
};

handleUpdateClick = () => {
    this.setState({value: ''});
    this.props.handleUpdate(this.props.id, this.state.value);
};
  render () {
        return (
    <div className='item'>
        <h2>{this.props.name}</h2>
        <img src={this.props.img}/>
        <div>
            <input onChange={this.handleOnChange} value={this.state.value}/>
        </div>
        <div>
        <button onClick={() => this.props.handleDelete(this.props.id)}>Delete</button>
        <button 
            onClick= {this.handleUpdateClick}>Update</button>
        </div>
    </div>
  );
 }
}
