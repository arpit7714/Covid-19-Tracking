import React,{Component}  from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Block from "./blocks.js";
import Canvas from "./chart.js";

class Searchbar extends React.Component{
	state = {
   		s_val:[],
   		val:null
   	};
	constructor(props){
		super(props);
		this.handleselect=this.handleselect.bind(this);
	}
	handleselect = async (e) => {
		e.preventDefault();

		const url = `https://api.covid19api.com/total/dayone/country/${e.target.value}`;
		const response = await fetch(url);
		const data = await response.json();  

		this.setState({
			s_val : data,
		});
	}
    render(){
		var rows = [];
	    const len  = this.props.test.Countries.length;
	    for (var i = 0; i < len; i++) {
	        rows.push(<option value={this.props.test.Countries[i].Country}> {this.props.test.Countries[i].Country} </option> );
	    }
		return(
			<div>
			   <div className = "country">
			   		<div className="dropdown_heading">Select Country</div>
					<select onChange={this.handleselect} value={this.state.val} className="dropdown">
						{rows}
					</select>
				</div>
				<Canvas test = {this.state.s_val}/>
			</div>
		);
	}
}

export default Searchbar;
