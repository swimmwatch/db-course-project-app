export default (err, req, res) => {
    const { status } = err;

    res.status(status).json(err);
}