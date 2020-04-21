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
  console.log(props.update);
  return (
    <div className = "global">
       <h3>Global Data </h3>
        <div>NewConfirmed = {props.update.NewConfirmed}</div>
        <div>TotalConfirmed =  {props.update.TotalConfirmed} </div>
        <div>NewDeaths = {props.update.NewDeaths} </div>
        <div>TotalDeaths = {props.update.TotalDeaths} </div>
        <div>NewRecovered = {props.update.NewRecovered} </div>
        <div>TotalRecovered = {props.update.TotalRecovered}</div>
    </div>
  ); 
}

const Fetching  = (props) =>{
    const handle = async (event) => {
      const resp = await axios.get(`https://api.covid19api.com/summary`) 
      props.onsubmit(resp.data);
    };
    return (
      <div className = "update_btn">
        <button onClick={handle}> Update </button>
      </div>
      );
  }
class App extends React.Component{
    state = {
    data : testData,
  }
 const handlesubmit = (newdata) => {
     console.log(newdata);
   this.setState({ data : newdata });
   console.log(this.state.data);
 };

  render(){
      return(
        <div>
          <h1>Covid-19 Tracking Cases</h1>    
               <Global  update = {this.state.data.Global} />
              <Fetching onsubmit = {this.handlesubmit}/>
              <table style={{width : '100%'}}>
                    <tr style={{ bgcolor : Math.random() < 0.5 ? 'red' : 'green', }}>
                         <th scope = {'col'} >Country</th>
                         <th>Total Confirmed Cases</th>
                         <th>Total Deaths</th>
                    </tr>
            </table>
          <Total test = { this.state.data }/>
        </div>
      );
  }
}
function Total (props){
  var rows = [];
      const len  = props.test.Countries.length;
      console.log(len)
      console.log(len);
    for (var i = 0; i < len; i++) {
        rows.push(<List {...props.test.Countries[i]} />);
    }
  return (
    <div>
      {rows}
   </div>
  );
  
}
function List (props){
  console.log('console statement')
  return (
     <table style={{width : '100%'}}>
                <tr>
                     <td colspan = {10} >{props.Country}</td>
                     <td colspan = {10}>{props.TotalConfirmed}</td>
                     <td colspan = {10}>{props.TotalDeaths}</td>
                </tr>
      </table>
  );
  
}

ReactDOM.render(
  <App />, document.getElementById('mountNode'),
);
