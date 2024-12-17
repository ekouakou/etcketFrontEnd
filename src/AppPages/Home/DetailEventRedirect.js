import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const DetailEventRedirect = () => {
  const { id } = useParams(); // Récupère l'identifiant de l'événement depuis l'URL
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Vérifie si le paramètre fbclid est présent dans l'URL
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("fbclid")) {
      // Supprime le fbclid de l'URL
      searchParams.delete("fbclid");
      const newUrl = `${location.pathname}?${searchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }

    if (id) {
      // Stocke l'identifiant dans localStorage
      localStorage.setItem("LG_EVEID", id);

      // Redirige l'utilisateur vers la page de détail sans le paramètre id
      navigate(`/detail-event`);
    }
  }, [id, location, navigate]);

  return null; // Ce composant n'affiche rien
};

export default DetailEventRedirect;
