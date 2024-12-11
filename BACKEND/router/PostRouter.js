const router = require("express").Router()
const {createClient} = require('@supabase/supabase-js')
const bcrypt = require('bcrypt')
require('dotenv').config()

const supabase = createClient(process.env.DATABASE_URL, process.env.DATABASE_KEY )


const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization

    if (!token) {
        return res.json({ error: 'Akses ditolak, token tidak tersedia' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Tambahkan informasi user dari token
        next(); 
    } catch (err) {
        return res.json({ error: 'Token tidak valid' });
    }
};

router.get('/data', verifyToken, async (req, res) => {
    try {
        const { user_id } = req.user;
        const { data, error } = await supabase.from('jadwal').select('*').eq('user_id', user_id);

        if (error) {
            return res.status.json({ error: "Gagal mengambil data" });
        }
        return res.json(data);
    } catch (error) {
        return res.json({ error: "Terjadi kesalahan server" });
    }
});





router.post('/create', verifyToken, async (req, res) => {
    const { kegiatan, tanggal , jam} = req.body;
    const { user_id } = req.user;

    const { error } = await supabase.from('jadwal').insert({ kegiatan,tanggal, jam, user_id });
    if (error) {
        return res.json({ error: "Gagal menambah tugas" });
    }
    return res.json({ message: "Tugas berhasil ditambahkan" });
});

router.put('/update/:id',  async (req, res) => {
    const { id } = req.params;
    const { kegiatan, tanggal, jam } = req.body;

    try {
        const { error } = await supabase
            .from('jadwal')
            .update({ kegiatan, tanggal, jam })
            .eq('id', id);

        if (error) {
            console.error('Gagal edit:', error);
            return res.json({ error: "Gagal memperbarui jadwal" });
        }

        res.json({ message: 'Jadwal berhasil diupdate' });
    } catch (err) {
        res.json({ error: ' error' });
    }
});


router.delete('/delete/:id',  async (req, res) => {
    const {id} = req.params

    try {
        const {error} = await supabase.from('jadwal').delete().eq('id',id);

        if (error) {
            console.error('tidak berhasil:', error);
        
        }
    
        res.json({ message: 'berhasil',});
    } catch (err) {
        res.json({ error: 'Error' });
    }
});


router.post('/register', async (req, res) => {
    const {email, username, passwords } = req.body;

    if (!email ||!username || !passwords ) {
        res.send('Tolong masukan data')
    } else {
        const password = bcrypt.hashSync (passwords, 10)
        const {data, error} = await supabase.from('user').select('*',{count: 'exact'})
        .eq("username", username)
        if (!error){
            if(data[0] && data[0] !=0){
                return res.json({error: true,message:"username terpakai"})
            }else {
                const {err} = await supabase.from('user').insert({
                    email,
                    username,
                    password
                })
                if(err){
                    console.log(err)
                }else {
                    console.log(data)
                    res.send({message : "Regsitrasi Berhasil"})

                }
            }
        }
    } 
})



router.post("/login", async (req, res) => {
    const { username, passwords } = req.body;

    const { data, error } = await supabase.from('user').select('*').eq('username', username);
    if (error) {
        return res.json({ Error: "Gagal mengakses database" });
    }
    if (data.length > 0) {
        const hash = data[0].password;

        bcrypt.compare(passwords, hash, (err, isMatch) => {
            if (err) {
                return res.json({ Error: "Error saat membandingkan password" });
            }
            if (isMatch) {
                const token = jwt.sign(
                    { user_id: data[0].user_id, username: data[0].username },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' } // Token berlaku selama 1 jam
                );
                return res.json({ Status: "Login berhasil", token });
            } else {
                return res.json({ Error: "Password salah" });
            }
        });
    } else {
        return res.json({ Error: "Username tidak ditemukan" });
    }
});


module.exports = router