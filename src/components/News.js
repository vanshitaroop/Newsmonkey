import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'



export default class News extends Component {
  
  static defaultProps = {
    country:"in",
    pageSize: 5,
    category: "general"
  }
  static propTypes={
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props)
    console.log("tis is a constructor");
    this.state={
      page:2,
      articles:[],
      loading:true,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} -NewsMonkey`
  }
  async updateNews(){
    this.props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d201a4d55c44269973a3cdee179d3d0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(this.state.page)
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData); 
    this.setState({
      totalResults:parsedData.totalResults,
      articles:parsedData.articles,
      loading:false
    })
    this.props.setProgress(100);
  }
  async componentDidMount(){
 this.updateNews()

  }

  fetchMoreData = async () => {
   this.setState({page:this.state.page+1})
   const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d201a4d55c44269973a3cdee179d3d0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(this.state.page)
    
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData); 
    this.setState({
      totalResults:parsedData.totalResults,
      articles:this.state.articles.concat(parsedData.articles),
      loading:false
    })
   
  }
  // handleNextClick= async()=>{
    
  // //  if (!(this.state.page+1>Math.ceil(this.state.totalResults/this.state.pageSize))){
  // //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d201a4d55c44269973a3cdee179d3d0&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  // //   this.setState({loading:true})
  // //   let data = await fetch(url);
  // //   let parsedData = await data.json()
  // //   console.log(parsedData); 
  // //   this.setState({
  // //     page:this.state.page+1,
  // //     articles:parsedData.articles,
  // //     loading:false
  // //   })
  // this.setState({page:this.state.page + 1})
  // this.updateNews()
  // }
  
   
  
  // handlePrevClick= async ()=>{
  //   // console.log("prev");
  //   // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8d201a4d55c44269973a3cdee179d3d0&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading:true})
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json()
  //   // console.log(parsedData); 
  //   // this.setState({
  //   //   page:this.state.page-1,
  //   //   articles:parsedData.articles,
  //   //   loading:false
  //   // })
  //   this.setState({page:this.state.page - 1})
  //   this.updateNews()
    
  // }
  render() {
    console.log("render")
    return (
     <>
       <div className='container my-4'>
        <h1 className='text-center my-5'>NewsMonkey -Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className='container'>
        <div className='row'>
        {this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,44):" "} description={element.description?element.description.slice(0,88):" "} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
      <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick} >Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
      </div> */}
        </div> 
       
      
     
     </>
    )
  }
}
