const Diagnostics = require('Diagnostics')
const Instruction = require('Instruction')
const CameraInfo = require('CameraInfo')
const Scene = require('Scene')
const Time = require('Time')
const fd = Scene.root
  .child('Device')
  .child('Camera')
  .child('Focal Distance')
const planeTracker = Scene.root.child('planeTracker0')

import CannonHelper from 'spark-ar-physics'

// show switch camera instructions on front camera
Instruction.bind(CameraInfo.captureDevicePosition.eq(CameraInfo.CameraPosition.FRONT), 'flip_camera')

var floorPlane = planeTracker.child('plane0')
var cube0 = planeTracker.child('Cube0')
var sphere0 = planeTracker.child('Sphere0')
var cube1 = planeTracker.child('Cube1')
var sphere1 = planeTracker.child('Sphere1')
var cube2 = planeTracker.child('Cube2')
var sphere2 = planeTracker.child('Sphere2')

var floor = CannonHelper.makeFloor()

// create the world objects
// world objects contain a scenObject and a physicsObject
var worldObjects = [
  { sceneObject: floorPlane, physicsObject: floor },
  {
    sceneObject: cube0,
    physicsObject: CannonHelper.makeBox({ x: 5, y: 5, z: 5 }, { x: 0, y: 40, z: 0 }, { x: 0.2, y: 0.8, z: 0, w: 0 })
  },
  {
    sceneObject: cube1,
    physicsObject: CannonHelper.makeBox({ x: 5, y: 5, z: 5 }, { x: 10, y: 40, z: 0 }, { x: 0.6, y: 0.2, z: 0, w: 0 })
  },
  {
    sceneObject: cube2,
    physicsObject: CannonHelper.makeBox({ x: 5, y: 5, z: 5 }, { x: 0, y: 30, z: 10 }, { x: 0.1, y: 0.2, z: 0.5, w: 0 })
  },
  {
    sceneObject: sphere0,
    physicsObject: CannonHelper.makeSphere({ x: 5 }, { x: 0, y: 30, z: 0 }, { x: 0.2, y: 0.5, z: 0, w: 0 })
  },
  {
    sceneObject: sphere1,
    physicsObject: CannonHelper.makeSphere({ x: 5 }, { x: 15, y: 60, z: 0 }, { x: 0.2, y: 0.5, z: 0, w: 0 })
  },
  {
    sceneObject: sphere2,
    physicsObject: CannonHelper.makeSphere({ x: 5 }, { x: 0, y: 50, z: 10 }, { x: 0.2, y: 0.5, z: 0, w: 0 })
  }
]

// init the cannon world with the worldObjects
var cannon = new CannonHelper(worldObjects)

var loopTimeMs = 30
var lastTime
Time.ms.interval(loopTimeMs).subscribe(function(elapsedTime) {
  if (lastTime !== undefined) {
    // get the time since the last update
    var deltaTime = (elapsedTime - lastTime) / 1000

    // update the internal cannon world
    cannon.update(deltaTime)
  }

  lastTime = elapsedTime
})
