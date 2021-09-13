import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("Im the constructor of News component!");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2284196bba7c4b2697f4132f5b4f1236&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData.articles);

    this.setState({ articles: parsedData.articles });
  }

  handleNextClick = async() => {
    await this.setState({
      page: this.state.page + 1,
    });

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2284196bba7c4b2697f4132f5b4f1236&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData.articles);

    this.setState({ articles: parsedData.articles });
  };

  handlePrevClick =async () => {
    await this.setState({
      page: this.state.page - 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2284196bba7c4b2697f4132f5b4f1236&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData.articles);

    this.setState({ articles: parsedData.articles });
  };

  render() {
    return (
      <div className="container my-3">
        <h1>NewsOcean-Top Headlines</h1>

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
