import { useState } from "react";
import Item from "./item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  handleClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items.slice().sort(function (a, b) {
      return a.description.localeCompare(b.description);
    });
  }

  if (sortBy === "packed") {
    sortedItems = items.slice().sort(function (a, b) {
      return Number(a.packed) - Number(b.packed);
    });
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(function (item) {
          return (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={function (e) {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed status</option>
        </select>
        <button onClick={handleClearList}>Clear List</button>
      </div>
    </div>
  );
}
