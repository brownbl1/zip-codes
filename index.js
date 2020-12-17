require('isomorphic-fetch')
const cheerio = require('cheerio')

const base = 'https://www.getzips.com/cgi-bin/ziplook.exe?Zip='

const [n, p, ...zips] = process.argv

const getCounty = async (zip) => {
  const res = await fetch(base + zip)
  const html = await res.text()

  const $ = cheerio.load(html)
  const data = $('tr td p')

  const city = $(data[5]).text()
  const countyName = $(data[6]).text()

  console.log(`${zip}: ${countyName} (${city})`)
}

zips.map(getCounty)
