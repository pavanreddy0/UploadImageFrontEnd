import React, { Component } from "react";
import "../ImageInput/index.css";
class ShpwImage extends Component {
  state = { image: "" };
  componentDidMount = () => {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const name = params.get("name");
    this.getImage(name);
  };

  getImage = async (name) => {
    const req = await fetch(`image/${name}`);
    if (req.ok) {
      const res = await req.json();
      this.setState({ image: res.data });
    }
  };

  render() {
    return (
      <div className="container text-center border py-3 my-3">
        <h2 className="display-5 text-center"> Image Download Page </h2>
        <div className="row">
          <div className="col-12">
            <img
              className="imageSize"
              src={`data:image/png;base64,${this.state.image}`}
              alt="uploaded pic"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ShpwImage;
