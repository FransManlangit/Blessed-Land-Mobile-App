const { Request } = require('../models/request');
const { Document } = require("../models/document");
const { User } = require("../models/user")
const express = require ('express');
const { RequestItem } = require ('../models/request-item');
const router = express.Router();




router.get(`/`, async (req, res) => {
    const requestList = await Request.find().populate('user', 'fullname').sort({ 'dateofRequest': -1 });

    if (!requestList) {
        res.status(500).json({ success: false })
    }
   
    res.status(201).json(requestList)
})

router.get(`/:id`, async (req, res) => {
    const request = await Request.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'requestItems', populate: {
                path: 'document'
            }
        });

    if (!request) {
        res.status(500).json({ success: false })
    }
    res.send(request);
})


router.post(`/`, async (req, res) => {
    const requestItemsIds = Promise.all(
        req.body.requestItems.map(async (requestItem) => {
        

        let newRequestItem = new RequestItem({
            numofcopies: requestItem.numofcopies,
            document: requestItem,

        });

        newRequestItem = await newRequestItem.save();

        return newRequestItem._id;

    }) 
    );

    console.log(requestItemsIds)
    const requestItemsIdsResolved = await requestItemsIds;
    console.log(requestItemsIds)

    let request = Request({
        requestItems: requestItemsIdsResolved,
        fullname: req.body.fullname,
        phone: req.body.phone,
        purpose: req.body.purpose,
        dateofRequest: req.body.dateofRequest,
        status: req.body.status,
        user: req.body.user,
        payment: req.body.payment,
        studentId: req.body.studentId,
        grade: req.body.grade,
        section: req.body.section,
        totalPrice:req.body.totalPrice,
     
    })

    request = await request.save();

    if (!request)
        return res.status(400).send('the request cannot be created!')

    res.send(request);

})


router.put('/:id', async (req, res) => {
    const request = await Request.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    )

    if (!request)
        return res.status(400).send('the request cannot be update!')

    res.send(request);
})

router.delete('/:id', (req, res) => {
    Request.findByIdAndRemove(req.params.id).then(async request => {
        if (request) {
            await request.requestItems.map(async requestItem => {
                await RequestItem.findByIdAndRemove(requestItem)
            })
            return res.status(200).json({ success: true, message: 'the request is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "request not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})


router.get("/get/totalsales", async (req, res) => {
    const totalSales = await Request.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);
  
    if (!totalSales) {
      return res.status(400).send("The Request sales cannot be generated");
    }
  
    res.send({ totalsales: totalSales.pop().totalsales });
  });



router.get(`/get/count`, async (req, res) => {
    const requestCount = await Request.countDocuments((count) => count)

    if (!requestCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        requestCount: requestCount
    });
})


router.get(`/get/userRequests/:userid`, async (req, res) => {
    const userRequestList = await Request.find({ user: req.params.userid }).populate({
        path: 'requestItems', populate: {
            path: 'document'
        }
    }).sort({ 'dateofRequest': -1 });

    if (!userRequestList) {
        res.status(500).json({ success: false })
    }
    res.send(userRequestList);
})


router.get('/requestItems/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      console.log(userId)
      const user = await User.findById(userId);
      console.log(user, "user")
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
     
      const requestItems = await Request.find({ user: userId })
      .populate({
        path: "user",
      })
      .populate({
        path: "requestItems",
        populate: { path: "document", model: "Document" },
      })
      console.log(requestItems)
    //   const requestItems = await RequestItem.find({ _id: { $in: request.requestItems } }).populate('document');
  
      res.status(200).json(requestItems);
    } catch (error) {
      console.error('Error fetching request items:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;