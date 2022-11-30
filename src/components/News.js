
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

import React ,{useEffect,useState} from 'react'

export default function News(props) {
  

  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [page, setpage] = useState(1)
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [totalResults, settotalResults] = useState(0)

  
  const updateNews = async ()=>{
     props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
     props.setProgress(30);
    let parsedData = await data.json()
     props.setProgress(70);
    console.log(parsedData); 
    setarticles(parsedData.articles)
    setloading(false)
    settotalResults(parsedData.totalResults)
  
     props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter( props.category)} -NewsMonkey`
    updateNews()
    // eslint disable next line
     
  }, [])
  
 

  const fetchMoreData = async () => {
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData); 
    setarticles(articles.concat(parsedData.articles))
    setloading(false)
    settotalResults(parsedData.totalResults)
    
   
  }
  // handleNextClick= async()=>{
    
  // //  if (!(this.state.page+1>Math.ceil(this.state.totalResults/this.state.pageSize))){
  // //   let url =`https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=8d201a4d55c44269973a3cdee179d3d0&page=${this.state.page+1}&pageSize=${ props.pageSize}`;
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
  //   // let url =`https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=8d201a4d55c44269973a3cdee179d3d0&page=${this.state.page-1}&pageSize=${ props.pageSize}`;
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
 
    return (
     <>
       <div className='container'>
       <div className='container my-4'>
        <h1 className='text-center ' style={{margin:"35px 0px" , marginTop:"90px"}}>NewsMonkey -Top Headlines from {capitalizeFirstLetter( props.category)}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        <div className='container'>
        <div className='row'>
        {articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,44):" "} description={element.description?element.description.slice(0,88):" "} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      {/* <div className='container d-flex justify-content-between'>
      <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick} >Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/ props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
      </div> */}
        </div> 
       </div>
       
      
     
     </>
    )
  
}
News.defaultProps = {
  country:"in",
  pageSize: 5,
  category: "general"
}
News.propTypes={
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category: PropTypes.string,
}
