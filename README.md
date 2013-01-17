file-splitter
=============

Script to split large files into multiple smaller files

#Installation
<code>$ npm install file-splitter</code>

#Usage
Run <code>$ node file-splitter.js [-l] [size] [file] [target]</code>

  [-l]  Specifies that the file should be split by number of lines
  [size]  Size of each file in MB or if [-l] then the number of lines per file
  [file]    The path to the file you want to split
  [target]    Optional. Target dir for new files. defaults to the dir of [file]

