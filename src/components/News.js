import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsOcean`;
  }

  capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  static defaultProps = { country: "in", category: "general", pageSize: 10 };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  async update() {
    this.props.progress(10);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=a43657b7a6cc428cbedaced1a86c2f54&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.progress(30);
    let parsedData = await data.json();
    this.props.progress(70);
    this.setState({ loading: false });
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    this.props.progress(100);
  }

  async componentDidMount() {
    this.update();
  }

  // handleNextClick = async () => {
  //   await this.setState({
  //     page: this.state.page + 1,
  //   });

  //   this.update();
  // };

  // handlePrevClick = async () => {
  //   await this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.update();
  // };

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a43657b7a6cc428cbedaced1a86c2f54&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    
    let parsedData = await data.json();
    
    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedData.articles),
    });
    
    // console.log(this.state.articles.length);
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "25px 0px" }}>
          NewsOcean - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={
            this.state.articles.length <= this.state.totalResults ? (
              <Spinner />
            ) : null
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={this.state.articles.url}>
                    <NewsItem
                      key={element.url}
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVAkx75HMyg-N4Vb_vLLX_nhyxittiJJLdZg&usqp=CAU"
                      }
                      newsUrl={element.url ? element.url : "/"}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="d-flex justify-content-between">
          <div>
            <button
              disabled={this.state.page === 1}
              type="button"
              className="btn btn-danger"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
          </div>
          <div>
            <button
              disabled={
                this.state.page === Math.ceil(this.state.totalResults / 20)
              }
              type="button"
              className="btn btn-danger"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div> */}
      </>
    );
  }
}

export default News;
