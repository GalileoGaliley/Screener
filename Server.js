const http = require('http');
const https = require('https');
const path = require('path');
const axios = require('axios')
const cheerio = require('cheerio');
const fs = require('fs');
const hostname = 'https://prnt.sc/';
let base = 'Images';
                //    0  1  2  3  4  5  6  7  8  9  10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26   27   28   29   30   31   32   33   34   35
let numAndAlphabet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let pos0 = 1;
let pos1 = 0;
let pos2 = 0;
let pos3 = 1;
let pos4 = 28;
let pos5 = 16;

const loadImages = async (index)=>{
    axios.get(hostname + index).then((response)=>{
        const cheerioContent = cheerio.load(response.data);
        let tagImage = cheerioContent("#screenshot-image");
        let src = tagImage[0].attribs.src;
        let fileExt = path.extname(src);
        let file = fs.createWriteStream( base + '/' + index + fileExt);
        if (src != '//st.prntscr.com/2022/01/07/0148/img/0_173a7b_211be8ff.png'){
            if (src[4] == 's'){
                 https.get(src, function(response) {
                    response.pipe(file);
                });
            }else if(src[4] == ':'){
                http.get(src, function(response) {
                    response.pipe(file);
                });
             }
        }else {
            console.log('no')
        }
        photoIndex()
    })
}
const increment = ()=>{
    if (pos5 == numAndAlphabet.length - 1){
        pos5 = 0;
        pos4++;
        if (pos4 == numAndAlphabet.length){
            pos4 = 0;
            pos3++;
            if (pos3 == numAndAlphabet.length){
                pos3 = 0;
                pos2++;
                if (pos2 == numAndAlphabet.length){
                    pos2 = 0;
                    pos1++;
                    if (pos1 == numAndAlphabet.length){
                        pos1 = 0;
                        pos0++;
                    }
                }
            }
        }
    }else{
        pos5++;
    }
}
const photoIndex = async ()=>{
    let i = '' + numAndAlphabet[pos0] + numAndAlphabet[pos1] + numAndAlphabet[pos2] + numAndAlphabet[pos3] + numAndAlphabet[pos4] + numAndAlphabet[pos5] + '';
    increment()
    await loadImages(i)
}
loadImages('1001sg')