const axios = require('axios');
const tortest = require('tor-test');

ipinfo = {}

// callback response: data (object), errors (boolean)
ipinfo.lookup = (ip, cb, key = null) => {
    data = {
        error_ipapi: null,
        error_tor: null
    };

    axios
        .get(`https://ipapi.co/` + ip + `/json/` (key === null ? '': `?key=` + key))
        .then(response => {
            data = response.data;
        })
        .catch(err => {
            console.log(err);
            data.error_ipapi = err;
        });

    tortest
        .isTor(ip, (err, tor) => {
            if(err != null){
                console.log(err);
                data.error_tor = err;
            }else{
                data.Tor = tor;
            }
        });


    cb(data, ((data.error_ipapi === null && data.error_tor === null) ? false : true));
};

module.exports = ipinfo;