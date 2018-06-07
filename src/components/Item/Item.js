import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems } from "../../ducks/itemReducer";
import "./item.css";
import { Link } from "react-router-dom";

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
  }

  categoryToFilter(categoryName) {
    this.setState({ category: categoryName });
  }
  render() {
    console.log(this.state.category);
    let itemsArray = this.props.items.items.map((items, i) => {
      if (
        items.item_category === this.state.category &&
        this.state.category !== "default"
      ) {
        console.log("correct");
        return (
          <div className="itemList" key={i}>
            <h1>{items.item_category}</h1>
            <h1>{items.item_title}</h1>
            <h1>{items.item_price}</h1>
          </div>
        );
      } else if (this.state.category === "default") {
        return (
          <div className="itemList" key={i}>
            <h1>{items.item_category}</h1>
            <h1>{items.item_title}</h1>
            <h1>{items.item_price}</h1>
          </div>
        );
      }
    });

    return (
      <div>
        <p>
          <button onClick={() => this.categoryToFilter("default")}>All</button>
          <button onClick={() => this.categoryToFilter("vehicles")}>
            Cars
          </button>
          <button onClick={() => this.categoryToFilter("electronics")}>
            Electronics
          </button>
          <button onClick={() => this.categoryToFilter("sports")}>Sport</button>
        </p>

        <p>
          <Link to="/createItem">
            <button>Create post</button>
          </Link>
        </p>

        {itemsArray.length > 1 ? itemsArray : null}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getItems }
)(Item);
