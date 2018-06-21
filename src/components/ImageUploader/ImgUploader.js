import React, { Component } from "react";
import firebase from "./firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import { connect } from "react-redux";
import { postImage } from "../../ducks/imageReducer";

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
              justifyCcontent: "center",
              backgroundColor: "steelblue",
              margin: "20vh 25vw 0vh 25vw",
              color: "white",
              padding: 40,
              borderRadius: 4
            }}
          >
            Upload images
          </CustomUploadButton>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.isUploading === false && this.state.progress === 100 ? (
            <h1>UPLOADED</h1>
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
