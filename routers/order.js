const express = require('express')
const Order = require('../models/order')
const OrderItem = require('../models/order_item')
const router = express.Router()

router.get('/', async (req, res) => {
    const OrderList = await Order.find().populate('user', 'name phone').sort({ 'dateOrdered': -1 }); // use sord for sorting the order newest first, 
    if (!OrderList) {
        res.status(500).json({ success: false, message: 'Order not found' })
    }

    res.status(200).send(OrderList)
})


router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name phone')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
            }
        })

    if (!order) {
        res.status(500).json({ success: false, message: 'Order not found' })
    }

    res.status(200).send(order)
})

router.post('/', async (req, res) => {

    const orderItemIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
    }))

    const orderItemsIdResolved = await orderItemIds 
   const totalPrices = await Promise.all(orderItemsIdResolved.map(async(orderItemId)=>{
       const orderItem = await OrderItem.findById(orderItemId).populate('product','price')
       const totalPrice = orderItem.product.price*orderItem.quantity
       return totalPrice
   }))

    const totalPrice = totalPrices.reduce((a,b)=> a+b, 0); // adding all the values present in order list

    let order = new Order({
        orderItems: orderItemsIdResolved,
        shippingAddress: req.body.shippingAddress,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,

    })

    order = await order.save();

    if (!order) {
        res.status(400).json({ success: false, message: 'Details not added' })
    }

    res.status(200).send(order)
})



router.put('/:id', async(req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
           status:req.body.status
        },
        {new:true}  
    )

    if(!order){
        return res.status(500).json({success: false, message:'the Order can not updated'})
    }

    res.status(200).send(order)
})


router.delete('/:id', async (req,res)=>{

    Order.findByIdAndDelete(req.params.id).then(async(order)=>{
        if(order){
            await order.orderItems.map(async(orderItem)=>{
                await OrderItem.findByIdAndDelete(orderItem)
            })
            return res.status(200).json({success:true, message:'order has been deleted'})
        }
        else{
            return res.status(404).json({success: false, message:'order not found'})
        }
    }).catch((err)=>{
              return res.status(400).json({success:false, error:err})
    })

})

// API for finding Total sales

router.get('/get/totalsales', async(req,res)=>{
    const totalSales = await Order.aggregate([
        {$group :{_id:null, totalsales:{$sum: '$totalPrice'}}}
    ])

    if(!totalSales){
        res.status(400).json({success:false, message:'Can not get total sales'})
    }

    res.status(200).send({totalSales : totalSales.pop().totalsales})
})

module.exports = router