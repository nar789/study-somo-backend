


const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
    cors : {
        origin : "*",
        credential : true
    }
});


//only for test
const list = [];

for(var i=0; i < 30; i++) {
    let data = {
        branch : 'develop',
        commit : i + 'a1b1c1',
        power : i + 0.1,
        startTime : '6/1 13:00',
        endTime : '6/1 13:10'
    };
    list.push(data);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

io.on('connection', async socket => {
    //request commit id
    socket.emit('commit', {
        id : '29a1b1c1' 
    });
    
    
    console.log('load')
    socket.emit('load', {
        list : list
    });
    await sleep(5000);//5 sec.

    //detect new commit id.
    socket.emit('commit', {
        id : '30a1b1c1'
    });

    console.log('step 1');
    socket.emit('step', {
        step : 1
    });
    socket.emit('log', {
        log : '1. pull is working...'
    });
    await sleep(5000);


    console.log('step 2');
    socket.emit('step', {
        step : 2
    });
    socket.emit('log', {
        log : '2. build is working...'
    });
    await sleep(5000);



    console.log('step 3');
    socket.emit('step', {
        step : 3
    });
    socket.emit('log', {
        log : '3. install is working...'
    });
    await sleep(5000);



    console.log('step 4');
    socket.emit('step', {
        step : 4
    });
    socket.emit('log', {
        log : '4. RPM is working...'
    });
    await sleep(5000);


    console.log('step 0');
    socket.emit('step', {
        step : 0
    });
    socket.emit('log', {
        log : 'close'
    });
    socket.emit('appendItem', {
        item : {
            branch : 'develop',
            commit : '30a1b1c1',
            power : 7.1,
            startTime : '6/1 13:00',
            endTime : '6/1 13:10'
        }
    });
    await sleep(5000);
});


server.listen(4000, () => {
    console.log('backend server is listening on port 4000');
});

