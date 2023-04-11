import "./assets/scss/Splash.scss";
import React, { Component } from "react";
import MediKidsLogo from "./assets/img/logos/Imagotype_White_Text.png";

function LoadingMessage() {
  return (
    <div className="absolute bg-[#A375FF] h-full w-full">
      <div className="fade-in flex flex-col items-center justify-center min-h-screen w-full">
        <img src={MediKidsLogo} alt="" className="h-[20%] w-[20%]" />
        <div className="fade-in lds-ring m-6">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 3500);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      if (this.state.loading) return LoadingMessage();

      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;
