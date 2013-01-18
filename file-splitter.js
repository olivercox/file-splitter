var fs = require('fs'),
    util = require('util'),
    path = require('path');

var 
    buffer          = "";
    lineEnding      = "\n",
    lineCounter     = 0,
    segmentCounter  = 0,
    filepath        = "",
    filesize        = 0,
    targetfolder    = "",
    newFilename     = "",
    switches        = [],
    options         = [];

//Check for the correct number arguments
if (!process.argv || process.argv.length == 2)
{
    console.log("No arguments: See --help for details");
    process.exit(2);
}
else if (process.argv.length > 5)
{
    console.log("Too many arguments: See --help for details");
    process.exit(3);
}
else {
    //When executing this in node process.argv contains node [filename] so we will remove them
    var args = process.argv;
    args.splice(0,2);
    //Display help text if --help argument is present
    if(args.indexOf('--help') !== -1) {
        displayHelp();
        process.exit(1);
    }
    else {
        console.log(args);
        //Seperate switches from options
        for(var arg in args) {
            if(args[arg].indexOf('-') == 0) switches.push(args[arg]);
            else options.push(args[arg]);
        }
        console.log(switches.join(', '));
        console.log(options.join(', '));
        if(!isNaN(parseFloat(options[0])) && isFinite(options[0])) filesize = options[0];
        filepath = options[1];
        targetfolder = options.length == 3 ? options[2] : "";
        
        if (filesize == 0)
        {
            console.log("Invalid [size] argument: See --help for details");
            return;
        }
        if (filepath === "")
        {
            console.log("Invalid [file] argument: See --help for details");
            return;
        }
        if (!fs.existsSync(filepath))
        {
            console.log(util.format("Invalid [file] argument: %s does not exist", filepath));
            return;
        }
        if (targetfolder === "")
        {
            targetfolder = path.dirname(filepath);
        }
        if(switches.indexOf("-l") !== -1) {
            console.log(util.format("Splitting %s into %d line files in %s", path.basename(filepath), filesize, targetfolder));
            splitFileByLines(function(err, filesCreated) {
                if(err) console.log('An error was encountered:\n' + err + '\n');
                else console.log('File split into ' + segmentCounter + ' segments');
                
                process.exit(1);
            });
        }
        else {
            console.log(util.format("Splitting %s into %dMB files in %s", Path.basename(filepath), filesize, targetfolder));
            //SplitFileByMB(filepath, targetfolder, filesize*1048576);
        }
        
    }
}
//Remove any switches from the args and store in switches

//Check for the presence and validity of required aruguments

//Run the splitter
//Create readable stream
function splitFileByLines(callback) {
    fs.createReadStream(filepath, { encoding: 'utf-8' })
      .on('data', function (data) {
        //Put the data returned into the bufferedData variable
        buffer = buffer.concat(data);

        // Check to see if this chunk contains a line ending and return if not
        var endOfLineIndex = buffer.lastIndexOf(lineEnding);
        if(endOfLineIndex === -1) return;
        
        //We have at least one line so lets process it
        //We need the .split() to ensure we handle a data chunk that multple lines
        var line = buffer.substring(0, endOfLineIndex);
        var lines = line.split(lineEnding);

        //Iterate through the lines and save to the target file
        for (var i = 0; i < lines.length; i++) {
            lineCounter++;
            console.log(lineCounter);
            if(lineCounter === 1 || lineCounter>filesize) {
                var ext = path.extname(filepath);
                newFilename = path.resolve(targetfolder, ext === '' ? path.basename(filepath) : path.basename(filepath, ext));
                newFilename += util.format('_%d%s',segmentCounter++, path.extname(filepath));
            }
            console.log(newFilename);
            fs.appendFileSync(newFilename, lines[i] === '' ? '\n' : lines[i]);
        }
        
        //If the data chunk includes data after the last line ending we need to save it in the buffer
        if(buffer.length > endOfLineIndex) buffer = buffer.substring(endOfLineIndex+1, buffer.length);
        else buffer = "";
        
        return;
      })
      .on('end', function () {
        //If the buffer contains a line without line edning write that to file
        var ext = path.extname(filepath);
                newFilename = path.resolve(targetfolder, ext === '' ? path.basename(filepath) : path.basename(filepath, ext));
                newFilename += util.format('_%d%s',segmentCounter++, path.extname(filepath));
        fs.appendFileSync(newFilename, buffer);
        
        //Return the number of files created
        callback(null, segmentCounter);
      }).
      on('error', function(err) {
        callback(err, segmentCounter);
      });
  }
  
  function displayHelp() {
    console.log("SplitLarge [-l] [size] [file] [target]");
    console.log("");
    console.log("[-l]           Specifies that the file should be split by number of lines");
    console.log("[size]         Size in MB of files or if [-l] then the number of lines per file");
    console.log("[file]         The path to the file you want to split");
    console.log("[target]       Optional. Target dir for new files. defaults to [file] dir");
    console.log("");
  }