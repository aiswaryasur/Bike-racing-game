AFRAME.registerComponent("drive",{
    init: function () {
        var gameStateValue = this.el.getAttribute("game")
        if (gameStateValue == "play") {
            this.drivebike()
        }
    },
    isVelocityActive: function () {
        console.log("hi")
        return Math.random() < 0.25;
    },

    drivebike: function () {
        var multiply = 10;
        var wheelRotation = 0;

        //Key Down Events
        window.addEventListener('keydown', function (e) {
            //Camera Movement Control: Rotation & Direction on Right & Left Arrow Keyup
            var cameraRig = document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            console.log(cameraMoveControl.speed)
            cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            console.log(cameraMoveControl.speed)

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })                
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })             
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            //Speed Up/Accelerate on Up Arrow Keyup
            if (e.code == "ArrowUp") {
                multiply += 0.5

                if (multiply <= 100 && cameraPosition.z > -500) {                  
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute("text", { value: multiply });
                }

            }
            //Stop/break on Space Keydown
            if (e.code == "Space") {            
                cameraRig.setAttribute("movement-controls", {"speed": 0})
            }

        })

        //Key Up Events
        window.addEventListener('keyup', function (e) {
            var cameraRig = document.querySelector("#camera-rig")
            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            if (e.code == "Space") {             
                var startCar = document.querySelector("#control-break")
                startCar.setAttribute("material", "color", "gray")
            }

            if (e.code == "ArrowUp") {
                if (multiply > 10) {
                    multiply -= 0.5
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
                }
            

            }
        })
    }
 
})