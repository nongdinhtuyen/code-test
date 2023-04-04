import React, { useState } from "react";

const data = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 },
  { id: 5, name: "Product 5", price: 500 },
  { id: 6, name: "Product 6", price: 600 },
  { id: 7, name: "Product 7", price: 700 },
  { id: 8, name: "Product 8", price: 800 },
  { id: 9, name: "Product 9", price: 900 },
  { id: 10, name: "Product 10", price: 1000 },
];

const pageSize = 3; // Số phần tử trên mỗi trang

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / pageSize); // Tính số trang tối đa

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderData = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end).map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
      </tr>
    ));
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= maxPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return (
      <nav>
        <ul className="pagination">{pages}</ul>
      </nav>
    );
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default Table;
