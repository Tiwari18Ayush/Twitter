const express=require('express');
const app=express();
const mongoose=require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/Twitter";

app.listen(4000,()=>{
    console.log("Server started");
    mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected to Twitter DB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
})