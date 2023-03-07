const { Router } = require('express');
const { getAllCategoires } = require('../controllers/categories_controller');
const router = Router();



router.get('/', (req, res)=>{
    res.send('ruta de las categorias')
})

router.get('/getAllCategories', getAllCategoires)


    


module.exports = router