const chai = require('chai')
const expect = chai.expect 
const { chaiHTTP } = require('chai-HTTP')
const { joi } = require('joi')
const express = require('express');
const app = express();

app.get('https://reqres.in/api/users/2', (req,res) =>{
})
