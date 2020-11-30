import React, { Component } from 'react'
import Header from './components/Header'
import News, {newsCategory} from './news'
import NewsList from './components/NewsList'
import Pagination from './components/Pagination'
import Results from './components/Results'
import Loading from './components/Loading'



// const fakeNews = [
//   {
//     title:'Title',
//     content:'Content',
//     url:'https//zerobazarbd.com',
//     urlToImage:'https//linktoimage.com',
//     publishedAt:'Published Date & Time',
//     source: {
//       name:'CNN'
//     },
//   },
//   {
//     title:'Title',
//     content:'Content',
//     url:'https//zerobazarbd.com',
//     urlToImage:'https//linktoimage.com',
//     publishedAt:'Published Date & Time',
//     source: {
//       name:'CNN'
//     },
//   },
// ];

// const URL = 'https://jsonplaceholder.typicode.com/users';
// axios.get(URL).then((res) => {
//   console.log(res.data);
// });

// const user = {
//   name: "Ahmad RAif",
//   email: 'arif@gmail.com',
//   username: 'ahmadarif',
// };
// axios.post(URL, user).then((res) => {
//   console.log(res);
// });

const news = new News(newsCategory.technology);
export default class App extends Component {
  
  state = {
    // news: [],
    // category: newsCategory.technology
    
    data: {},
    isLoading: true
  };
  
  // changeCategory = (category) =>{
  //   this.setState({category})
  // }
  
  componentDidMount(){
    // const url = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${this.state.category}&pageSize=5`;
    // axios.get(url)
    //       .then((response) => {
    //         console.log(response);
    //         this.setState({
    //           news: response.data.articles
    //         })
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    
    // const news = new News(newsCategory.technology);
    // news.getNews().then((data) => {
      
    // });
    
    news.getNews()
          .then(data => {
            this.setState({
              data,
              isLoading: false
            })
          })
          .catch(e => {
            console.log(e)
            alert('Something Went Wrong')
            this.setState({
              isLoading: false
            })
          })
    
  }
  
  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.category !== this.state.category) {
  //     const url = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_NEWS_API_KEY}&category=${this.state.category}&pageSize=5`;
  //     axios.get(url)
  //         .then((response) => {
  //           console.log(response);
  //           this.setState({
  //             news: response.data.articles
  //           })
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //   }
  // }
  
  
  next = () => {
    if(this.state.data.isNext){
      this.setState({isLoading: true})
    }
    news.next()
        .then(data => {
          this.setState({data, isLoading: false})
        })
        .catch(e => {
          console.log(e)
            alert('Something Went Wrong')
            this.setState({
              isLoading: false
            })
        })
  }
  
  prev = () => {
    if(this.state.data.isPrevious){
      this.setState({isLoading: true})
    }
    news.prev()
        .then(data => {
          this.setState({data, isLoading: false})
        })
        .catch(e => {
          console.log(e)
            alert('Something Went Wrong')
            this.setState({
              isLoading: false
            })
        })
  }
  
  handlePageChange = value => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value)
      }
    })
  }
  
  render() {
    
    const {
      article,
      isNext,
      isPrevious,
      totalResults,
      category,
      currentPage,
      totalPage,
    } = this.state.data
    
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 offset-md-3'>
            <Header category={this.state.category} changeCategory={this.changeCategory}/>
            <Results />
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <div>
                <NewsList news={this.state.data.article}/>
                <Pagination 
                  next = {this.next}
                  prev = {this.prev}
                  isPrevious = {isPrevious}
                  isNext = {isNext}
                  totalPage = {totalPage}
                  currentPage = {currentPage}
                  handlePageChange = {this.handlePageChange}
                />
              </div>
            )}
            
          </div>
        </div>
      </div>
    )
  }
}


