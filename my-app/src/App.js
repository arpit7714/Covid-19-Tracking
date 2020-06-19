import React,{Component}  from 'react';
import axios from 'axios';
import './App.css';
import Searchbar from "./search.js";
import Block from "./blocks.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner'



var testData = 
{
  "Global": {
    "NewConfirmed": 100282,
    "TotalConfirmed": 1162857,
    "NewDeaths": 5658,
    "TotalDeaths": 63263,
    "NewRecovered": 15405,
    "TotalRecovered": 230845
  },
  "Countries": [
    {
      "Country": "ALA Aland Islands",
      "CountryCode": "AX",
      "Slug": "ala-aland-islands",
      "NewConfirmed": 0,
      "TotalConfirmed": 0,
      "NewDeaths": 0,
      "TotalDeaths": 0,
      "NewRecovered": 0,
      "TotalRecovered": 0,
      "Date": "2020-04-05T06:37:00Z"
    },
    ]
}
const Global = (props) => {
  return (
    <div className = "global">
    <Block param={props.update} to_update = { props.fromchild}/>
    </div>
  ); 
}

class Fetching extends React.Component{
  state = {
    loading : true
  };
  
  async componentDidMount() {
    const response = await fetch("https://api.covid19api.com/summary");
    const data = await response.json();  
    console.log(data);
    this.props.onsubmit(data)
    this.setState({ loading : false })
    }
      render(){
          return (
            <div></div>
            );
      }
  }

class App extends React.Component{
    state = {
    	data : [],
      to_pass : [],
  	}
  	constructor(props){
  		super(props)
  		this.handling = this.handling.bind(this);
      this.Fromsearch = this.Fromsearch.bind(this);
  	}
    handling (newdata){
        this.setState({ 
            data:newdata
        });
   }

    Fromsearch(param){
        this.setState({
           to_pass : param
      })
    }
  render(){
      console.log(this.state.to_pass);
      return(
        <div>
          <div className="main">
            <div className="headline_main">Covid-19</div>  
          </div>  
           <Fetching onsubmit = {this.handling}/>
           {this.state.data.length==0 ? <div className = "spinner"><Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner> </div>: 
            <div>
               <Global  update = {this.state.data.Global} fromchild = {this.state.to_pass}/>
               <Searchbar test= {this.state.data} callback = {this.Fromsearch}/> 
            </div>} 
        </div>
      );
  }
}
export default App;

