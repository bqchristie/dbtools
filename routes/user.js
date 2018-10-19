let router = express.Router();


router.get('/api/user',function(req, res){
    res.json({ message: 'User get!' });
})