import { useContext, useEffect } from "react";
import { BookContext } from "../Context/BookContext";
export default function Aside({ category, SetCategory }) {
  const { hasBook, FetechCategoryHasBook } = useContext(BookContext);
  useEffect(() => {
    FetechCategoryHasBook();
  }, [FetechCategoryHasBook]);
  return (
    <>
      <aside className="sidebar">
        <h2 className="sidebar-title">Categories</h2>
        <ul className="category-list">
          <li className={`category-item ${category === "All" ? "active" : ""}`} onClick={() => SetCategory("All")}>
            All Books
          </li>
          {hasBook?.map((cat) => (
            <li key={cat.id} className={`category-item ${category == cat.id ? "active" : ""}`} onClick={() => SetCategory(cat.id)}>
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
