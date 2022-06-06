import { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader,  } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls} from '@react-three/drei'
import Stars from './Stars'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Lesson1(props) {
    const [sectionState, setSectionState] = useState(1);

    return (
        <>
            <Overlay setPage={props.setPage}/>
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0, 5] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    {/* <OrbitControls /> */}
                    <spotLight position={[10, 10, 10] } intensity={.8}/>
                    <ambientLight intensity={.3} />
                    <Stars />
                    <Model path={`/model${sectionState}.glb`} />
                </Suspense>
            </Canvas>
        </>
    );
}

function Model(props) {

    // Loading Model
    const model = useLoader(
        GLTFLoader,
        props.path
    )
    console.log(model);

    // Loading Animation
    let mixer
    if (model.animations.length) {
        mixer = new THREE.AnimationMixer(model.scene);
        model.animations.forEach(clip => {
            const action = mixer.clipAction(clip)

            action.play();
            // window.setTimeout(() => { action.play() }, 100);
        });
    }

    // Updating each frame:
    useFrame((state, delta) => {
        mixer?.update(delta)
    })
    
    model.scene.traverse(child => {
        if (child.isMesh) {
            child.material.opacity = 1; 
            child.material.transparent = true;
            // child.material.side = THREE.FrontSide
        }
    })

    return (
        <primitive 
            object={model.scene}
            scale={(.23)}
            position={[0, 0, -1]}
            transparent={false}
        />
    )
}  

function Overlay(props) {
    return (
        <>
        <div className='title'>
            <h1>C<sub>60</sub> - Fullerene</h1>
        </div>
        <div className="btn2" style={{marginTop: 50 }}>
            <div><a title={"Back to Home"} onClick={() => props.setPage('home')}></a></div>
        </div>  
        </>

    )
}
