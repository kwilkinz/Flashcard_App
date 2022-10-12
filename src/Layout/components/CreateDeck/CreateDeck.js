import React, { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { createDeck } from "../../utils/api";
import { Link, useHistory } from "react-router-dom";

function CreateDeck() {
  // inital setup
  const initalForm = {
    name: "",
    description: "",
  };

  // useState / history
  const history = useHistory();
  const [newDeck, setNewDeck] = useState(initalForm);
  const controller = new AbortController();

  // Handle Text Change
  const handleChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  };

  // handle Submit button
  async function handleSubmit(event) {
    event.preventDefault();
    await createDeck(newDeck, controller.signal);
    history.push("/");
  }

  // Webpage Paint
  return (
    <div>
      {/* Breadcrumbs navagation bar */}
      <Breadcrumbs />

      <header>
        <h2>Create Deck</h2>
      </header>

      
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={newDeck.name}
                placeholder="Deck Name"
                style={{ width: "100%" }}
              />
            </div>
              <br />

            <div>
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                id="description"
                type="textarea"
                name="description"
                rows="3"
                onChange={handleChange}
                value={newDeck.description}
                style={{ width: "100%", marginBottom: "10px" }}
                placeholder="Brief description of the deck"
              />
              <br />
            </div>

            <Link to={"/"} 
              class="btn btn-secondary mr-3"
              >
              Cancel
            </Link>
            <button
              class="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      
  );
}

export default CreateDeck;
