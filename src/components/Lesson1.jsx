import { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import Stars from './Stars'
import * as THREE from 'three'

// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// const gltfLoader = new GLTFLoader();



// function Model(props) 
// {
//     if (props.sectionState === 0) {
//         return (

//             )
//     }

//     if (props.sectionState === 1) {
//         return (

//             )
//     }

//     if (props.sectionState === 2) {
//         return (

//             )
//     }

//     if (props.sectionState === 3) {
//         return (

//             )
//     }

// }

function Model0({ ...props }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/Model0-transformed.glb')

    useFrame((state) => 
    {
        group.current.rotation.y += .002

        if(state.clock.elapsedTime < 1.4)
        {
        }

        // group.current.scale.set(2, 2, 2)
        // group.current.scale.y = THREE.MathUtils.lerp(group.current.scale.y, group.current.scale.y + .1, 0.1)
        // group.current.scale.z = THREE.MathUtils.lerp(group.current.scale.z, group.current.scale.z + .1, 0.1)

        // THREE.MathUtils.lerp(group.current.scale.set(1, 1, 1), group.current.scale.set(2, 2, 2), 0.01)
        // group.current.scale.set(THREE.MathUtils.lerp(ref.current.rotation.x, props.flipped ? (Math.PI * 1.6) : (Math.PI / 2) , 0.1))
    })

    // console.log(group.current.scale);

    return (
      <group ref={group} {...props} dispose={null}>
          <group name="animation-empty" scale={0.008}>
            <mesh name="carbon-atoms" geometry={nodes['carbon-atoms'].geometry} material={materials.Carbon} position={[1.02, 3.01, 1.45]} scale={0.23} />
            <mesh name="carbon-bonds" geometry={nodes['carbon-bonds'].geometry} material={materials.Carbon} position={[2.9, 1.01, -1.53]} rotation={[-0.42, 1.23, -2.44]} />
            <mesh name="soccer-pattern" geometry={nodes['soccer-pattern'].geometry} material={materials.Carbon} position={[0.18, 1.66, 3.07]} scale={0.23} />
        </group>
      </group>
    )
  }

export default function Lesson1() {
    const [sectionState, setSectionState] = useState(0);
    // const { nodes, materials } = useGLTF(`../models/model${sectionState}.glb`)

    return (
        <>
            <Canvas gl={{alpha: false}} dpr={[1, 2]} camera={{ near: 0.01, far: 10, fov: 75, position: [0,0,5] }}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    <spotLight position={[10, 10, 10] } intensity={1}/>
                    <ambientLight intensity={.4} />
                    <Stars />

                    <Model0 />

                    {/* <Model sectionState={sectionState}/>
                    <Overlay sectionState={sectionState} /> */}
                </Suspense>
            </Canvas>
        </>
    );
    



    // else if (sectionState === 1)
    // {
    //     return (

    //     )
    // }

    // else if (sectionState === 2)
    // {
    //     return (
            
    //     )
    // }

    // else if (sectionState === 3)
    // {
    //     return (
            
    //     )
    // }

    // else if (sectionState === 4)
    // {
    //     return (
            
    //     )
    // }

    // else if (sectionState === 5)
    // {
    //     return (
            
    //     )
    // }

}



// function LoadModel(){

//     gltfLoader.load(`../models/model${sectionState}.glb`, (gltf) =>
//     {
//         // Animation
//         mixer1 = new THREE.AnimationMixer(gltf.scene);
//         const action = mixer1.clipAction(gltf.animations[0]);

//         if (sectionState === 0)
//         {
//             gltf.scene.scale.set(.24, .24, .24, .24);
//             gltf.scene.position.set(0, 0, -5);
//             scene.add(gltf.scene)
//             window.setTimeout(() => { action.play() }, 250);
//         }
//     })
// }

// function StartButton() 
// {
//     const btnDiv = document.createElement('div')
//     btnDiv.className = 'startBtnDiv'

//     const startBtn = document.createElement('button')
//     startBtn.textContent = 'Start Lesson';
//     startBtn.className = 'btn'

//     btnDiv.append(startBtn);
//     globalDiv.append(btnDiv);

//     startBtn.addEventListener('click', () => 
//     {
//         // 1. Clear scene
//         clearSection();

//         // 1.1 Clear start button 
//         btnDiv.remove();

//         // 3. Change sectionState
//         if (sectionState <= sectionCount) sectionState++;
//         console.log(`sectionState Now: ${sectionState}`);

//         // 4. Display new scene
//         displaySection(sectionState);
//         genNavButtons();
//     });
// }


// function NavButtons()
// {
//     if (sectionState === 0)
//     {
//         genStartButton();
//     }

//     else if (sectionState > 0)
//     {
//         const btnDiv = document.createElement('div')
//         btnDiv.className = 'btnDiv'

//         const bckBtn = document.createElement('button')
//         bckBtn.textContent = 'Back';
//         bckBtn.className = 'btn'

//         const nxtBtn = document.createElement('button')
//         nxtBtn.textContent = 'Next';
//         nxtBtn.className = 'btn'

//         btnDiv.append(bckBtn, nxtBtn);
//         globalDiv.append(btnDiv);

//         bckBtn.addEventListener('click', () => 
//         {
//             if (sectionState > 1) 
//             {
//                 // 1. Clear scene
//                 clearSection();

//                 // 3. Change sectionState
//                 sectionState--;

//                 // 4. Display new scene
//                 displaySection(sectionState);
//             }
//         });

//         nxtBtn.addEventListener('click', () => 
//         {
//             if (sectionState < 5)
//             {
//                 // 1. Clear scene
//                 clearSection();

//                 // 3. Change sectionState
//                 sectionState++;

//                 // 4. Display new scene
//                 displaySection(sectionState);
//             }
//         });
//     }
// };


// function Main() 
// {
//     const gltfLoader = new GLTFLoader();
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath('/draco/');
//     gltfLoader.setDRACOLoader(dracoLoader);

//     /////////////////////
//     // TOP-LEVEL : 
//     /////////////////////
//     const globalDiv = document.querySelector('.global');
//     const txtContainer = document.querySelector('section')

//     const clock = new THREE.Clock();
//     let previousTime = 0;
//     let mixer1, mixer2, mixer3 = null;

//     const modelDistance = 25;
//     const sectionCount = 6;
//     let sectionState = 0;

//     function displaySection(sectionState)
//     {

//         gltfLoader.load(`/models/model${sectionState}.glb`, (gltf) =>
//         {
//             // Animation
//             mixer1 = new THREE.AnimationMixer(gltf.scene);
//             const action = mixer1.clipAction(gltf.animations[0]);


//             if (sectionState === 0)
//             {
//                 gltf.scene.scale.set(.24, .24, .24, .24);
//                 gltf.scene.position.set(0, 0, -5);
//                 scene.add(gltf.scene)
//                 window.setTimeout(() => { action.play() }, 250);
//             }

//             else if (sectionState === 1)
//             {
//                 window.setTimeout(() => { scene.add(gltf.scene) }, 850);
//                 gltf.scene.scale.set(.24, .24, .24, .24);
//                 gltf.scene.position.set(1.5, 0, -sectionState * modelDistance);
//                 window.setTimeout(() => { action.play() }, 850);

//                 const html = `
//                 <p>In addition to diamond and graphite, a third form of pure carbon was discovered while scientists were studying how molecules form in outer space. </p>
//                 <p>This molecule was named <span>buckminsterfullerene</span> (often shortened to <span>fullerene</span>), because the structure is reminiscent of the geodesic domes popularized by Buckminster Fuller. An American architect and philosopher.</p>
//                 <p>It is nick-named <span>"buckyball."</span></p>
//                 `
//                 txtContainer.insertAdjacentHTML('afterbegin', html);
//                 txtContainer.classList.toggle("sectionRight");
//             }

//             else if (sectionState === 2)
//             {
//                 window.setTimeout(() => { scene.add(gltf.scene) }, 850);
//                 gltf.scene.scale.set(.42, .42, .42, .42);
//                 gltf.scene.position.set(-2.33, .33, -sectionState * modelDistance);
//                 window.setTimeout(() => { action.play() }, 850);

//                 const html = `
//                 <p>Fullerene is the <span>most symmetrical large molecule </span> known, consisting of a hollow cluster of 60 carbons.</p>
//                 <p>Each molecule has 20 hexagons and 12 pentagons <span>(highlighted in red)</span> that fit together like the seams of a soccer ball. </p>
//                 <p>Buckyballs have <span>extraordinary chemical and physical properties.</span> They are exceedingly rugged and are capable of surviving the extreme temperatures of outer space. </p>
//                 `
//                 txtContainer.insertAdjacentHTML('afterbegin', html);
//                 txtContainer.classList.toggle("sectionRight");
//             }

//             else if (sectionState === 3)
//             {
//                 window.setTimeout(() => { scene.add(gltf.scene) }, 850);
//                 gltf.scene.scale.set(.66, .66, .66, .66);
//                 gltf.scene.position.set(4.33, .33, -sectionState * modelDistance);

//                 mixer2 = new THREE.AnimationMixer(gltf.scene);
//                 const action2 = mixer2.clipAction(gltf.animations[1]);
//                 window.setTimeout(() => { action.play() }, 850);
//                 window.setTimeout(() => { action2.play() }, 850);

//                 const html = `
//                 <p>Because they are essentially hollow cages, they can be manipulated to make materials never before known.</p>
//                 <p>For example, when a buckyball is <span>"doped"</span> via <span>inserting potassium or cesium</span> into its cavity, it becomes the best organic superconductor known.</p>
//                 <p>These molecules are presently being studied for use in many other applications such as new polymers and catalysts, as well as <span>new drug delivery systems</span>.</p>
//                 `
//                 txtContainer.insertAdjacentHTML('afterbegin', html);
//                 txtContainer.classList.toggle("sectionRight");
//             }

//             else if (sectionState === 4)
//             {
//                 window.setTimeout(() => { scene.add(gltf.scene) }, 850);
//                 console.log(gltf);
//                 gltf.scene.scale.set(.18, .18, .18, .18);
//                 gltf.scene.position.set(-5.25, .5, -sectionState * modelDistance);

//                 mixer2 = new THREE.AnimationMixer(gltf.scene);
//                 const action2 = mixer2.clipAction(gltf.animations[1]);


//                 mixer3 = new THREE.AnimationMixer(gltf.scene);
//                 const action3 = mixer3.clipAction(gltf.animations[2]);
//                 window.setTimeout(() => { action.play() }, 850);
//                 window.setTimeout(() => { action2.play() }, 850);
//                 window.setTimeout(() => { action3.play() }, 850);

//                 const html = `
//                 <p>Scientists have even turned their attention to buckyballs in their quest for a <span>cure for AIDS</span>. </p>
//                 <p>An enzyme that is required for HIV to reproduce exhibits a <span>nonpolar pocket</span> in its three-dimensional structure. </p>
//                 <p>If this pocket is blocked, the production of virus ceases. Because <span>buckyballs are nonpolar</span>, and have approximately the same diameter as the pocket of the enzyme, they <span>are being considered as possible blockers</span>. </p>
//                 `
//                 txtContainer.insertAdjacentHTML('afterbegin', html);
//                 txtContainer.classList.toggle("sectionRight");
//             }

//             else if (sectionState === 5)
//             {
//                 const html = `
//                 <span>End of Lesson 🥳</span>.
//                 `
//                 txtContainer.insertAdjacentHTML('afterbegin', html);
//             }

//         })
//     };

//     function clearSection()
//     {
//         while (scene.children.length > 3)
//         {
//             scene.remove(scene.children[3]);
//         }
//         txtContainer.innerHTML = "";
//     };

//     function StartButton() 
//     {
//         const btnDiv = document.createElement('div')
//         btnDiv.className = 'startBtnDiv'

//         const startBtn = document.createElement('button')
//         startBtn.textContent = 'Start Lesson';
//         startBtn.className = 'btn'

//         btnDiv.append(startBtn);
//         globalDiv.append(btnDiv);

//         startBtn.addEventListener('click', () => 
//         {
//             // 1. Clear scene
//             clearSection();

//             // 1.1 Clear start button 
//             btnDiv.remove();

//             // 3. Change sectionState
//             if (sectionState <= sectionCount) sectionState++;
//             console.log(`sectionState Now: ${sectionState}`);

//             // 4. Display new scene
//             displaySection(sectionState);
//             genNavButtons();
//         });
//     }

//     function genNavButtons()
//     {
//         if (sectionState === 0)
//         {
//             genStartButton();
//         }

//         else if (sectionState > 0)
//         {
//             const btnDiv = document.createElement('div')
//             btnDiv.className = 'btnDiv'

//             const bckBtn = document.createElement('button')
//             bckBtn.textContent = 'Back';
//             bckBtn.className = 'btn'

//             const nxtBtn = document.createElement('button')
//             nxtBtn.textContent = 'Next';
//             nxtBtn.className = 'btn'

//             btnDiv.append(bckBtn, nxtBtn);
//             globalDiv.append(btnDiv);

//             bckBtn.addEventListener('click', () => 
//             {
//                 if (sectionState > 1) 
//                 {
//                     // 1. Clear scene
//                     clearSection();

//                     // 3. Change sectionState
//                     sectionState--;

//                     // 4. Display new scene
//                     displaySection(sectionState);
//                 }
//             });

//             nxtBtn.addEventListener('click', () => 
//             {
//                 if (sectionState < 5)
//                 {
//                     // 1. Clear scene
//                     clearSection();

//                     // 3. Change sectionState
//                     sectionState++;

//                     // 4. Display new scene
//                     displaySection(sectionState);
//                 }
//             });
//         }
//     };

//     function tick()
//     {
//         const elapsedTime = clock.getElapsedTime();
//         const deltaTime = elapsedTime - previousTime;
//         previousTime = elapsedTime;



//         if (mixer1)
//         {
//             mixer1.update(deltaTime);
//         }
//         if (mixer2)
//         {
//             mixer2.update(deltaTime);
//         }
//         if (mixer3)
//         {
//             mixer3.update(deltaTime);
//         }

//         renderer.render(scene, camera);

//         // Call tick again on the next frame
//         window.requestAnimationFrame(tick);
//     };


//     window.addEventListener('resize', () =>
//     {
//         // Update sizes
//         sizes.width = window.innerWidth
//         sizes.height = window.innerHeight

//         // Update camera
//         camera.aspect = sizes.width / sizes.height
//         camera.updateProjectionMatrix()

//         // Update renderer
//         renderer.setSize(sizes.width, sizes.height)
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//     })

//     genNavButtons();
//     displaySection(sectionState);
//     requestAnimationFrame(animate);
//     tick();
// };
