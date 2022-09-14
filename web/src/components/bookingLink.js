import React, { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";

const BookingLink = ({ url, className }) => {
  if (!url) return null;

  const [isOpen, setIsOpen] = useState(false);
  const handleUrl = () => {
    if (url.includes("calendly")) {
      setIsOpen(true);
    } else {
      window.open(url, "_blank");
    }
  };

  const [rootElement, setRootElement] = useState(null);
  useEffect(() => {
    setRootElement(document.getElementById("portal"));
  }, []);

  return (
    <>
      <button type="button" className={className} onClick={() => handleUrl()}>
        Book
      </button>
      <PopupModal
        url={url}
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        rootElement={rootElement}
      />
    </>
  );
};

export default BookingLink;
