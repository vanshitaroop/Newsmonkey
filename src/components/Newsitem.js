import React, { Component } from 'react'

export default class Newsitem extends Component {
  
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className='my-3'>
           <div className="card" style={{width: "18rem", backgroundColor:"#F9FCFF"}}>
              <img src={imageUrl?imageUrl:"http://afiedu.com/wp-content/uploads/2019/03/New-4.jpg"} className="card-img-top" alt="..."/>
              <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
            </div>
    </div>
      </div>
    )
  }
}
