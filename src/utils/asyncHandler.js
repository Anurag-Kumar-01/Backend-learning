const asyncHandler = (requestHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .reject((error)=> next(error))
    }
}

export {asyncHandler}



// Higher order function method

// const asyncHandler = (func) => async (req,res,next)=>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : false,
//             message : error.message
//         })
//     }
// }