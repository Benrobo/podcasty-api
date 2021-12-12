const express = require("express");
const router = express.Router();
const fetch = require("node-fetch")
const xml2js = require('xml2js');


router.get("/podcast", async (req, res) => {
    let result = await fetch("https://itunes.apple.com/search?term=tech&media=podcast");
    let data = await result.json();

    let store = [];

    data.results.forEach(async (list) => {
        let { trackId, trackName, artworkUrl100, primaryGenreName, artworkUrl600, genres, feedUrl } = list;
        let podcastObj = {
            id: trackId,
            name: trackName,
            smImg: artworkUrl100,
            genreName: primaryGenreName,
            bgImg: artworkUrl600,
            genres,
            feedUrl
        }


        store.push(podcastObj)
    })

    return res.json(store)
})

router.post("/podcastAudio", async (req, res) => {
    let { url } = req.body;

    try {
        let request = await fetch(url);
        let xml = await request.text();

        if (xml) {
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    throw err;
                }

                return res.json({ audio: result["rss"]["channel"][0]["item"][0]["enclosure"][0]["$"].url })
            });
        }
        else {
            return res.status(500).json({ msg: "Something went wrong" })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Something went wrong" })
    }
})

module.exports = router