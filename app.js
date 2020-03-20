const req = require('axios').get;
const tortest = require('tor-test').isTor;

var key = process.env.IPAPI_KEY || null;

ipinfo = {}

data = {
    info: {
        ipapi: null,
        tortest: null
    },
    output: {},
    errors: {
        error_ipapi: null,
        error_tortest: null
    }
};

checkAPI = (addr, next) => {
    req('https://ipapi.co/' + addr + '/json/' + (key == null ? '' : '?key=' + key))
        .then( response => {
            data.output = response.data;
            next();
        })
        .catch( err => {
            console.log(err);

            data.info.ipapi = false;
            data.errors.error_ipapi = err;
            next();
    });
};

checkTor = (addr, next) => {
    tortest(addr, (err, isTor) => {
        if(err){
                data.info.tortest = false;
                data.errors.error_tortest = err;
            }

            data.output.Tor = isTor; 
            next();
    });
});

ipinfo.lookup = (addr, cb) => {
    checkAPI(addr, checkTor(addr, cb));
    cb(data);
}

module.exports = ipinfo;
