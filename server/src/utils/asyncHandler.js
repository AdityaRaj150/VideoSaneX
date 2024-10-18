// export const asyncHandler = (fnc) => async(req,res,next) => {
//     try {
//         await fnc(res,req,next)
//     }
//     catch(error){
//         console.log("err "+err)
//         next(error)
//     }
// } 


export const asyncHandler = (fnc) => (req,res,next) => {
    Promise.resolve(fnc(req,res,next)).catch(err => {
        console.log("err "+ JSON.stringify(err))
        next(err)
    })
}
