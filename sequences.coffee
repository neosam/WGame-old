#        This file is part of WGame.
#
#    Foobar is free software: you can redistribute it and/or modify
#    it under the terms of the Lesser GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    Foobar is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    Lesser GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.

level = 0

sequence1 = [
  {
    duration: 2000
    cameraSpeed: [0, 0]
    cameraPosition: [0, 0]
    layers: [{imagePaths: ['media/level1/story1-1.png']}]
  }
  {
  duration: 2500
  cameraSpeed: [1, 0]
  cameraPosition: [0, 0]
  layers: [
    {
    imagePaths: ['media/level1/story2-1.png']
    relativeSpeed: 0
    }
    {
    imagePaths: ['media/level1/story2-2.png']
    relativeSpeed: 1
    }
  ]
  }
  {
  duration: 3000
  cameraSpeed: [1, 0]
  cameraPosition: [0, 0]
  layers: [
    {
    imagePaths: ['media/level1/story3-1.png']
    relativeSpeed: 0.3
    }
    {
    imagePaths: ['media/level1/story3-2.png']
    relativeSpeed: -1
    }
    {
    imagePaths: ['media/level1/story3-3.png']
    relativeSpeed: 0
    }
  ]
  }
  {
  duration: 3000
  cameraSpeed: [1, 0]
  cameraPosition: [0, 0]
  layers: [
    {
    imagePaths: ['media/level1/story4-1.png']
    relativeSpeed: 0.5
    }
    {
    imagePaths: ['media/level1/story4-2.png']
    relativeSpeed: 0
    }
  ]
  }
  {
  duration: 4500
  cameraSpeed: [0, 1]
  cameraPosition: [0, 0]
  layers: [
    {
    imagePaths: ['media/level1/story5-1.png']
    relativeSpeed: 0.5
    }
    {
    imagePaths: ['media/level1/story5-2.png']
    relativeSpeed: 0
    }
  ]
  }
  {
  duration: 6500
  cameraSpeed: [0, 1]
  cameraPosition: [0, 0]
  layers: [
    {
    imagePaths: ['media/level1/story6-1.png']
    relativeSpeed: 0.1
    }
    {
    imagePaths: ['media/level1/story6-2.png']
    relativeSpeed: 0.1
    }
    {
    imagePaths: ['media/level1/story6-3.png']
    relativeSpeed: 0.5
    }
    {
    imagePaths: ['media/level1/story6-4.png']
    relativeSpeed: 0
    }
    {
    imagePaths: ['media/level1/story6-5-1.png', 'media/level1/story6-5-2.png']
    relativeSpeed: 0
    animationSpeed: 100
    }
  ]
  }
  {
  duration: 4000
  cameraSpeed: [0, 0]
  cameraPosition: [0, 0]
  layers: [
    {
    imagePaths: ['media/level1/story7-1-1.png', 'media/level1/story7-1-2.png']
    relativeSpeed: 0
    animationSpeed: 100
    }
  ]
  }

]

testSequence = [
  {
    duration: 4000
    cameraSpeed: [3, 0]
    cameraPosition: [0, 0]
    layers: [
      {
        imagePaths: ['media/sequence-bg.png']
        relativeSpeed: 0
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence2.png']
        relativeSpeed: 0.5
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence1.png']
        relativeSpeed: 1
        animationSpeed: 33
      }
      {
        imagePaths: ['media/sequence-staticfont.png']
        relativeSpeed: 0
        animationSpeed: 33
      }
    ]
  }
  {
  duration: 4000
  cameraSpeed: [0, 0.1]
  cameraPosition: [200, 0]
  layers: [
    {
    imagePaths: ['media/sequence-bg.png']
    relativeSpeed: 0
    animationSpeed: 33
    }
    {
    imagePaths: ['media/sequence2.png']
    relativeSpeed: 0.5
    animationSpeed: 33
    }
    {
    imagePaths: ['media/sequence1.png']
    relativeSpeed: 1
    animationSpeed: 33
    }
    {
    imagePaths: ['media/sequence-staticfont.png']
    relativeSpeed: 0
    animationSpeed: 33
    }
  ]
  }
]

sequenceCameraSpeed = [0, 0]

loadPartSequence = (partSeq, func) ->
  newLevel = new Level 0, 0
  newLevel.camera.x = partSeq.cameraPosition[0]
  newLevel.camera.y = partSeq.cameraPosition[1]
  sequenceCameraSpeed = partSeq.cameraSpeed
  for layer in partSeq.layers
     bgLayer = new BackgroundImageLayer layer.images[0], \
                  layer.relativeSpeed ? 1, layer.animationSpeed ? 33
     for i in [1...layer.images.length]
        bgLayer.addImage layer.images[i]
     newLevel.addLayer bgLayer
  level = newLevel
  window.setTimeout(func, partSeq.duration)


loadImagesForSequence = (seq) ->
  for partSeq in seq
    for layer in partSeq.layers
      images = new Array()
      for imagePath in layer.imagePaths
        loadedImg = new Image()
        loadedImg.onload = ->
        loadedImg.src = imagePath
        images.push loadedImg
      layer.images = images


loadSequence = (seq, func) ->
  loadImagesForSequence seq
  index = 0
  internalSequenceLoad = ->
    if index >= seq.length
      func()
      return
    partSeq = seq[index]
    index++
    loadPartSequence partSeq, internalSequenceLoad
  internalSequenceLoad()
  calculation = ->
    level.camera.x += sequenceCameraSpeed[0]
    level.camera.y += sequenceCameraSpeed[1]


