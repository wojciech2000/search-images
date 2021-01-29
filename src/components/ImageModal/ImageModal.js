import axios from "axios";
import React, {Fragment, useEffect, useState} from "react";
import {FaHeart} from "react-icons/fa";
import {IoMdAdd} from "react-icons/io";
import {GoLocation} from "react-icons/go";
import {IoMdShareAlt} from "react-icons/io";
import {RiInformationFill} from "react-icons/ri";
import {motion, AnimatePresence} from "framer-motion";

import {photoURL, key, unsplash} from "../../utils/utils";

export default function Imagemodal({id, setImageId}) {
  const [imageInfo, setImageInfo] = useState({});

  useEffect(() => {
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

  const containerAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const modalAnimation = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      {id.length > 0 && imageInfo.id && (
        <motion.div
          className="modal"
          onClick={closeModal}
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.section className="modal__content" variants={modalAnimation}>
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
                {/* 1.if there is city or country display location icon
                    2.if there is city and country add comma between them
                    3.if there is only city or only country dont add coma
                */}
                {(imageInfo.location.city || imageInfo.location.country) && (
                  <Fragment>
                    <GoLocation className="modal__footer-location-icon" />

                    {imageInfo.location.city && imageInfo.location.country
                      ? imageInfo.location.city + ", " + imageInfo.location.country
                      : imageInfo.location.city || imageInfo.location.country}
                  </Fragment>
                )}
              </div>
              <div className="modal__footer-options">
                <div className="moda__footer-options-share">
                  <IoMdShareAlt />
                  <span>Share</span>
                </div>
                <div className="moda__footer-options-info">
                  <RiInformationFill /> <span>Info</span>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
