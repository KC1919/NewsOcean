import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    console.log("Im the constructor of News component!");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  //   https://newsapi.org/v2/top-headlines?country=ca&apiKey=2284196bba7c4b2697f4132f5b4f1236&page=${this.state.page}`

  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a43657b7a6cc428cbedaced1a86c2f54&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData.articles);
    console.log(parsedData.totalResults);
    this.setState({ loading: false });
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    await this.setState({
      page: this.state.page + 1,
    });
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a43657b7a6cc428cbedaced1a86c2f54&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);
    this.setState({ loading: false });
    this.setState({ articles: parsedData.articles });
  };

  handlePrevClick = async () => {
    await this.setState({
      page: this.state.page - 1,
    });
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a43657b7a6cc428cbedaced1a86c2f54&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);
    this.setState({ loading: false });
    this.setState({ articles: parsedData.articles });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsOcean-Top Headlines</h1>
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={this.state.articles.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVAkx75HMyg-N4Vb_vLLX_nhyxittiJJLdZg&usqp=CAU"
                    }
                    newsUrl={element.url ? element.url : "/"}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="d-flex justify-content-between">
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
        </div>
      </div>
    );
  }
}

export default News;
