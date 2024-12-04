const router = require("express").Router()
const {createClient} = require('@supabase/supabase-js')
const bcrypt = require('bcrypt')
require('dotenv').config()

const supabase = createClient(process.env.DATABASE_URL, process.env.DATABASE_KEY )

router.get('/data', async (req, res) =>{
    try {
        const {data} = await supabase.from ('tugas').select('*')
        console.log(data)
        return res.send(data)
    } catch (error) {
        return res.send(error)
    }
})

router.post('/create', async (req,res)=>{
    const {Nama, Date}= req.body

    const{error} = await supabase.from('tugas').insert ({Nama,Date}) 
    if (error){
        return res.send('error')
    }
     return res.send("Terkirim")
})

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params

    try {
        const {error} = await supabase.from('tugas').delete().eq('id',id);

        if (error) {
            console.error('tidak berhasil:', error);
        
        }
    
        res.json({ message: 'berhasil',});
    } catch (err) {
        res.json({ error: 'Unexpected server error' });
    }
});



module.exports = router