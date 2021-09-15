import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";

export class News extends Component {
  constructor(props) {
    //class constructor
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsOcean`; //setting the title
  }

  key = "2284196bba7c4b2697f4132f5b4f1236"; //news api key

  capitalize = (s) => {
    //function to capitalize
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  static defaultProps = { country: "in", category: "general", pageSize: 10 };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  async update() {
    //function to update the states and data accordingly
    this.props.progress(10);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.key}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
    //mounting the component after rendering the document
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
    //this function is calledd while scrolling,till all the articles have not been fetched
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.key}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url); //fetching the data

    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedData.articles),
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="text-center" style={{ margin: "80px 0px 25px 0px" }}>
            NewsOcean - Top {this.capitalize(this.props.category)} Headlines
          </h1>
        </div>

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
                  <div className="col-md-4" key={uuidv4()}>
                    <NewsItem
                      key={uuidv4()}
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage !== null
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
