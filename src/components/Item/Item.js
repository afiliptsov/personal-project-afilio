import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems } from "../../ducks/itemReducer";
// import "./item.css";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faCar,
  faTv,
  faBicycle,
  faReplyAll
} from "@fortawesome/fontawesome-free-solid";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "default"
    };
    this.categoryToFilter = this.categoryToFilter.bind(this);
  }

  componentDidMount() {
    this.props.getItems();
    console.log(this.props.getItems());
  }

  categoryToFilter(categoryName) {
    this.setState({ category: categoryName });
  }
  render() {
    console.log("Current item caregory", this.state.category);
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
              <h2 className="item__description">Description:</h2>
              <h2 className="item__condition">{items.item_description}</h2>
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
                <div class="priority-tag">HOT</div>
              ) : null}
              <img className="item__img" src={items.image_url} alt="" />
              <h1 className="item__price">{"$ " + items.item_price}</h1>
              <h1 className="item__title">{items.item_title}</h1>
              <h2 className="item__description">Description:</h2>
              <h2 className="item__condition">{items.item_description}</h2>
              <h3 className="item__location">{items.item_location}</h3>
              <button className="btn__visible item__show">Show Listing</button>
            </div>
          </Link>
        );
      }
    });

    return (
      <div className="main-items">
        <div class="main-categories">
          <button
            className="vehiclesButton"
            onClick={() => this.categoryToFilter("default")}
          >
            <FontAwesomeIcon className="mainSvg" icon={faReplyAll} />
            <span className="categoryNames">All</span>
          </button>
          <button
            className="vehiclesButton"
            onClick={() => this.categoryToFilter("vehicles")}
          >
            <FontAwesomeIcon className="mainSvg" icon={faCar} />
            <span className="categoryNames">Vehicles</span>
          </button>

          <button
            className="electonicsHomeButton"
            onClick={() => this.categoryToFilter("electronics")}
          >
            <FontAwesomeIcon className="mainSvg" icon={faTv} />
            <span className="categoryNames">Electronics</span>
          </button>

          <button
            className="sportsHomeButton"
            onClick={() => this.categoryToFilter("sports")}
          >
            <FontAwesomeIcon className="mainSvg" icon={faBicycle} />
            <span className="categoryNames">Sports</span>
          </button>
        </div>

        <p className="fixed-createpost-button">
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
        </p>

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
