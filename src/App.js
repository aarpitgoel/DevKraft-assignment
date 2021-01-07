import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import { Pagination } from "./components";

export default function App(props) {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const URL = "https://jsonplaceholder.typicode.com/albums/";
  const URL2 = "https://jsonplaceholder.typicode.com/users";

  // API FETCHING
  useEffect(() => {
    const getData = async () => {
      let response = await fetch(URL);
      let response2 = await fetch(URL2);

      try {
        const albums = await response.json();
        const users = await response2.json();
        setUsers(users);
        setAlbums(albums);
      } catch (err) {
        //console.log(err);
      } finally {
        try {
          //console.log(albums);
        } catch (err) {
          // console.log(err);
        }
      }
    };

    getData();
  }, []);

  const findUser = (id) => {
    let userData = users.filter((user) => user.id === id);

    return userData[0].name ? userData[0].name : "not found";
  };

  const viewMore = (id) => {
    props.history.push({ pathname: `/${id}`, albums });
  };

  const itemsData = useMemo(() => {
    let computeditems = albums;

    setTotalItems(computeditems.length);

    //Current Page slice
    return computeditems.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [albums, currentPage]);

  return (
    <div className="App">
      <div className="header">
        <h1>LIST OF ALBUMS</h1>
      </div>
      <div className="list">
        {itemsData.map((item, i) => (
          <div key={item.id} className="list-item">
            <div className="albumName">
              <div>Album Title : {item.title}</div>
              <div>User : {findUser(item.userId)}</div>
            </div>
            <div className="viewMore" onClick={() => viewMore(item.id)}>
              View More
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
