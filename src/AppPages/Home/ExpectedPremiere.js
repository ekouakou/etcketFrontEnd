import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';


import {
  faEllipsisV,
  faShareAlt,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faFacebook,
  faTelegram,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventCarousel = ({ data, ImagelBaseUrl,fullUrl, searchTerm }) => {
  const windowWidth = window.innerWidth;
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);



  const getCarouselType = (length, width) => {
    if (length > 4) return 'loop';
    if (width < 576) return 'loop';
    return 'slide';
  };

  const getPerPage = (length, width) => {
    if (width >= 1200) return 3;
    if (width >= 992) return 2;
    if (width >= 768) return 2;
    if (width >= 576) return 2;
    if (width <= 376) return 2;
    return 2;
  };

  const getImageName = (imagePath) => {
    const parts = imagePath.split('/');
    return parts[parts.length - 1];
  };

  const toggleModal = (event = null) => {

    setSelectedEvent(event);
    setShowModal(!showModal);
  };

  const handleClick = (event) => {
    const { LG_EVEID, STR_EVESTATUTFREE } = event;
    localStorage.setItem('LG_EVEID', LG_EVEID);
    localStorage.setItem('STR_EVESTATUTFREE', STR_EVESTATUTFREE);
  };

  // Group events by STR_LSTDESCRIPTION and then by LG_LSTID
  const groupedEvents = data.reduce((acc, category) => {
    const lstDescription = category.STR_LSTDESCRIPTION;

    if (!acc[lstDescription]) {
      acc[lstDescription] = {};
    }

    category.evenements.forEach(event => {
      const lgLstId = event.LG_LSTID;

      if (!acc[lstDescription][lgLstId]) {
        acc[lstDescription][lgLstId] = [];
      }

      acc[lstDescription][lgLstId].push(event);
    });

    return acc;
  }, {});

  // Filter events based on search term
  const filteredGroupedEvents = Object.entries(groupedEvents).reduce((acc, [lstDescription, lgLstGroups]) => {
    const filteredLgLstGroups = Object.entries(lgLstGroups).reduce((lgAcc, [lgLstId, events]) => {
      const filteredEvents = events.filter(event => {
        const searchTermLower = searchTerm?.toLowerCase() || '';
        const eventName = event?.STR_EVENAME?.toLowerCase() || '';
        const eventDescription = event?.STR_EVEDESCRIPTION?.toLowerCase() || '';
        const eventPlace = event?.LG_LSTPLACEID?.toLowerCase() || '';

        return (
          eventName.includes(searchTermLower) ||
          eventDescription.includes(searchTermLower) ||
          eventPlace.includes(searchTermLower)
        );
      });

      if (filteredEvents.length > 0) {
        lgAcc[lgLstId] = filteredEvents;
      }
      return lgAcc;
    }, {});

    if (Object.keys(filteredLgLstGroups).length > 0) {
      acc[lstDescription] = filteredLgLstGroups;
    }
    return acc;
  }, {});


  // 

  const generateSharingLinks = (event) => {
    if (!event) return {};

    // const eventUrl = `http://localhost:3000/#/detail-event/${event.LG_EVEID}`;
    // const eventImage = `http://localhost:3000/eticketbackend/backoffice/images/product/${event.STR_EVEPIC}`;

    // 

    const eventUrl = `${fullUrl}#/detail-event/${event.LG_EVEID}`;
    const eventImage = `${ImagelBaseUrl}${event.STR_EVEPIC}`;

    const eventTitle = event.STR_EVENAME;
    const eventDescription = event.STR_EVEDESCRIPTION;
    const sharedText = `${eventTitle}\n\n${eventDescription}\n\n🔗 Détails : ${eventUrl}`;

    return {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(sharedText)}\n\n ${eventImage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(sharedText)}`,
        instagram: `https://www.instagram.com/create/select/?caption=${encodeURIComponent(`${sharedText}\n\n ${eventImage}`)}`,
    };
};



  return (
    <section className="section section--border">
      <div className="container">
        {Object.entries(filteredGroupedEvents).map(([lstDescription, lgLstGroups]) => (
          <div key={lstDescription}>
            <div className="row">
              <div className="col-12">
                <div className="section__title-wrap">
                  <h2 className="section__title fs-4 text-theme">{lstDescription}</h2>
                </div>
                <hr className='border-dashed my-3' />
              </div>

              {Object.entries(lgLstGroups).map(([lgLstId, events]) => (
                <div key={lgLstId} className="col-12 mb-4">
                  <div className="section__title-wrap">
                    <h3 className="section__title fs-5 text-muted">{lgLstId}</h3>
                  </div>
                  <hr className='border-dashed my-2' />
                  <div className="col-12">
                    <Splide
                      options={{
                        type: getCarouselType(events.length, windowWidth),
                        perPage: getPerPage(events.length, windowWidth),
                        perMove: 1,
                        arrows: true,
                        pagination: false,
                        drag: true,
                        rewind: false,
                        gap: '24px',
                        autoplay: true,
                        interval: 7000,
                        pauseOnHover: true,
                      }}
                    >
                      {events.map((event) => (
                        <SplideSlide key={event.LG_EVEID}>
                          <div className="item item--carousel">
                            <Link className="w-100 px-1" to="/detail-event" onClick={() => handleClick(event)}>
                              <div className="item__cover">
                                <img
                                  src={
                                    getImageName(event.STR_EVEPIC) === ''
                                      ? 'assets/img/bg/slide__bg-2.jpg'
                                      : ImagelBaseUrl + event.STR_EVEPIC
                                  }
                                  alt={event.STR_EVENAME}
                                />
                                <span className="item__rate">
                                  <div className="event-date">
                                    <span className={`badge ${event.STR_EVESTATUTFREE === "1" ? 'badge-danger' : 'badge-success'}`}>
                                      {event.STR_EVESTATUTFREE === "1" ? 'Payant' : 'Gratuit'}
                                    </span>
                                  </div>
                                </span>
                              </div>
                            </Link>
                            <div className="item__content">
                              <div className="movie-content pb-2">
                                <h5 className="item__title text-theme d-flex">
                                  <Link className='w-100 px-1 text-theme' to="/detail-event" onClick={() => handleClick(event)}>
                                    {event.STR_EVENAME}
                                  </Link>
                                  <FontAwesomeIcon
                                    icon={faEllipsisV}
                                    className="text-muted pull-right p-2 share-evente-icone"
                                    onClick={(e) => {
                                      toggleModal(event);
                                      handleClick(event);
                                    }}
                                  />
                                </h5>
                                <Link className='text-theme' to="/detail-event" onClick={() => handleClick(event)}>
                                  <div className="social-and-duration mt-1 px-3">
                                    <div className="duration-area row">
                                      <div className="col-lg-12 fs-12 lh-2 lieu-event">
                                        <span className='text-bold'>{event.LG_LSTPLACEID}</span>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>

                              <Modal show={showModal} onHide={() => toggleModal()} centered>
                                <Modal.Header closeButton>
                                  <Modal.Title>Partager l'événement</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  {selectedEvent && (
                                    <div className="text-center h-50">
                                      <div class="item__cover">
                                      <img className='img-fluid' src={
                                          getImageName(selectedEvent.STR_EVEPIC) === ''
                                            ? 'assets/img/bg/slide__bg-2.jpg'
                                            : ImagelBaseUrl + selectedEvent.STR_EVEPIC
                                        }
                                        alt={selectedEvent.STR_EVENAME}
                                      />
                                      </div>
                                      
                                      <h5>{selectedEvent.STR_EVENAME}</h5>
                                      <p>{selectedEvent.STR_EVEDESCRIPTION}</p>

                                      <div className="social-share-icons d-flex justify-content-center gap-4 mt-4">

                                        {Object.entries(generateSharingLinks(selectedEvent)).map(([platform, link]) => (
                                          <a
                                            key={platform}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-decoration-none"
                                          >
                                            <FontAwesomeIcon
                                              icon={
                                                platform === 'whatsapp' ? faWhatsapp :
                                                  platform === 'facebook' ? faFacebook :
                                                    platform === 'telegram' ? faTelegram :
                                                      platform === 'instagram' ? faInstagram : faShareAlt
                                              }
                                              size="2x"
                                              className={`text-${platform}`}
                                            />
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={() => toggleModal()}>
                                    Fermer
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventCarousel;