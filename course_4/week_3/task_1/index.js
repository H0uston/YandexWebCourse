/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    var errs=null;
    var times=[];
    var arrOperat=[];
    function operat(func,index) {
        return new Promise(function (resolve, reject) {
            func(function (err, time) {
                if (err == null) {
                    times[index] = time;
                    resolve();
                } else {
                    if (!errs) {
                        errs = err;
                    }
                    reject();
                }
            });
        })
    }
    for(let i=0;i<operations.length;i++){
        arrOperat[i]=operat(operations[i],i);
    }

    Promise.all(arrOperat).then(
        () => {
            callback(errs, times);
        },
        () => {
            callback(errs);
            });
};
