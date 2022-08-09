import React, { Component } from "react"
import Layout from "../components/Layout/layout"
import { serialize } from 'dom-form-serializer'
import './Form.css'
class ContactPage extends Component {
  static defaultProps = {
    name: 'Simple Form Ajax',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your inquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + JSON.stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }
  render() {
    let contactData = this.props.data.allContactJson.nodes[0]
    const { name, subject, action } = this.props
    return (
      <Layout page={"contact"}>
        <h1 className="title">{contactData.title}</h1>
        <div className="text">
          We would love to hear from you. Drop us a line.
        </div>
        {/* <div className="contact-grid-container">
          <div className="contact-grid-item">
            <img
              src={contactData.email_icon}
              alt="Email"
              className="contact-icon"
            ></img>
          </div>
          <div className="contact-grid-item">
            <img
              src={contactData.phone_icon}
              alt="Phone"
              className="contact-icon"
            ></img>
          </div>
          <div className="contact-grid-item">
            <img
              src={contactData.twitter_icon}
              alt="Twitter"
              className="contact-icon"
            ></img>
          </div>
          <div className="contact-grid-item">greenspringbrewing@gmail.com</div>
          <div className="contact-grid-item">410 206 3918</div>
          <div className="contact-grid-item">@greenspringbrewingco</div>
        </div> */}
        <div className="contact-grid-container">
          <div className="contact-grid-item">
            <img
              src={contactData.email_icon}
              alt="Email"
              className="contact-icon"
            ></img>
          </div>
          
          <div className="contact-grid-item">greenspringbrewing@gmail.com</div>
     
        </div>
        <div className="contact-grid-container">
        <div className="contact-grid-item">
            <img
              src={contactData.phone_icon}
              alt="Phone"
              className="contact-icon"
            ></img>
          </div>
          
          <div className="contact-grid-item">410 206 3918</div>
     
        </div>

        <div className="contact-grid-container">
        <div className="contact-grid-item">
            <img
              src={contactData.twitter_icon}
              alt="Twitter"
              className="contact-icon"
            ></img>
          </div>
          
          <div className="contact-grid-item">@greenspringbrewingco</div>
     
        </div>
        
        <div className="divider"></div>
        <div  className="text2">
        <form
          className="Form"
          name="Contact Form"
          action={action}
          method="POST"
          onSubmit={this.handleSubmit}
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Firstname"
                name="firstname"
                required
              />
              <span>Firstname</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
              />
              <span>Lastname</span>
            </label>
          </div>
          
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              name="emailAddress"
              required
            />
            <span>Email address</span>
          </label>
         
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              required
            />
            <span>Message</span>
          </label>
          {/* <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="newsletter"
              type="checkbox"
            />
            <span>Get news updates</span>
          </label> */}
          <p className="Form--NoSeeInput">
              <label>Don't fill this out if you're a human: <input name="bot-field" autoComplete="off" type="text" placeholder="Enter your name if you dare"></input></label>
          </p>
          {/* <div className="g-recaptcha" data-sitekey="6Ldh8uEZAAAAAKx44suXZvzRlAzbql11O0drIcEA"></div> */}
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Submit"
            disabled={this.state.disabled}
          />
        </form>
        </div>
      </Layout>
    )
  }
}
export default ContactPage

export const query = graphql`
  query {
    allContactJson {
      nodes {
        id
        title
        description
        text
        email
        phone
        twitter
        email_icon
        phone_icon
        twitter_icon
      }
    }
  }
`
