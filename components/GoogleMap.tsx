"use client";

import React from "react";

const MapEmbed = () => {
  return (
    <div className="w-full h-[450px] md:h-[600px] my-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9798999999997!2d80.2345678!3d13.0412345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526766dfd86fb3%3A0x9dcda003383a79dc!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height="90%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-md"
      ></iframe>
    </div>
  );
};

export default MapEmbed;