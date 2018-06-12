import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems } from "../../ducks/itemReducer";
import "./item.css";
import { Link } from "react-router-dom";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "default",
      search: ""
    };
    this.categoryToFilter = this.categoryToFilter.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.props.getItems();
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value
    });
  }

  categoryToFilter(categoryName) {
    this.setState({ category: categoryName });
  }
  render() {
    console.log(this.state.category);
    let itemsArray = this.props.items.items.map((items, id) => {
      if (
        items.item_category === this.state.category &&
        this.state.category !== "default"
      ) {
        console.log("correct");
        return (
          <Link to={"/item/" + items.id} key={items.id}>
            <div className="itemList">
              <h1>{items.item_category}</h1>
              <h1>{items.item_title}</h1>
              <h1>{items.item_price}</h1>
            </div>
          </Link>
        );
      } else if (this.state.category === "default") {
        return (
          <Link to={"/item/" + items.id} key={items.id}>
            <div className="itemList">
              <h1>{items.item_category}</h1>
              <h1>{items.item_title}</h1>
              <h1>{items.item_price}</h1>
            </div>
          </Link>
        );
      }
    });

    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch}
        />
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

        {itemsArray.length >= 1 ? itemsArray : null}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getItems }
)(Item);
