function testA() {

    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log('execute a....');
            resolve('resolve A');
        }, 500);
    })
}

function testB() {

    return new Promise((resolve, reject) => {
        console.log('execute b....');
        resolve('resolve B');
    })
}


function testC() {

    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log('execute c....');
            resolve('resolve C');
        }, 5000)

    })
}

function testD() {

    return new Promise((resolve, reject) => {
        console.log('execute d....');
        resolve('resolve D');
    })
}

var promises = [];
promises.push(testA())
promises.push(testB())
promises.push(testC())
promises.push(testD())

Promise.all(promises).then(results=>{
    results.forEach(result=>console.log(result));
})

