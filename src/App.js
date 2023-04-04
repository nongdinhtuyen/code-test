import React, { useEffect, useState } from 'react';
import './App.css';
import './App.scss';

const pageSize = 10, limit = 100;
function App() {

  const [_currentPage, setCurrentPage] = useState(1);
  const [_data, setData] = useState([]);
  const [_searchText, setSearchText] = useState('')
  const [_selected, setSearchSelected] = useState('')

  const maxPage = Math.ceil(_data.length / pageSize);

  const useQuery = () => {
    return new URLSearchParams();
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = (page = 0) => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((response) => response.json())
      .then((data) => setData(data.products));
  }

  useEffect(() => {
    fetchData();
  }, []);


  const renderData = () => {
    const start = (_currentPage - 1) * pageSize;
    const end = start + pageSize;
    return _data.slice(start, end).map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.brand}</td>
        <td className={item.description.length > 40 ? 'ellipsis' : ''}>{item.description}</td>
        <td>{item.price}</td>
        <td>{item.rating}</td>
        <td>{item.stock}</td>
      </tr>
    ));
  };

  const renderPagination = () => (
    <div className='pagination'>
      {Array.from({ length: maxPage }, (_, i) => i + 1).map((i) => (
        <div onClick={() => handlePageChange(i)} className={`item ${_currentPage === i ? 'active' : ''}`}>{i}</div>
      ))}
    </div>
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }

  const handleSelectChange = (e) => {
    setSearchSelected(e.target.value);
  };


  return (<div className="app">
    <div className="search">
      <label>
        <select value={_selected} onChange={handleSelectChange}>
          <option value="전체">전체</option>
          <option value="상품명">상품명</option>
          <option value="브랜드">브랜드</option>
          <option value="상품내용">상품내용</option>
        </select>
      </label>
      <div>
        <input value={_searchText} onChange={handleSearch} />
        <button>Search</button>
      </div>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th>상품번호</th>
          <th>상품명</th>
          <th>브랜드</th>
          <th>상품내용</th>
          <th>가격</th>
          <th>평점</th>
          <th>재고</th>
        </tr>
      </thead>
      <tbody>{renderData()}</tbody>
    </table>
    {renderPagination()}
  </div>);
}

export default App;
