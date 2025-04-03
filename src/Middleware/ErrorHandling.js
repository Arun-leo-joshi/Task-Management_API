
const ErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({error:"Something Went Wrong!"});
};
export default ErrorHandler;