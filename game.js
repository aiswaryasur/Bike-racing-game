
AFRAME.registerComponent('game',{
    schema:{
        gamestate:{type:'string', default:'play'}
    },
    init:function(){
        var timerEl = document.querySelector('#timer')
        duration=300
        this.startTimer(duration,timerEl)
    },
    startTimer:function(duration,timerEl){
     var minutes
        var seconds
        setInterval(()=>{
            if(duration>=0){
                this.data.gameState='play'
                minutes=parseInt(duration/60)
                seconds=parseInt(duration%60)
                if(minutes<10){
                    minutes="0"+minutes
                }
                if(seconds<10){
                    seconds="0"+seconds
                }
                timerEl.setAttribute('text',{value:minutes+':'+seconds})
                duration=duration-1
            }
            else{
                this.data.gameState='over'
                var camera_rig = document.querySelector('#camera-rig')
                camera_rig.setAttribute('rotation',{x:0,y:0,z:0})
                var camera_movement_control = camera_rig.getAttribute('movement-controls')
                camera_movement_control.speed = 0
                camera_rig.setAttribute('velocity',{x:0,y:0,z:0})
                var over = document.querySelector('#over')
                over.setAttribute('visible',true)
                var speed = document.querySelector('#speed')
                speed.setAttribute('text',{value:'0'})
            }
        },
    100
    )
    }
    })