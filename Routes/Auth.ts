import { Router } from "express";

const router = Router()

router.post('/login', (req, res)=>{
    res.send({'hello': 'there loggers'})
})

router.post('/signup', (req, res)=>{
    res.send({'hello': 'there signers'})
})

export default router