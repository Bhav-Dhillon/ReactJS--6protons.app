import { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader,  } from '@react-three/fiber'
import Stars from './Stars'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from '@react-three/drei'

/* 
TODO
    - Refactor Top Nav Bar up to App.jsx since we will be using it with every lesson
    - Find a way to procedurally generate text overlay   
    - Use Draco compression for models 
*/

export default function Lesson1(props) {
    const [sectionState, setSectionState] = useState(0);

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

    function Scene() {
        function Model(props) {
            // Model
            const model = useLoader(
                GLTFLoader,
                props.path,
                loader => {
                    const dracoLoader = new DRACOLoader();
                    dracoLoader.setDecoderPath("myDecoder/gltf/");
                    loader.setDRACOLoader(dracoLoader);
                   }
            )
        
            // Animation
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
               </>
               )
            }

            else if (sectionState === 2) {
                return (
                    <>
                        <primitive 
                        object={model.scene}
                        scale={(.12)}
                        position={[.66, 0, -1]}
                        transparent={false}
                        />
                    </>
                )
            }

            else if (sectionState === 3) {
                return (
                    <>
                        <primitive 
                        object={model.scene}
                        scale={(.12)}
                        position={[.66, 0, -1]}
                        transparent={false}
                        />
                    </>
                )
            }
            else if (sectionState === 4) {
                return (
                    <>
                        <primitive 
                        object={model.scene}
                        scale={(.12)}
                        position={[.66, 0, -1]}
                        transparent={false}
                        />
                    </>
                )
            }
            else if (sectionState === 5) {
                return (
                    <>
                        <primitive 
                        object={model.scene}
                        scale={(.12)}
                        position={[.66, 0, -1]}
                        transparent={false}
                        />
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
                <TopNavBar setPage={props.setPage} setCameraRotate={props.setCameraRotate} sectionState={sectionState}/>
                <Scene sectionState={sectionState}/>
                <BottomNavBar sectionState={sectionState} handleBack={handleBack} handleNext={handleNext}/>
            </>
        )
    }

    else if (sectionState >= 1)
    {
        return (
            <>
                <TopNavBar setPage={props.setPage} setCameraRotate={props.setCameraRotate} />
                <Scene sectionState={sectionState}/>
                <_Text sectionState={sectionState}/>
                <BottomNavBar sectionState={sectionState} handleBack={handleBack} handleNext={handleNext}/>
            </>
        )
    }
}

function _Text({sectionState})
{
    if(sectionState === 1)
    {
        return (
            <div className='lesson1--text--wrapper'>
                <p>In 1985, chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of He<sub>2</sub> gas...</p>
            </div>
        )
    }

    else if(sectionState === 2)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere. The largest and most symmetrical form of pure carbon ever discovered.</p>
                <p>This molecule would go on to be named Buckminsterfullerene. Often shortened to Fullerene and nicknamed "Buckyball"</p>
            </div>
        )
    }

    else if(sectionState === 3)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>Each molecule has 20 hexagons and 12 pentagons <span>highlighted in red</span> that fit together like the seams of a soccer ball. </p>
            </div>
        )
    }

    else if(sectionState === 4)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>Because they are essentially hollow cages, they can be manipulated to make materials never before known.</p>
                <p>For example, when a buckyball is "doped" via inserting potassium or cesium into its cavity, it becomes the best organic superconductor known.</p>
                <p>These molecules are presently being studied for use in many other applications such as new polymers and catalysts, as well as <span>new drug delivery systems</span>.</p>
            </div>
        )
    }

    else if(sectionState === 5)
    {
        return (
            <div className='lesson1--text--wrapper2'>
                <p>Scientists have even turned their attention to buckyballs in their quest for a cure for AIDS.</p>
                <p>An enzyme that is required for HIV to reproduce exhibits a <span>nonpolar pocket</span> in its three-dimensional structure.</p>
                <p>If this pocket is blocked, the production of virus ceases. Because <span>buckyballs are nonpolar</span>, and have approximately the same diameter as the pocket of the enzyme, they are being considered as possible blockers.</p>
            </div>
        )
    }

}

function TextReWord({sectionState})
{
    if(sectionState === 1)
    {
        return (
            <div className='lesson1--text--wrapper'>
                <p>In 1985, the largest and most symmetrical form of pure carbon was discovered.</p> 
            </div>
        )
    }
    else if(sectionState === 2)
    {
        return (
            <div className='lesson1--text--wrapper'>
                <p>Chemists were studying how molecules form in outer space when they began vaporizing graphite rods in an atmosphere of He<sub>2</sub> gas..</p>
            </div>
        )
    }
    else if(sectionState === 3)
    {
        return (
            <div className='lesson1--text--wrapper'>
                <p>The result? Novel cage-like molecules composed of 60 carbon atoms, joined together to form a hollow sphere.</p>
            </div>
        )
    }

} 

function TopNavBar({sectionState, setPage, setCameraRotate}) {
    
    return (
        <header className='lesson1--header'>
            <ul className="homeBtn--wrapper">
                <li className="homeBtn" onClick={() => 
                {
                    setPage(`home`)
                    setCameraRotate()
                }}>
                    <a href="#" className="homeBtn--icon"><i className="fas fa-house"></i></a>
                </li>
            </ul>
            {sectionState < 1 ? <h1>C<sub>60</sub> - Fullerene</h1> : null}
        </header>
    )

}

function BottomNavBar({sectionState, handleBack, handleNext}) {
    if(sectionState === 0)
    {
        return (
            <div className='lesson1--footer'>
                <div className="startLesson1Btn" onClick={handleNext}>
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

// // RE-FACTOR to DRY
// else if(sectionState >= 1)
// {
//     return (
//         <header className='lesson1--header'>
//             <ul className="homeBtn--wrapper">
//                 <li className="homeBtn" onClick={() => 
//                 {
//                     props.setPage(`home`)
//                     // props.setCameraRotate()
//                 }}>
//                     <a href="#" className="homeBtn--icon"><i className="fas fa-house"></i></a>
//                 </li>
//             </ul>

//             {/* <ul className="backBtn--wrapper">
//                 <li className="backBtn" onClick={() => { props.setPage(`home`) }}>
//                     <a href="#" className="backBtn--icon"><i className="fa-solid fa-angle-left"></i></a>
//                 </li>
//             </ul> */}

//             <h1>C<sub>60</sub> - Fullerene</h1>
//         </header>
//     )

// }