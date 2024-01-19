const { stripeWebhook } = require("../services/Stripe");
const express = require("express");
const Router = require("express").Router();

Router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

module.exports = Router;
