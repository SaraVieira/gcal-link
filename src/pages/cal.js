import { useEffect } from "react";

export default props => {
  const id = props.location.pathname.split("/cal/")[1];

  useEffect(() => {
    fetch(`https://legitbackend.wtf/gcal_urls?q=short:${id}`)
      .then(d => d.json())
      .then(data => {
        if (!data || !data.length) return (window.location.href = "/");
        const newUrl = data && data[0].long;
        window.location.href = newUrl;
      })
      .catch(() => {
        window.location.href = "/";
      });
  });

  return null;
};
