const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const xml2js = require('xml2js');


router.get("/podcast", async (req, res) => {
    let result = await fetch("https://itunes.apple.com/search?term=tech&media=podcast");
    let data = await result.json();

    let store = [];

    // return res.json(data)
    if (data) {
        data.results.forEach(async (list, i) => {
            let { trackId, trackName, artworkUrl100, primaryGenreName, artworkUrl600, genres, feedUrl } = list;
            let podcastObj = {
                id: trackId,
                name: trackName,
                smImg: artworkUrl100,
                genreName: primaryGenreName,
                bgImg: artworkUrl600,
                genres,
            }

            // make request

            // let fetchRes;

            // let request = await fetch(feedUrl);
            // let xml = await request.text();

            // xml2js.parseString(xml, (err, result) => {
            //     if (err) {
            //         throw err;
            //     }

            //     fetchRes = JSON.stringify(result)
            //     podcastObj["audio"] = result["rss"]["channel"][0]["item"][0]["enclosure"][0]["$"].url
            // });
            store.push(podcastObj);
            return res.json(store)
        })

    }
})

module.exports = router