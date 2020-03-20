const axios = require('axios');
const tortest = require('tor-test');

ipinfo = {}

// callback response: data (object), errors (boolean)
ipinfo.lookup = (ip, cb, key = null) => {
    data = {
        api_key = (key === null ? null : key),
        ipapi_err = null,
        torcheck_err = null
    };

    axios
        .get(`https://ipapi.co/` + ip + `/json/` (key === null ? null: `?key=` + data.api_key))
        .then(response => {
            data = response.data;
        })
        .catch(err => {
            console.log(err);
            data.ipapi_err = err;
        });

    tortest
        .isTor(ip, (err, tor) => {
            if(err != null){
                console.log(err);
                data.torcheck_err = err;
            }else{
                data.Tor = tor;
            }
        });


    cb(data, (data.ipapi_err == null && data.torcheck_err == null ? false : true));
};

module.exports = ipinfo;