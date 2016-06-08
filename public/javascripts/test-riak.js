var riak = require('simpleriak').createClient({ host: 'localhost', port: 8098, bucket: 'test' });

riak.getBuckets(function (err, reply) {
    console.log(reply.data);
});

riak.getKeys({ bucket: 'test1' }, function (err, reply) {
    console.log(reply.data);
});
riak.get({ key: 'test' }, function (err, reply) {
    console.log(reply.data); // returns { example: 'object' } 
});