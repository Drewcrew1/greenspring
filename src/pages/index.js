import React, { Component } from "react"
import Layout from "../components/Layout/layout"
import beach from "../images/beach.jpg"
import { graphql } from 'gatsby'
class IndexPage extends Component {
  state = {
    smallScreen: false,
    modal: { name: "" },
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this))
    this.resize()
  }

  resize() {
    this.setState({ smallScreen: window.innerWidth <= 840 })
  }

  openModal(e) {
    this.setState({ modal: e })
    document.getElementById("modal").style.display = "block"
  }

  closeModal() {
    document.getElementById("modal").style.display = "none"
  }
  render() {
    let indexData = this.props.data.allIndexJson.nodes[0]
    let homeItems = []
    let i = 0
    indexData.home_items.forEach(item => {
      homeItems.push(
        <div>
        <div
          key={i}
          onClick={this.openModal.bind(this, item)}
          className={
            this.state.smallScreen ? "grid-item-small" : "home-grid-item"
          }
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        <p>{item.name}</p>
        </div>
      )
      i++
    })
    let soldAt = []
    i = 0
    indexData.soldAt.forEach(item => {
      soldAt.push(
        <a href={item.url} target="_blank">
        <div
          key={i}
          // onClick={this.openModal.bind(this, item)}
          className={
            this.state.smallScreen ? "grid-item-small" : "home-grid-item"
          }
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "100%",
          }}
        ></div></a>
      )
      i++
    })
    return (
      <Layout page={"home"}>
        <h1 className="title">{indexData.title}</h1>
        <div className="home-main" style={{backgroundImage: "../images/beach.jpg"}}>
          <div className="text">{indexData.text}</div>
          <div className="divider"></div>
          <h2 className="subtitle">{indexData.subtitle}</h2>
          <div
            className={
              this.state.smallScreen
                ? "grid-container-small"
                : "home-grid-container"
            }
          >
            {homeItems}
          </div>
          <div className="divider"></div>
          <h2 className="subtitle">FIND US AT THESE SPOTS</h2>
          <div
            className={
              this.state.smallScreen
                ? "grid-container-small"
                : "home-grid-container"
            }
          >
            {soldAt}
          </div>
        </div>
        <div id="modal" className="modal" onClick={this.closeModal}>
          <div
            className={
              this.state.smallScreen ? "modal-content-small" : "modal-content"
            }
          >
            <span className="modal-close">&times;</span>
            <div className="modal-grid-container">
              <div className="modal-grid-item-left">
                <span className="modal-title">{this.state.modal.name}</span>
                <p className="modal-text">{this.state.modal.description}</p>
                <p className="modal-text">
                  Season: {this.state.modal.completed}
                </p>
                <p className="modal-text">
                  ABV: {this.state.modal.abv}
                </p>
              </div>
              <div className="modal-grid-item-right">
                <img
                  src={this.state.modal.image}
                  alt={this.state.modal.name}
                  className="modal-image"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default IndexPage

export const query = graphql`
  query {
    allIndexJson {
      nodes {
        title
        description
        text
        subtitle
        home_items {
          name
          description
          completed
          image
          abv
        }
        soldAt {
          name
          description
          url
          image
        }
      }
    }
  }
`
