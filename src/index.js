import * as queryString from 'query-string' 
import $ from 'jquery'
import GUI from './GUI.js'

function GetURL() {
  return queryString.parse(window.location.search).url;
}

$(() => {
  GUI.Init(); 
})
