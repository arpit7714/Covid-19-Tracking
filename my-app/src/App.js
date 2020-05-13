import React,{Component}  from 'react';
import axios from 'axios';
import './App.css';
import Searchbar from "./search.js";
import Block from "./blocks.js";
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <Block param={props.update}/>
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
            <div>
                {this.state.loading ? <div>loading....</div> : <div>...</div>}  
            </div>
            

            );
      }
  }
class App extends React.Component{
    state = {
    	data : testData,
  	}
  	constructor(props){
  		super(props)
  		this.handling = this.handling.bind(this)
  	}
    handling (newdata){
  	console.log(newdata);
   this.setState({ 
      data:newdata
   });

  console.log("test2");
  console.log(this.state.data);
  console.log("final statement");
  
  }
  render(){
      return(
        <div>
          <div className="main">
            <div className="headline_main">Covid-19</div>  
          </div>  
           <Fetching onsubmit = {this.handling}/>
          <Global  update = {this.state.data.Global} />
         <Searchbar test= {this.state.data}/>
        </div>
      );
  }
}
///function Total (props){
//   var rows = [];
//       const len  = props.test.Countries.length;
//       console.log(len)
//       console.log(len);
//     for (var i = 0; i < len; i++) {
//         rows.push(<List {...props.test.Countries[i]} />);
//     }
//   return (
//     <div className="fixed">
//     <table> 
//       <tr>
//               <th>Country</th>
//               <th>Total Confirmed Cases</th>
//               <th>Total Deaths</th>
//       </tr>
//       {rows}
//     </table>  
//    </div>
//   );
  
// }
// function List (props){
//   console.log('console statement')
//   return (
//                       <tr>
//                          <td style={{ width : '100',}}>{props.Country}</td>
//                          <td style={{ width : '100'}}>{props.TotalConfirmed}</td>
//                          <td style={{ width : '100'}}>{props.TotalDeaths}</td>
//                       </tr>    
//   );
  
// }

export default App;

