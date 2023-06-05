import moment from 'moment';
const { GoogleSpreadsheet } = require('google-spreadsheet');

require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const SHEET_ID = process.env.SHEET_ID;

let getHomepage = async (req, res) => {
    return res.render('homepage.ejs');
};

let getGoogleSheet = async (req, res) => {
    try {
        let currentDate = new Date();

        const format = 'HH:mm DD/MM/YYYY';

        let formatedDate = moment(currentDate).format(format);

        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet(SHEET_ID);

        // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        });

        await doc.loadInfo(); // loads document properties and worksheets

        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

        // append rows
        await sheet.addRow({
            'Tên Facebook': 'Lộc Phan',
            'Tên Email': 'phananhloc03102001@gmail.com',
            'Số điện thoại': `'0123456789`,
            'Thời gian': formatedDate,
            'Tên khách hàng': 'LocCuTo',
        });

        return res.send('Writing data to Google Sheet succeeds!');
    } catch (e) {
        return res.send('Oops! Something wrongs, check logs console for detail ... ');
    }
};

module.exports = {
    getHomepage: getHomepage,
    getGoogleSheet: getGoogleSheet,
};
