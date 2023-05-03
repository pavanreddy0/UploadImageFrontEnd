import React, { Component } from "react";
import "./index.css";

class ImageInput extends Component {
  state = {
    inputImage: "",
    selectedImage: "",
    images: [],
    image: "",
    size: "",
    token: "",
    imageId: "",
    // prod
    BASE_URL: "https://backend-tes-iolbjyrl7a-uc.a.run.app",
    // local
    // BASE_URL: "http://127.0.0.1:5000",
  };
  // https://www.youtube.com/watch?v=zjuItRMUAcM
  // https://www.youtube.com/watch?v=I_FmJGtOePk
  componentDidMount = () => {
    const token = localStorage.getItem("token");

    if (!(token && token.length > 0)) {
      window.location.href = "/login";
    }
    // this.setState({ token: token });
    this.getImages();
  };

  getImages = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log("getImages", token);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const imagesReq = await fetch(
        `${this.state.BASE_URL}/images`,
        requestOptions
      );
      if (imagesReq.ok) {
        const images = await imagesReq.json();
        this.setState({ images, image: "", size: "", imageId: "" });
      }
    } catch (e) {
      console.log("Fetching images failed with error: " + e);
    }
  };

  saveImage = async () => {
    const token = localStorage.getItem("token");
    // console.log("getImages", token);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("image", this.state.selectedImage);
    formdata.append("size", this.state.selectedImage.size);
    formdata.append("modified_date", this.state.selectedImage.lastModified);

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(`${this.state.BASE_URL}/images`, requestOptions);
    if (res.status !== 201) alert("Failed to create image");
    else alert("Image was successfully created");
    this.setState({ inputImage: "" });
    this.getImages();
  };

  getImage = async (event) => {
    const token = localStorage.getItem("token");
    // console.log("getImages", token);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const name = event.target.name;
    const req = await fetch(
      `${this.state.BASE_URL}/image/${name}`,
      requestOptions
    );

    if (req.ok) {
      const res = await req.json();
      this.setState({ image: res.data, size: res.size, imageId: res.id });
    }
  };

  handleChange = (e) => {
    const selectedImage = e.target.files[0];
    const inputImage = URL.createObjectURL(e.target.files[0]);
    this.setState({ inputImage, selectedImage });
  };

  handleLogout = () => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    this.componentDidMount();
  };

  handleDelete = async () => {
    const imageId = this.state.imageId;
    const token = localStorage.getItem("token");
    // console.log("getImages", token);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    const req = await fetch(
      `${this.state.BASE_URL}/image/${imageId}`,
      requestOptions
    );

    if (req.ok) {
      alert("Succesfully delete Image");
      this.getImages();
    }
  };

  render() {
    return (
      <div>
        <div style={{ marginLeft: "1500px" }} className="py-3 my-3">
          <button className="btn btn-danger" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
        <div className="container text-center border py-3 my-3 bgColor">
          <h2 className="display-5 text-center"> Image Upload Page </h2>
          <div className="row">
            <div className="col-12">
              <input
                className="btn btn-primary"
                type="file"
                id="image"
                alt="Select Image"
                accept="image/jpeg"
                onChange={this.handleChange}
              />
            </div>
            <div className="mt-2">
              <button className="btn btn-primary" onClick={this.saveImage}>
                Save
              </button>
            </div>
            <div>
              {/* Display selected image */}
              {this.state.inputImage && (
                <img className="imageSize" src={this.state.inputImage} alt="" />
              )}
              {/* Display images from vm */}

              {this.state.images.length > 0 &&
                this.state.images.map((image, index) => (
                  <div key={index}>
                    <a
                      // href={`/image?name=${image.file_name}`}
                      href={`#i${image.file_name}`}
                      onClick={this.getImage}
                      name={image.file_name}
                    >
                      {image.file_name}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="container text-center border py-3 my-3 bgColor">
          {this.state.image.length > 0 && (
            <div>
              <h2 className="display-5 text-center"> Image Download Page </h2>
              <div className="">Size : {this.state.size}</div>
              <img
                className="imageSize"
                src={`data:image/png;base64,${this.state.image}`}
                alt="uploaded pic"
              />
              <div>
                <button className="btn btn-danger" onClick={this.handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ImageInput;
