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
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ itemURL: url }))
      .then(() => this.props.postImage(this.props.postId, this.state.itemURL));
  };

  //   uploadUrlToDatabase() {
  //     this.props.postImage(this.props.postID, this.state.itemURL);
  //   }

  render() {
    console.log(this.props);
    return (
      <div>
        <form>
          <label>Item:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.itemURL && <img src={this.state.itemURL} />}
          {console.log(this.state.itemURL)}
          {console.log("Final state is", this.state.avatarURL)}
          <CustomUploadButton
            accept="image/*"
            name="item"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple
            style={{
              backgroundColor: "steelblue",
              color: "white",
              padding: 5,
              borderRadius: 4
            }}
          >
            Select your awesome item
          </CustomUploadButton>
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
