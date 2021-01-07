import React, { useEffect, useState, useMemo } from "react";
import "./Details.css";
import { Pagination } from "./components";

export default function Details(props) {
  const [photos, setPhotos] = React.useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumName, setAlbumName] = React.useState("");

  const ITEMS_PER_PAGE = 9;

  const URL = `https://jsonplaceholder.typicode.com/albums/${props.match.params.id}/photos`;
  const albumURL = `https://jsonplaceholder.typicode.com/albums/${props.match.params.id}`;

  useEffect(() => {
    const getData = async () => {
      fetch(URL)
        .then((response) => response.json())
        .then((json) => {
          setPhotos(json);
          console.log(photos.length);
          setTotalItems(photos.length);
        });
    };

    getData();

    const getAlbumData = async () => {
      fetch(albumURL)
        .then((response) => response.json())
        .then((json) => {
          setAlbumName(json);
          console.log(photos.length);
        });
    };

    getAlbumData();
  }, []);

  const photosData = useMemo(() => {
    let computedPhotos = photos;

    setTotalItems(computedPhotos.length);

    //Current Page slice
    return computedPhotos.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [photos, currentPage]);

  return (
    <div className="Details">
      <div className="title">
        <h2>{albumName.title}</h2>
      </div>
      <div className="photo-container">
        {photosData.map((item, i) => (
          <img className="image" src={item.url} alt={item.title} />
        ))}
      </div>
      <div className="details-pagination">
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
