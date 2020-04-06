import React, { Component } from "react";
import "../styles/App.css";
import BasicInfo from "./BasicInfo";
import ActivitiesInfo from "./ActivitiesInfo";
import PayInfo from "./PayInfo";
import ShirtInfo from "./ShirtInfo";
import SubmitButton from "./SubmitButton";

export default class App extends Component {
  state = {
    step: 3,
    validationErrors: false,

    name: "",
    email: "",
    jobRole: "full-stack js developer",
    selectedShirt: "Small",
    selectedDesign: "Select Theme",
    selectedColor: "Select a color",
    total: 0,
    selectedActivity: {},
    activitiesArray: [],
    selectedPayMethod: "cc",
    validCC: null,
    validZip: null,
    validCCV: null,
    validYear: null,
    ccNum: "",
    ccZip: "",
    ccv: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  setStateValidation = (input, bool) => {
    this.setState({ [input]: bool });
  };

  handlePrice = (e, price) => {
    e.target.checked
      ? this.setState(prevState => {
        return { price: prevState += price }
      })
      : this.setState(prevState => {
        return { price: prevState -= price }
      });
  };

  // add/ remove any checked items to the array and handle duplicates
  handleActivities = (e, cb) => {
    if (e.target.checked) {
      this.setState((prevState, prevProps) => {
        if (!prevState.activitiesArray.includes(cb)) {
          return {
            activitiesArray: [...prevState.activitiesArray, cb],
          };
        }
      });
    } else {
      let activities = this.state.activitiesArray.filter(activity => {
        return cb.index !== activity.index;
      });

      this.setState({
        activitiesArray: [...activities],
      });
    }
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  onSubmit = data => console.log(data);

  render() {
    let { step } = this.state;

    return (
      <div className="container">
        <header>
          <span>Register for</span>
          <h1>Full Stack Conf</h1>
        </header>

        <form
          onSubmit={e => {
            e.preventDefault();
            this.onSubmit(e);
          }}
          action="index.html"
          method="post"
        >
          <fieldset>
            {step === 1 && (
              <BasicInfo
                state={this.state}
                handleChange={this.handleChange}
                setStateValidation={this.setStateValidation}
                nextStep={this.nextStep}
              />
            )}
            {step === 2 && (
              <ShirtInfo
                state={this.state}
                handleChange={this.handleChange}
                setStateValidation={this.setStateValidation}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
              />
            )}
            {step === 3 && (
              <ActivitiesInfo
                state={this.state}
                handleActivities={this.handleActivities}
                handlePrice={this.handlePrice}
                setStateValidation={this.setStateValidation}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
              />
            )}
            {step === 4 && (
              <PayInfo
                state={this.state}
                setStateValidation={this.setStateValidation}
                handleChange={this.handleChange}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
              />
            )}
            {/* hide until everything is filled */}
            {step === 5 && <SubmitButton />}
          </fieldset>
        </form>
      </div>
    );
  }
}