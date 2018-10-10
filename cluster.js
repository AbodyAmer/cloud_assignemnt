const cluster = require('cluster')
const cpuNum = require('os').cpus().length

if(cluster.isMaster){
    for(let i=0; i<cpuNum; i++){
        cluster.fork()
    }

    cluster.on('exit', () => {
        cluster.fork()
    })
}

else {
    require('./index')
}