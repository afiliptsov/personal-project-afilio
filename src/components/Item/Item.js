import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems } from "../../ducks/itemReducer";
// import "./item.css";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { StickyContainer, Sticky } from "react-sticky";
import {
  faCar,
  faTv,
  faBicycle,
  faReplyAll,
  faFire,
  faPlus,
  faMap
} from "@fortawesome/fontawesome-free-solid";
import { animateScroll as scroll } from "react-scroll";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "default"
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.categoryToFilter = this.categoryToFilter.bind(this);
  }

  componentDidMount() {
    this.props.getItems();
    console.log(this.props.getItems());
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  categoryToFilter(categoryName) {
    this.setState({ category: categoryName });
  }

  render() {
    console.log("Current item category", this.state.category);
    let itemsArray = this.props.items.items.map((items, id) => {
      if (
        items.item_category === this.state.category &&
        this.state.category !== "default"
      ) {
        console.log("correct");
        return (
          <Link to={"/item/" + items.id} key={items.id}>
            <div className="item">
              {items.priority === 1 ? (
                <div class="priority-tag">HOT</div>
              ) : null}
              <img className="item__img" src={items.image_url} alt="" />
              <h1 className="item__price">{"$ " + items.item_price}</h1>
              <h1 className="item__title">{items.item_title}</h1>
              <h3 className="item__location">{items.item_location}</h3>
              <button className="btn__visible item__show">Show Listing</button>
            </div>
          </Link>
        );
      } else if (this.state.category === "default") {
        return (
          <Link to={"/item/" + items.id} key={items.id}>
            <div className="item">
              {items.priority === 1 ? (
                <div className="priority-tag">HOT</div>
              ) : null}
              <img className="item__img" src={items.image_url} alt="" />
              <h1 className="item__price">{"$ " + items.item_price}</h1>
              <h1 className="item__title">{items.item_title}</h1>
              <h3 className="item__location">{items.item_location}</h3>
              <button className="btn__visible item__show">Show Listing</button>
            </div>
          </Link>
        );
      }
    });

    return (
      <div className="main-items">
        <div class="main-categories sticky">
          <button
            className="headerButtons"
            onClick={() => this.categoryToFilter("default")}
          >
            <FontAwesomeIcon className="headerSvg" icon={faReplyAll} />
          </button>
          <button
            className="headerButtons"
            onClick={() => this.categoryToFilter("vehicles")}
          >
            <FontAwesomeIcon className="headerSvg" icon={faCar} />
          </button>

          <button onClick={this.scrollToTop} className="fireButton">
            <div>
              <FontAwesomeIcon className="fireSvg" icon={faFire} />
            </div>
          </button>

          <button
            className="headerButtons"
            onClick={() => this.categoryToFilter("electronics")}
          >
            <FontAwesomeIcon className="headerSvg" icon={faTv} />
          </button>

          <button
            className="headerButtons"
            onClick={() => this.categoryToFilter("sports")}
          >
            <FontAwesomeIcon className="headerSvg" icon={faBicycle} />
          </button>

          <Link to="/map">
            <button className="headerButtons displayNone">
              <FontAwesomeIcon className="headerSvg" icon={faMap} />
            </button>
          </Link>
        </div>

        <div className="fixed-createpost-button">
          {!this.props.user.isAuthed ? (
            <a href={process.env.REACT_APP_LOGIN}>
              <p>
                <svg
                  class="add-post-button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" />
                </svg>
              </p>
            </a>
          ) : (
            <Link to="/createItem">
              <p>
                <svg
                  class="add-post-button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" />
                </svg>
              </p>
            </Link>
          )}
        </div>
        <div className="items-grid">
          {itemsArray.length >= 1 ? itemsArray : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getItems }
)(Item);
