import { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader,  } from '@react-three/fiber'
import { useGLTF, useAnimations, OrbitControls} from '@react-three/drei'
import Stars from './Stars'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';



export default function Lesson1(props) {
    const [sectionState, setSectionState] = useState(0);


    console.log(sectionState);

    function handleNext() 
    {
        setSectionState((prevCount) => prevCount + 1)
        
    }

    function handleBack() 
    {
        setSectionState((prevCount) => {
            if(prevCount > 0) return prevCount - 1;
            else return prevCount;
        })
    }

    function Scene()
    {
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
        
                    // action.warp(1, 2, 2).play()
                    action.play();
                });
            }
            useFrame((state, delta) => {
                mixer?.update(delta)
            })
            
            // model.scene.traverse(child => {
            //     if (child.isMesh) {
            //         child.material.opacity = 1; 
            //         child.material.transparent = true;
            //         // child.material.side = THREE.FrontSide
            //     }
            // })
        
            if (sectionState === 0) {
                return (
                    <>
                        <primitive 
                        object={model.scene}
                        scale={(.1)}
                        position={[0, 0, -0.5]}
                        transparent={false}/>
                    </>
                )
            }

            else if (sectionState === 1) {
                return (
                    <>
                        {/* <primitive 
                        object={model.scene}
                        scale={(.12)}
                        position={[.66, 0, -1]}
                        transparent={false}
                        /> */}
                    </>
                )
            }
        }  
        return (
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 45, position: [0, 0, 2] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    {/* <OrbitControls /> */}
                    <spotLight position={[10, 10, 10] } intensity={.8}/>
                    <ambientLight intensity={.5} />
                    <Stars />
                    <Model path={`/model${sectionState}.glb`} />
                </Suspense>
            </Canvas>
        )
    }


    if (sectionState === 0)
    {
        return (
            <>
                <TopNavBar setPage={props.setPage} setCameraRotate={props.setCameraRotate} />
                <Scene sectionState={sectionState}/>
                <BottomNavBar sectionState={sectionState} handleBack={handleBack} handleNext={handleNext}/>
            </>
        )
    }

    else if (sectionState === 1)
    {
        return (
            <>
                <TopNavBar setPage={props.setPage} setCameraRotate={props.setCameraRotate} />
                <Scene sectionState={sectionState}/>
                <Text2 />
                <BottomNavBar sectionState={sectionState} handleBack={handleBack} handleNext={handleNext}/>
            </>
        )
    }


    // function MoveCamera()
    // {
    //     useFrame((state) => {
    //         state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, (-Math.PI / 2), 0.07)
    //     })
    //     return <></>
    // }
}

function Text2()
{
    return (
        <div className='lesson1--text'>
            <p className='check'> In 1985, a highly symmetrical form of pure carbon was discovered</p>
        </div>

    )
}


function TopNavBar(props) {
    return (
        <header className='lesson1--header'>
            <ul className="homeBtn--wrapper">
                <li className="homeBtn" onClick={() => 
                {
                    props.setPage(`home`)
                    // props.setCameraRotate()
                }}>
                    <a href="#" className="homeBtn--icon"><i className="fas fa-house"></i></a>
                </li>
            </ul>

            {/* <ul className="backBtn--wrapper">
                <li className="backBtn" onClick={() => { props.setPage(`home`) }}>
                    <a href="#" className="backBtn--icon"><i className="fa-solid fa-angle-left"></i></a>
                </li>
            </ul> */}

            <h1>C<sub>60</sub> - Fullerene</h1>
        </header>
    )
}

function BottomNavBar({sectionState, handleBack, handleNext})
{
    if(sectionState === 0)
    {
        return (
            <div className='lesson1--footer'>
                <div className="btn2" onClick={handleNext}>
                    <div><a title={"Start Lesson"}></a></div>
                </div>  
            </div> 
        )
    }
    
    else if(sectionState > 0)
    {
        return (
            <div className='lesson1--bottomNav'>
                <button onClick={handleBack}><i className="fa-solid fa-angle-left bottomNav--icons"></i></button>
                <button onClick={handleNext}><i className="fa-solid fa-angle-right bottomNav--icons"></i></button>
            </div> 
        )
    }

}



function Text({sectionState})
{
    if(sectionState === 0)
    {
        return (
            <p className='lesson1--text'> In 1985, a highly symmetrical form of pure carbon was discovered.</p>
        )
    }
    if(sectionState === 1)
    {
        return (
            <p className='lesson1--text2'>Chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of helium gas.</p>
        )
    }
    if(sectionState === 2)
    {
        return (
            <p className='lesson1--text3'>The result: a cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere.</p>
        )
    }

}






