const asyncHandler = (requestHandler) => 
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }

export {asyncHandler};



/*
    1) This file helps you avoid repetitive try-catch blocks in every async route and ensures consistent error handling in your Express app.
 





// const asyncHandler = () =>{} 
// const asyncHandler = (func) => () => {}
// const asyncHandler = () => async () => {} 

const asyncHandler = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (err) {
        res.status(err.code || 500).json({
            success:false,
            message: err.message
        })
    }
}

*/