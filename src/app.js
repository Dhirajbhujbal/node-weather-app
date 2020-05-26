const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const getGeoCodeObj = require('./util/geocode');
const foreCastObj = require('./util/forcast');
// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars serach engine and view locations.
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, response) => {
    response.render('index', {
        title: 'Weather Application',
        name: 'Dhiraj Bhujbal'
    });
})

app.get('/about', (req, response) => {
    response.render('about', {
        title: 'About Me',
        name: 'Dhiraj Bhujbal'
    })
})

app.get('/help', (req, response) => {
    response.render('help', {
        title: 'Help & Center',
        name: 'Dhiraj Bhujbal',
        helpMsg: 'Please visit weather stack for more information.'
    })
})


app.get('/weather', (req, response) => {
    if(!req.query.address) {
        return response.send({
            error: 'You must provide the address.'
        })
    }

    getGeoCodeObj.getGecodeData(req.query.address, (error, res = {}) => {
        if(error) {
            return response.send({
                error
            })
        } 
        foreCastObj.getForCastData(res.lagLng, (err, data) => {
            if(err) {
                return response.send({
                    err
                })
            }
            response.send({
                foreCastData: data,
                locationName: res.place_name,
                address: req.query.address
            })
        } )
        
    })
})

app.get('/product', (req, response) => {

    if(!req.query.search) {
        return response.send({
            error: 'You Must provide a search key!'
        })
    }

    response.send({
        products : ['Bat', 'Stumps', 'Helmet']
    })

})

app.get('/help/*', (req, response) => {
    response.render('404', {
        title: '404!',
        errormsg: 'Help article not found'
    })
})

app.get('*', (req, response) => {
    response.render('404', {
        title: '404!',
        errormsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is started and listning on port 3000');
});



// app.get('', (req, response) => {
//     response.send('Dhiraj');
// })

// app.get('/help', (req, response) => {
//     response.send({
//         name:'Dhiraj',
//         age: 27
//     });
// })

// app.get('/about', (req, response) => {
//     response.send('<title>Welcome to About!</title>');
// })