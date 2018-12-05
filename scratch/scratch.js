function doLoad(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("someAsyncFunction: ", n)
            resolve(n)
        }, Math.random() * 1500)
    })
}

let promises = [];
promises.push()

