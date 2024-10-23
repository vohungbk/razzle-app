import App from "./App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? (assets[entrypoint].css ? assets[entrypoint].css.map((asset) => `<link rel="stylesheet" href="${asset}">`).join("") : "") : "";
};

const jsScriptTagsFromAssets = (assets, entrypoint, ...extra) => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js.map((asset) => `<script src="${asset}" ${extra.join(" ")}></script>`).join("")
      : ""
    : "";
};

export const renderApp = (req, res) => {
  const context = {};
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );
  const html = `<!doctype html>
  <html lang="">
  <head>
       <title>My E-Commerce Store | Home</title>
        <meta name="description" content="Discover the latest products in our store. Shop now for exclusive deals." />
        <meta name="keywords" content="ecommerce, store, buy, online shopping, products" />
        <link rel="canonical" href="https://myecommercestore.com/" />

        <meta property="og:title" content="My E-Commerce Store" />
        <meta property="og:description" content="Best online store for quality products at amazing prices!" />
        <meta property="og:url" content="https://myecommercestore.com/" />
        <meta property="og:image" content="https://plus.unsplash.com/premium_photo-1726611746549-0a0dad02cb17?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" />
        
        <meta name="twitter:title" content="My E-Commerce Store" />
        <meta name="twitter:description" content="Best online store for quality products at amazing prices!" />
        <meta name="twitter:image" content="https://plus.unsplash.com/premium_photo-1726611746549-0a0dad02cb17?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" />
        <meta name="twitter:card" content="summary_large_image" />
      ${cssLinksFromAssets(assets, "client")}
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, "client", "defer", "crossorigin")}
  </body>
</html>`;
  return { context, html };
};

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", (req, res) => {
    const { context, html } = renderApp(req, res);
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(html);
    }
  });

export default server;
