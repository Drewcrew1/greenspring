import React, { Component } from "react"

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <a href="" className="footer-text">
          © {new Date().getFullYear()}
          {` `} Greenspring Brewing Company. All rights reserved.
        </a>
      </footer>
    )
  }
}
export default Footer
