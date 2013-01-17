file-splitter
=============

Script to split large files into multiple smaller files

##Installation
<code>$ npm install file-splitter</code>

##Usage
Run <code>$ node file-splitter.js [-l] [size] [file] [target]</code>
<pre><code>[-l]        Specifies that the file should be split by number of lines
[size]      Size of each file in MB or if [-l] then the number of lines per file
[file]      The path to the file you want to split
[target]    Optional. Target dir for new files. defaults to the dir of [file]
</code></pre>

##License
(The MIT License)

Copyright (c) 2012 Oliver Cox <oliver@schmine.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
