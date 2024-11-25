    
const indexController = {}

indexController.index = async (req, res, next) => {
    try {
        res.json({
            success: true,
            'message': 'express boot api index'
        })
    } catch (e) {
        next(e);
    }
}




module.exports = indexController;