import { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader,  } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls} from '@react-three/drei'
import Stars from './Stars'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import home from './home-icon.png'

export default function Lesson1(props) {
    const [sectionState, setSectionState] = useState(0);

    return (
        <>
            <Overlay setPage={props.setPage}/>
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0, 5] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    {/* <OrbitControls /> */}
                    <spotLight position={[10, 10, 10] } intensity={.8}/>
                    <ambientLight intensity={.5} />
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
        <div className='lesson1--wrapper'>
            <header className='lesson1--header'>
                <img src={home} onClick={() => props.setPage('home')}/>
                <h1>C<sub>60</sub> - Fullerene</h1>
            </header>
            <main className='lesson1--main'>

            </main>

            <footer className='lesson1--footer'>
                <div className="btn2">
                    <div><a title={"Start Lesson"}></a></div>
                </div>  
            </footer>

        </div>

    )
}
