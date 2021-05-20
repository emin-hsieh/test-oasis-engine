'use strict';

var oasisEngine = require('oasis-engine');
var controls = require('@oasis-engine/controls');
var engineSpine = require('@oasis-engine/engine-spine');

/**
 * @title Spine Renderer
 * @category 2D
 */
const engine = new oasisEngine.WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const scene = engine.sceneManager.activeScene;
const rootEntity = scene.createRootEntity();
// camera
const cameraEntity = rootEntity.createChild("camera_node");
cameraEntity.addComponent(oasisEngine.Camera);
cameraEntity.transform.position = new oasisEngine.Vector3(0, 0, 70);
cameraEntity.addComponent(controls.OrbitControl);
engine.resourceManager
    .load({
    urls: [
        "https://gw.alipayobjects.com/os/OasisHub/a66ef194-6bc8-4325-9a59-6ea9097225b1/1620888427489.json",
        "https://gw.alipayobjects.com/os/OasisHub/a1e3e67b-a783-4832-ba1b-37a95bd55291/1620888427490.atlas",
        "https://gw.alipayobjects.com/zos/OasisHub/a3ca8f62-1068-43a5-bb64-5c9a0f823dde/1620888427490.png"
    ],
    type: "spine"
})
    .then((spineEntity) => {
    spineEntity.transform.setPosition(0, -12, 0);
    rootEntity.addChild(spineEntity);
    const spineAnimation = spineEntity.getComponent(engineSpine.SpineAnimation);
    spineAnimation.state.setAnimation(0, "walk", true);
    spineAnimation.skeleton.scaleX = 0.05;
    spineAnimation.skeleton.scaleY = 0.05;
});
engine.run();
