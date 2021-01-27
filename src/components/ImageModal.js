import axios from "axios";
import React, {Fragment, useEffect, useState} from "react";
import {FaHeart} from "react-icons/fa";
import {IoMdAdd} from "react-icons/io";
import {GoLocation} from "react-icons/go";
import {IoMdShareAlt} from "react-icons/io";
import {RiInformationFill} from "react-icons/ri";

import {photoURL, key, unsplash} from "../utils/utils";

export default function Imagemodal({id, setImageId}) {
  const [imageInfo, setImageInfo] = useState({});

  useEffect(() => {
    console.log(id);

    if (id.length) {
      axios(photoURL + id, {
        headers: {
          Authorization: key,
        },
      })
        .then(res => setImageInfo(res.data))
        .catch(err => console.log(err));
    }
  }, [id]);

  const closeModal = e => {
    if (e.target.classList.contains("modal")) {
      setImageId("");
      setImageInfo({});
    }
  };

  return (
    <Fragment>
      {id.length > 0 && imageInfo.id && (
        <div className="modal" onClick={closeModal}>
          <section className="modal__content">
            <div className="modal__header">
              <div className="modal__header-author">
                <img
                  src={imageInfo.user.profile_image.large}
                  className="modal__header-author-picture"
                  alt="author"
                />
                <div className="modal__header-author-data">
                  <h3 className="modal__header-author-name">{`${imageInfo.user.first_name} ${imageInfo.user.last_name}`}</h3>
                  <a
                    href={unsplash + imageInfo.user.username}
                    className="modal__header-author-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{imageInfo.user.username}
                  </a>
                </div>
              </div>

              <div className="modal__header-user-actions">
                <div className="modal__header-user-actions-heart">
                  <FaHeart className="modal__header-user-actions-icons" />
                </div>
                <div className="modal__header-user-actions-like">
                  <IoMdAdd className="modal__header-user-actions-icons" />
                </div>
              </div>
            </div>

            <div className="modal__image-container">
              <img
                src={imageInfo.urls.regular}
                className="modal__image"
                alt={imageInfo.alt_description}
              />
            </div>

            <div className="modal__footer">
              <div className="modal__footer-location">
                <GoLocation className="modal__footer-location-icon" />{" "}
                {`${imageInfo.location.city || ""}, ${imageInfo.location.country || ""}`}
              </div>
              <div className="modal__footer-options">
                <div className="moda__footer-options-share">
                  <IoMdShareAlt />
                  Share
                </div>
                <div className="moda__footer-options-info">
                  <RiInformationFill /> Info
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
}
