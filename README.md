boilerplate for getting into threejs

uses backbone + require. write views using the /js/template/view-template.js definition and load them up in /js/start.js

loader expects files to be served over http, not using local file:/// 

on OS X or *nix, python's simpel server is a great option. use:

python -m SimpleHTTPServer 

to serve @ localhost:8000

http://www.twitter.com/theLucre

When it's up and running you'll see a cube primitive rendered with custom vertex and fragment shaders 

![](http://i.imgur.com/Zo5y6sI.gif)
