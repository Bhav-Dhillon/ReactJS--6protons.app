import { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader,  } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls} from '@react-three/drei'
import Stars from './Stars'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export default function Lesson1(props) {
    const [sectionState, setSectionState] = useState(0);

    return (
        <>
            <Overlay setPage={props.setPage} setCameraRotate={props.setCameraRotate} />
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

            action.warp(1, 2, 2).play()
            // action.play();
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
                <ul className="homeBtn--wrapper">
                    <li className="homeBtn" onClick={() => 
                    {
                        props.setPage(`home`)
                        props.setCameraRotate()
                    }}>
                        <a href="#" className="homeBtn--icon"><i className="fas fa-house"></i></a>
                    </li>
                </ul>

                <ul className="backBtn--wrapper">
                    <li className="backBtn" onClick={() => { props.setPage(`home`) }}>
                        <a href="#" className="backBtn--icon"><i class="fa-solid fa-angle-left"></i></a>
                    </li>
                </ul>

                {/* <div >
                    <svg 
                    className='homeBtn'
                    xmlns="http://www.w3.org/2000/svg" 
                    height="96" 
                    width="96">
                        <path d="M9 41V18.5L24.1 7.25L39 18.5V41H28.05V27.4H19.9V41ZM11.25 38.75H17.65V25.1H30.35V38.75H36.75V19.65L24.1 10.1L11.25 19.65ZM24 24.4Z"/>
                    </svg>
                </div> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 41V21.55L4.8 24.75L3.45 22.9L9 18.7V13.35H11.25V16.95L24 7.25L44.55 22.95L43.2 24.75L39 21.55V41ZM11.25 38.75H22V29.95H26V38.75H36.75V19.8L24 10.1L11.25 19.8ZM9 10.75Q9 8.75 10.375 7.35Q11.75 5.95 13.85 5.95Q15.1 5.95 15.775 5.175Q16.45 4.4 16.45 3.4H18.75Q18.75 5.35 17.4 6.775Q16.05 8.2 13.85 8.2Q12.65 8.2 11.95 8.95Q11.25 9.7 11.25 10.75ZM11.25 38.75H22H26H36.75H24H11.25Z"/></svg> */}



                {/* <img src={home} onClick={() => props.setPage('home')}/> */}
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
