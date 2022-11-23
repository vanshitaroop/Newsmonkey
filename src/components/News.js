import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {
  
 
  constructor(){
    super()
    console.log("tis is a constructor");
    this.state={
      articles:[]
    }
  }
  async componentDidMount(){
    console.log("I am cmd");
    let url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=8d201a4d55c44269973a3cdee179d3d0";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData); 
    this.setState({articles:parsedData.articles})

  }
  render() {
    console.log("render")
    return (
      <div className='container my-4'>
        <h1>NewsMonkey -Top Headlines</h1>
        
        <div className='row'>
        {this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,44):" "} description={element.description?element.description.slice(0,88):" "} newsUrl={element.url} imageUrl={element.urlToImage}/>
            </div>
        })}
          
          
        </div>
       
        
      </div>
    )
  }
}
