import React, { Component } from "react";
import firebase from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import { connect } from "react-redux";
import { postImage } from "../../ducks/imageReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ImgUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      isUploading: false,
      progress: 0,
      itemURL: ""
    };
  }

  success = () =>
    toast("Images uploaded successfully", {
      type: toast.TYPE.SUCCESS,
      autoClose: 4000
    });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ item: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref()
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ itemURL: url }))
      .then(() =>
        this.props.postImage(
          this.props.postId,
          this.state.itemURL.replace("/o/", "/o/resized-")
        )
      );
  };

  //   uploadUrlToDatabase() {
  //     this.props.postImage(this.props.postID, this.state.itemURL);
  //   }

  render() {
    console.log(this.props);
    return (
      <div className="upload-image">
        <p className="chooseCategory">
          <h2 className="chooseCategoryText">Upload an image</h2>
        </p>
        <form>
          {console.log(this.state.itemURL)}
          {console.log("Final state is", this.state.avatarURL)}
          <CustomUploadButton
            accept="image/*"
            name="item"
            randomizeFilename
            storageRef={firebase.storage().ref()}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "steelblue",
              margin: "10vh 25vw",
              color: "white",
              border: "2px solid #ffffff",
              padding: "20px",
              boxShadow:
                "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
              fontSize: "2rem"
            }}
          >
            Upload images
          </CustomUploadButton>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.isUploading === false && this.state.progress === 100 ? (
            <h1 className="uploaded">UPLOADED</h1>
          ) : null}
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { postImage }
)(ImgUploader);
