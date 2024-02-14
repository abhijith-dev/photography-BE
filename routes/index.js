const { Router } = require('express');
const collection= require('../controllers');

const router = Router();

router.post('/visiters',collection.visiters);

router.post('/post',collection.post);

router.get('/content',collection.content);

router.patch('/content/gallery',collection.gallery);

router.patch('/content/services',collection.services);

router.patch('/content/projects',collection.projects);

router.patch('/content/socials',collection.socials);

router.patch('/content/aboutUs',collection.aboutUs);

router.patch('/content/work',collection.work);

// router.patch('/content/albums',collection.albums); // TODO:yet to be implemented

router.get('/getAvgTime',collection.getAvgTime);

router.get('/getAllStats',collection.getAllStats);

router.post('/avgTime',collection.avarageTime);

router.post('/messages',collection.messages);

router.get('/messages/get',collection.getMessages);

//detete
router.delete('/content/gallery',collection.galleryPop);

router.delete('/content/services',collection.servicesPop);

router.delete('/content/projects',collection.projectsPop);

router.delete('/content/socials',collection.socialsPopPop);

router.delete('/content/work',collection.workPop);

// router.delete('/content/albums',collection.albumPop); // TODO: yet to be implemented


module.exports = router;