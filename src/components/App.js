import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./packinglist";
import Stats from "./stats";

export default function App() {
  const [items, SetItems] = useState([]);

  function handleAddItems(item) {
    SetItems(function (items) {
      return [...items, item];
    });
  }

  function handleDeleteItem(id) {
    SetItems(function (items) {
      const res = items.filter(function (citem) {
        return citem.id !== id;
      });
      return res;
    });
  }

  function handleToggleItem(id) {
    SetItems(function (items) {
      return items.map(function (citem) {
        return citem.id === id ? { ...citem, packed: !citem.packed } : citem;
      });
    });
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all the items"
    );

    if (confirmed) {
      SetItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
