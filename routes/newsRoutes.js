const express = require('express');
const router = express.Router();
const axios = require('axios');
const Parser = require('rss-parser');
const rssParser = new Parser();

const newsDataIO_Key = process.env.NEWSDATA_KEY;
const gNewsIO_Key = process.env.GNEWS_KEY;

const handleMultipleSources = async (sources, extractor, res) => {
    const results = await Promise.allSettled(sources);

    if (results.every(r => r.status === 'rejected')) {
        return res.status(500).json({
            status: 'error',
            message: 'All news sources are unavailable'
        });
    }

    const data = extractor(results);

    return res.status(200).json({
        status: 'success',
        ...data
    });
};

//1. Home
router.get('/home', async (req, res) => {
    try {
        await handleMultipleSources(
            [
                axios.get(`https://newsdata.io/api/1/latest?apikey=${newsDataIO_Key}&country=pk&language=en&removeduplicate=1`),
                axios.get(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=pk&apikey=${gNewsIO_Key}`),
                rssParser.parseURL('https://www.thenews.com.pk/rss/1/1'),
                rssParser.parseURL('https://www.dawn.com/feeds/home')
            ],
            r => ({
                newsDataArticles: r[0].status === 'fulfilled' ? r[0].value.data?.results || [] : [],
                gNewsArticles: r[1].status === 'fulfilled' ? r[1].value.data?.articles || [] : [],
                theNewsFeed: r[2].status === 'fulfilled' ? r[2].value.items || [] : [],
                dawnFeed: r[3].status === 'fulfilled' ? r[3].value.items || [] : []
            }),
            res
        );
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});


//2. Breaking
router.get('/breaking', async (req, res) => {
    try {
        await handleMultipleSources(
            [
                axios.get(`https://newsdata.io/api/1/latest?apikey=${newsDataIO_Key}&country=pk&language=en&category=breaking&removeduplicate=1`),
                axios.get(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=pk&apikey=${gNewsIO_Key}`),
                rssParser.parseURL('https://www.thenews.com.pk/rss/1/2'),
                rssParser.parseURL('https://www.dawn.com/feeds/latest-news')
            ],
            r => ({
                newsDataArticles: r[0].status === 'fulfilled' ? r[0].value.data?.results || [] : [],
                gNewsArticles: r[1].status === 'fulfilled' ? r[1].value.data?.articles || [] : [], 
                theNewsFeed: r[2].status === 'fulfilled' ? r[2].value.items || [] : [],
                dawnFeed: r[3].status === 'fulfilled' ? r[3].value.items || [] : []
            }),
            res
        );
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});


//3. Business
router.get('/business', async (req, res) => {
    try {
        await handleMultipleSources(
            [
                axios.get(`https://newsdata.io/api/1/latest?apikey=${newsDataIO_Key}&country=pk&language=en&category=business&removeduplicate=1`),
                axios.get(`https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=pk&apikey=${gNewsIO_Key}`),
                rssParser.parseURL('https://www.thenews.com.pk/rss/1/3'),
                rssParser.parseURL('https://www.dawn.com/feeds/business')
            ],
            r => ({
                newsDataArticles: r[0].status === 'fulfilled' ? r[0].value.data?.results || [] : [],
                gNewsArticles: r[1].status === 'fulfilled' ? r[1].value.data?.articles || [] : [],
                theNewsFeed: r[2].status === 'fulfilled' ? r[2].value.items || [] : [],
                dawnFeed: r[3].status === 'fulfilled' ? r[3].value.items || [] : []
            }),
            res
        );
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});


//4. World
router.get('/world', async (req, res) => {
    try {
        await handleMultipleSources(
            [
                axios.get(`https://newsdata.io/api/1/latest?apikey=${newsDataIO_Key}&country=pk&language=en&category=world&removeduplicate=1`),
                axios.get(`https://gnews.io/api/v4/top-headlines?category=world&lang=en&country=pk&apikey=${gNewsIO_Key}`),
                rssParser.parseURL('https://www.thenews.com.pk/rss/1/10'),
                rssParser.parseURL('https://www.dawn.com/feeds/world')
            ],
            r => ({
                newsDataArticles: r[0].status === 'fulfilled' ? r[0].value.data?.results || [] : [],
                gNewsArticles: r[1].status === 'fulfilled' ? r[1].value.data?.articles || [] : [],
                theNewsFeed: r[2].status === 'fulfilled' ? r[2].value.items || [] : [],
                dawnFeed: r[3].status === 'fulfilled' ? r[3].value.items || [] : []
            }),
            res
        );
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});


//5. Politics
router.get('/politics', async (req, res) => {
    try {
        await handleMultipleSources(
            [
                axios.get(`https://newsdata.io/api/1/latest?apikey=${newsDataIO_Key}&country=pk&language=en&category=politics&removeduplicate=1`),
                axios.get(`https://gnews.io/api/v4/top-headlines?category=health&lang=en&country=pk&apikey=${gNewsIO_Key}`),
                rssParser.parseURL('https://www.thenews.com.pk/rss/1/9'),
                rssParser.parseURL('https://www.express.pk/feed')
            ],
            r => ({
                newsDataArticles: r[0].status === 'fulfilled' ? r[0].value.data?.results || [] : [],
                gNewsArticles: r[1].status === 'fulfilled' ? r[1].value.data?.articles || [] : [],
                theNewsFeed: r[2].status === 'fulfilled' ? r[2].value.items || [] : [],
                dawnFeed: r[3].status === 'fulfilled' ? r[3].value.items || [] : []
            }),
            res
        );
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});


//6. Sports
router.get('/sports', async (req, res) => {
    try {
        await handleMultipleSources(
            [
                axios.get(`https://newsdata.io/api/1/latest?apikey=${newsDataIO_Key}&country=pk&language=en&category=sports&removeduplicate=1`),
                axios.get(`https://gnews.io/api/v4/top-headlines?category=sports&lang=en&country=pk&apikey=${gNewsIO_Key}`),
                rssParser.parseURL('https://www.thenews.com.pk/rss/1/4'),
                rssParser.parseURL('https://www.dawn.com/feeds/sport')
            ],
            r => ({
                newsDataArticles: r[0].status === 'fulfilled' ? r[0].value.data?.results || [] : [],
                gNewsArticles: r[1].status === 'fulfilled' ? r[1].value.data?.articles || [] : [],
                theNewsFeed: r[2].status === 'fulfilled' ? r[2].value.items || [] : [],
                dawnFeed: r[3].status === 'fulfilled' ? r[3].value.items || [] : []
            }),
            res
        );
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});


//7. Health
router.get('/health', async (req, res) => {
    try {
        await handleMultipleSources(
            [
                axios.get(`https://newsdata.io/api/1/latest?apikey=${newsDataIO_Key}&country=pk&category=health&language=en&removeduplicate=1`),
                axios.get(`https://gnews.io/api/v4/top-headlines?category=health&lang=en&country=pk&apikey=${gNewsIO_Key}`),
                rssParser.parseURL('https://www.thenews.com.pk/rss/1/11'),
                rssParser.parseURL('https://www.medicalnewstoday.com/rss')
            ],
            r => ({
                newsDataArticles: r[0].status === 'fulfilled' ? r[0].value.data?.results || [] : [],
                gNewsArticles: r[1].status === 'fulfilled' ? r[1].value.data?.articles || [] : [],
                theNewsFeed: r[2].status === 'fulfilled' ? r[2].value.items || [] : [],
                dawnFeed: r[3].status === 'fulfilled' ? r[3].value.items || [] : []
            }),
            res
        );
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});


//8. Technology
router.get('/technology', async (req, res) => {
    try {
        await handleMultipleSources(
            [
                axios.get(`https://newsdata.io/api/1/latest?apikey=${newsDataIO_Key}&country=pk&language=en&category=technology&removeduplicate=1`),
                axios.get(`https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=pk&apikey=${gNewsIO_Key}`),
                rssParser.parseURL('https://www.thenews.com.pk/rss/1/8'),
                rssParser.parseURL('https://pakistantechnews.com/feed/')
            ],
            r => ({
                newsDataArticles: r[0].status === 'fulfilled' ? r[0].value.data?.results || [] : [],
                gNewsArticles: r[1].status === 'fulfilled' ? r[1].value.data?.articles || [] : [],
                theNewsFeed: r[2].status === 'fulfilled' ? r[2].value.items || [] : [],
                dawnFeed: r[3].status === 'fulfilled' ? r[3].value.items || [] : []
            }),
            res
        );
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});


module.exports = router;