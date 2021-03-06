import React,{Component}  from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Block from "./blocks.js";
import Canvas from "./chart.js";

class Searchbar extends React.Component{
	state = {
   		s_val:[],
   		is_active : false,
   	};
	constructor(props){
		super(props);
		this.handleselect=this.handleselect.bind(this);
		this.getContent = this.getContent.bind(this);
	}
	getContent() {
		if (this.state.s_val.length!=0){
			const len  = this.state.s_val.length;
			this.props.callback(this.state.s_val[len-1]);
		}
	}
	handleselect = async (e) => {
		e.preventDefault();

		if (!this.state.is_active){
			this.setState({
				is_active : true
			})
		}

		const url = `https://api.covid19api.com/total/dayone/country/${e.target.value}`;
		const response = await fetch(url);
		const data = await response.json();  

		this.setState({
			s_val : data,
		});
		this.getContent();

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
					{this.state.is_active ? (<Canvas test={this.state.s_val} />) : '' }
				</div>
			</div>
		);
	}
}

export default Searchbar;
